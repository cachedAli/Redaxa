import { handleGeminiResponse, isGeminiOverloadError, isGeminiRateLimitError, toNodeRequest, uploadToSupabase } from "@/lib/server/utils";
import { redactSensitiveInfo } from "@/lib/server/redactSensitiveInfo";
import { extractTextFromPDF } from "@/lib/server/pdfToText";
import { NextRequest, NextResponse } from "next/server";
import { parseForm } from "@/lib/server/formidable";
import { authOptions } from "@/lib/server/auth";
import { prisma } from "@/lib/server/prisma";
import { getServerSession } from "next-auth";
import { readFile } from "fs/promises";
import { IncomingMessage } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  const nodeReq = toNodeRequest(req);

  try {
    const { files } = await parseForm(nodeReq as IncomingMessage);
    const pdfFile = files?.file?.[0];
    if (!pdfFile) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });

    const fullText = await extractTextFromPDF(pdfFile.filepath);
    const sensitiveItems = await handleGeminiResponse(fullText);
    const pdfBytes = await redactSensitiveInfo(pdfFile.filepath, sensitiveItems);

    const session = await getServerSession(authOptions);

    if (session) {

      if (!session?.user?.email) throw new Error("No session email");

      const user = await prisma.user.findUnique({ where: { email: session.user.email } });
      const fileBuffer = await readFile(pdfFile.filepath);

      if (!user) throw new Error("No user found");

      const { originalUrl, redactedUrl } = await uploadToSupabase(user.id, pdfFile.originalFilename, fileBuffer, pdfBytes);

      await prisma.historyRecords.create({
        data: {
          fileName: pdfFile.originalFilename ?? "unknown.pdf",
          resumeUrl: originalUrl,
          redactedResumeUrl: redactedUrl,
          user: { connect: { id: user.id } }
        }
      })
    } else {
      console.log("user is not signed in")
    }

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="redacted.pdf"`,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "NO_PERSONAL_INFO_FOUND") {
      return NextResponse.json({ message: "No personal info found to redact." }, { status: 200 });
    }

    if (isGeminiRateLimitError(err)) {
      return NextResponse.json({ error: "Quota reached. Try again after reset." }, { status: 429 });
    }

    if (isGeminiOverloadError(err)) {
      return NextResponse.json({ error: "AI service overloaded. Try again soon." }, { status: 503 });
    }

    console.error("Error in POST:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
};
