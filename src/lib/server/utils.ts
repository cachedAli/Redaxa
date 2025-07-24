import { UTApi } from "uploadthing/server"
import { NextRequest } from "next/server";
import { Readable } from "stream";
import { geminiModel } from "./gemini";
import { supabase } from "../client/supabaseClient";

export const toNodeRequest = (req: NextRequest) => {
    const body = req.body;
    if (!body) throw new Error("No body found");

    const nodeStream = Readable.fromWeb(
        body as unknown as import("node:stream/web").ReadableStream<Uint8Array>
    );

    return Object.assign(nodeStream, {
        headers: Object.fromEntries(req.headers.entries()),
        method: req.method,
        url: "",
    });
}

export const extractSensitiveInfoPrompt = (text: string) => {
    return `
You are a strict data extraction AI that identifies and returns **sensitive personal information** found in resumes or personal documents.

Only extract the following types of sensitive information if present:
- Full name (if clearly stated at the top or in a signature-style format)
- Phone numbers (any format, including international)
- Email addresses
- Social media links (LinkedIn, GitHub, Twitter, etc.)
- Personal websites or portfolios
- Home or physical addresses (even partial ones)

❌ Do NOT include:
- Education, jobs, skills, certifications, programming languages
- Dates (unless related to address or birthdate)
- Project descriptions or company names

🧠 Output strictly as a plain array of strings (NO formatting, no markdown, no explanation).  
Example:
[
  "Ali Raza",
  "+92 300 1234567",
  "ali.raza@example.com",
  "linkedin.com/in/razadev",
  "House #4, DHA, Lahore"
]

⚠️ If no personal or sensitive data is found, or if the text is NOT a resume or personal document (e.g. article, code snippet, lorem ipsum), return only this exact string:
**${noResumeMsg}**

---

Here is the text to analyze:
"""
${text}
"""
`;
};


export const noResumeMsg =
    "We couldn’t find any personal info to redact. Please upload a valid resume PDF.";


export const cleanSocialLinks = (text: string): string => {
    return text.replace(/(linkedin\.com|github\.com|twitter\.com|x\.com|facebook\.com|instagram\.com|t\.me)[\s\/\w.-]*/gi, (match) =>
        match.replace(/\s+/g, "")
    );
};

export async function deleteOldFiles() {

    const utapi = new UTApi();

    const { files } = await utapi.listFiles();
    const now = Date.now()

    for (const file of files) {
        const age = now - file.uploadedAt

        if (age > 24 * 60 * 60 * 1000) {
            await utapi.deleteFiles(file.key);
        }
    }
}

// GeminiHelpers
export const handleGeminiResponse = async (text: string) => {
    const prompt = extractSensitiveInfoPrompt(text);
    const response = await geminiModel.generateContent(prompt);
    const message = response.response.text().trim();

    if (message === noResumeMsg) {
        throw new Error("NO_PERSONAL_INFO_FOUND");
    }

    return JSON.parse(message);
};
export const isGeminiRateLimitError = (err: unknown): boolean => {
    if (typeof err === "object" && err !== null && "message" in err) {
        const message = String((err as { message?: unknown }).message).toLowerCase();
        return message.includes("quota") || message.includes("rate limit") || message.includes("exceeded");
    }
    return false;
};

export const isGeminiOverloadError = (err: unknown): boolean => {
    if (typeof err === "object" && err !== null && "message" in err) {
        const message = String((err as { message?: unknown }).message).toLowerCase();
        return message.includes("unavailable") ||
            message.includes("overload") ||
            message.includes("too many requests");
    }
    return false;
};


// storageHelpers
export const uploadToSupabase = async (userId: string, filename: string | null, originalBuffer: Buffer, redactedBuffer: Uint8Array) => {
    const baseName = filename?.replace(/\.pdf$/i, "");
    const filePath = `resumes/${userId}/${filename}`;
    const redactedPath = `redactedResumes/${userId}/${baseName}_redacted.pdf`;

    const [originalRes, redactedRes] = await Promise.all([
        supabase.storage.from("resumes").upload(filePath, originalBuffer, { contentType: "application/pdf", upsert: true }),
        supabase.storage.from("resumes").upload(redactedPath, redactedBuffer, { contentType: "application/pdf", upsert: true })
    ]);

    if (originalRes.error) throw new Error(originalRes.error.message);
    if (redactedRes.error) throw new Error(redactedRes.error.message);

    const originalUrl = supabase.storage.from("resumes").getPublicUrl(filePath).data.publicUrl;
    const redactedUrl = supabase.storage.from("resumes").getPublicUrl(redactedPath).data.publicUrl;

    return { originalUrl, redactedUrl };
};
