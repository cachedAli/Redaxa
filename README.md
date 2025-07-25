# Redaxa

Redaxa is a privacy-first resume redaction tool. Instantly redact sensitive details from your PDF resume and share a clean version with confidence. No signup required.

## ✨ Features

### Free Features
- ⚡ Instant PDF redaction
- 📄 Download redacted resume
- 🔗 Shareable secure link
- 🎯 Preserves original layout

### Pro Features (with account)
- 🕒 Redaction history
- 🖊️ Manual redaction control
- 💡 Smart field suggestions
- ☁️ Cloud access to redacted files

## 🔐 Why Redaxa?

Sharing your resume shouldn't mean giving up your privacy. Redaxa helps you:
- Protect sensitive info like email, phone, address
- Avoid identity theft
- Control what you share and with whom

## 🛠 Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API routes, PDF.js, Prisma
- **Auth**: NextAuth.js
- **Storage**: UploadThing, Supabase
- **Deployment**: Vercel (with Edge Functions)
- **AI Integration**: Gemini API (used for redaction)

## 📸 Preview

![Redaxa Screenshot](https://github.com/user-attachments/assets/78f2e702-1529-4339-a50c-ba0f4e6f8815)

## 🚀 Getting Started (Dev Setup)

```bash
git clone https://github.com/cachedali/redaxa.git
cd redaxa
npm install
npm run dev
