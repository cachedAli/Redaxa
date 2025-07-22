"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useShallow } from "zustand/react/shallow";

import { useUploadStore } from "@/components/store/uploadStore";
import Spinner from "@/components/ui/Spinner";
import "react-pdf/dist/Page/TextLayer.css";
import "../../globals.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumePreviewContent() {
  const { file, manualRedactMode } = useUploadStore(
    useShallow((state) => ({
      file: state.file,
      manualRedactMode: state.manualRedactMode,
    }))
  );

  return (
    <Document key={file} file={file} loading={<Spinner size="lg" />}>
      <div className="rounded-2xl overflow-hidden w-full">
        <Page
          pageNumber={1}
          width={500}
          renderTextLayer={manualRedactMode ? true : false}
          renderAnnotationLayer={false}
        />
      </div>
    </Document>
  );
}
