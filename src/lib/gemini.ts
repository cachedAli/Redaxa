import { GoogleGenerativeAI } from "@google/generative-ai"

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiModel = genAi.getGenerativeModel({ model: "gemini-1.5-flash" })
