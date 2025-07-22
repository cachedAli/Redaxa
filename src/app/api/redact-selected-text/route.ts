import { parseForm } from "@/lib/server/formidable";
import { redactSensitiveInfo } from "@/lib/server/redactSensitiveInfo";
import { toNodeRequest } from "@/lib/server/utils";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const nodeReq = toNodeRequest(req);

    try {
        const { files, fields } = await parseForm(nodeReq as any);
        const pdfFile = files?.file?.[0];

        const selectedText = fields?.selectedText?.[0]

        if (!pdfFile) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }


        console.log("selct", selectedText)

        const pdfBytes = await redactSensitiveInfo(pdfFile.filepath, undefined, selectedText)

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