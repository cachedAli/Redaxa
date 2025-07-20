import { NextRequest, NextResponse } from "next/server";
import { parseForm } from "@/lib/server/formidable";
import { extractTextFromPDF } from "@/lib/server/pdfToText";
import { geminiModel } from "@/lib/server/gemini";
import { extractSensitiveInfoPrompt, toNodeRequest } from "@/lib/server/utils";
import { redactSensitiveInfo } from "@/lib/server/redactSensitiveInfo";

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
    
    const parsedArray = JSON.parse(message);

    const pdfBytes = await redactSensitiveInfo(pdfFile.filepath, parsedArray)

    console.log(message)


    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="redacted.pdf`
      }
    });
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
