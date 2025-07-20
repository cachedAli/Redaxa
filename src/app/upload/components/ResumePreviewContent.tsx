"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useUploadStore } from "@/components/store/uploadStore";
import Spinner from "@/components/ui/Spinner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumePreviewContent() {
  const file = useUploadStore((state) => state.file);

  return (
    <Document file={file} loading={<Spinner size="lg" />}>
      <div className="rounded-2xl overflow-hidden w-full">
        <Page
          pageNumber={1}
          width={400}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    </Document>
  );
}
