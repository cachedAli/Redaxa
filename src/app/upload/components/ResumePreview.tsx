// ResumePreview.jsx
"use client";

import dynamic from "next/dynamic";

const ResumePreviewContent = dynamic(() => import("./ResumePreviewContent"), {
  ssr: false,
});

export default function ResumePreview({
  file,
  isHistory = false,
}: {
  file: string | undefined;
  isHistory?: boolean;
}) {
  return <ResumePreviewContent file={file} isHistory={isHistory} />;
}
