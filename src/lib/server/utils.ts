import { NextRequest } from "next/server";
import { Readable } from "stream";


export const toNodeRequest = (req: NextRequest) => {
    const body = req.body;
    if (!body) throw new Error("No body found in request");

    const readableNodeStream = Readable.fromWeb(body as any)
    return Object.assign(readableNodeStream, {
        headers: Object.fromEntries(req.headers.entries()),
        method: req.method,
        url: ""
    })
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

export const noResumeMsg = "No sensitive personal information found. This does not appear to be a resume or personal document."

export const cleanSocialLinks = (text: string): string => {
    return text.replace(/(linkedin\.com|github\.com|twitter\.com|x\.com|facebook\.com|instagram\.com|t\.me)[\s\/\w.-]*/gi, (match) =>
        match.replace(/\s+/g, "")
    );
};


