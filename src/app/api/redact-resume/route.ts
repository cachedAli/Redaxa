import { extractSensitiveInfoPrompt, noResumeMsg, toNodeRequest } from "@/lib/server/utils";
import { redactSensitiveInfo } from "@/lib/server/redactSensitiveInfo";
import { extractTextFromPDF } from "@/lib/server/pdfToText";
import { NextRequest, NextResponse } from "next/server";
import { parseForm } from "@/lib/server/formidable";
import { geminiModel } from "@/lib/server/gemini";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  const nodeReq = toNodeRequest(req);

  try {
    const { files } = await parseForm(nodeReq as any);
    const pdfFile = files?.file?.[0];

    if (!pdfFile) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fullText = await extractTextFromPDF(pdfFile.filepath);

    const prompt = extractSensitiveInfoPrompt(fullText)

    const response = geminiModel.generateContent(prompt)
    const message = (await response).response.text()

    console.log(message)
    if (message.trim() !== noResumeMsg) {

      const parsedArray = JSON.parse(message);

      const pdfBytes = await redactSensitiveInfo(pdfFile.filepath, parsedArray)

      return new NextResponse(pdfBytes, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="redacted.pdf`
        }
      });
    } else {
      return NextResponse.json({ message })
    }
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
