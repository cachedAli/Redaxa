
import {
    UploadCloud,
    FileDown,
    Link,
    LayoutTemplate,
    History,
    EyeOff,
    Wand2,
    Download
} from "lucide-react";

export const features = [
    // No account needed
    {
        title: "Upload & Redact Instantly",
        description: "Drop your resume and get a clean version in seconds",
        icon: UploadCloud
    },
    {
        title: "Download Redacted Resume",
        description: "Get your privacy-protected resume as a PDF",
        icon: FileDown
    },
    {
        title: "Copy a Shareable Link",
        description: "Share a secure link instead of sending the file",
        icon: Link
    },
    {
        title: "Layout Preserved",
        description: "Redacted resumes keep your original formatting intact",
        icon: LayoutTemplate
    },

    // Logged-in features
    {
        title: "Redaction History",
        description: "View all your previously redacted resumes",
        icon: History
    },
    {
        title: "Manual Control",
        description: "Choose exactly what you want to hide or unblur",
        icon: EyeOff
    },
    {
        title: "Smart Suggestions by Gemini",
        description: "Use Gemini to detect personal details automatically",
        icon: Wand2
    },
    {
        title: "Re-download Anytime",
        description: "Access and download past versions whenever you need",
        icon: Download
    }
];
