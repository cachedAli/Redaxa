import { supabase } from "@/lib/client/supabaseClient";
import { authOptions } from "@/lib/server/auth";
import { parseForm } from "@/lib/server/formidable";
import { prisma } from "@/lib/server/prisma";
import { redactSensitiveInfo } from "@/lib/server/redactSensitiveInfo";
import { toNodeRequest } from "@/lib/server/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const nodeReq = toNodeRequest(req);

    try {
        const { files, fields } = await parseForm(nodeReq as any);
        const pdfFile = files?.file?.[0];

        const selectedText = fields?.selectedText?.[0];
        const fileName = fields?.fileName?.[0];

        if (!pdfFile) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const pdfBytes = await redactSensitiveInfo(pdfFile.filepath, undefined, selectedText)

        const session = await getServerSession(authOptions);

        if (session) {

            if (!session?.user?.email) throw new Error("No session email");

            const user = await prisma.user.findUnique({ where: { email: session?.user?.email } })

            const baseName = fileName?.replace(/\.pdf$/i, "");
            const redactedPath = `redactedResumes/${user?.id}/${baseName}_redacted.pdf`;


            const { error } = await supabase.storage.from("resumes").upload(redactedPath, pdfBytes, { contentType: "application/pdf", upsert: true })

            if (error) {
                console.error("Supabase upload error:", error.message);
                return NextResponse.json({ error: "Failed to upload redacted PDF to Supabase" }, { status: 500 });
            }

            const { data } = supabase.storage.from("resumes").getPublicUrl(redactedPath)

            if (!data?.publicUrl) {
                return NextResponse.json({ error: "Failed to get public URL" }, { status: 500 });
            }

            const existingRecord = await prisma.historyRecords.findFirst({
                where: {
                    fileName: fileName ?? "unknown.pdf",
                    userId: user?.id,
                },
                orderBy:{
                    createdAt: "desc",
                }
            });

            if (existingRecord) {

                const updated = await prisma.historyRecords.update({
                    where: {
                        id: existingRecord?.id,
                    },
                    data: {
                        redactedResumeUrl: data.publicUrl,
                    },
                });
                console.log(updated)
            }
        } else {
            console.log("cannot save file in db")
        }
        return new NextResponse(pdfBytes, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="redacted.pdf"`
            }
        });
    } catch (error) {
        console.error("Error redacting text from PDF:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }


}