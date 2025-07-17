// ResumePreview.jsx
"use client";

import dynamic from "next/dynamic";

const ResumePreviewContent = dynamic(() => import("./ResumePreviewContent"), {
  ssr: false,
});

export default function ResumePreview() {
  return <ResumePreviewContent />;
}
