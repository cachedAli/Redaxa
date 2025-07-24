"use client";

import React, { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { useUploadStore } from "@/components/store/uploadStore";
import Spinner from "@/components/ui/Spinner";
import "react-pdf/dist/Page/TextLayer.css";
import "../../globals.css";
import clsx from "clsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function ResumePreviewContent({
  file,
  isHistory = false,
}: {
  file: string | undefined;
  isHistory?: boolean;
}) {
  const manualRedactMode = useUploadStore((state) => state.manualRedactMode);

  const containerRef = useRef<HTMLDivElement>(null);

  const [pageWidth, setPageWidth] = useState(!isHistory ? 500 : 300);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setPageWidth(Math.min(containerWidth, !isHistory ? 500 : 300));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isHistory]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "w-full flex flex-1 items-center justify-center",
        isHistory ? "max-w-[300px]" : "max-w-[500px]"
      )}
    >
      <Document
        key={file}
        file={file}
        loading={
          <div className="flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <div className="rounded-2xl overflow-hidden w-full">
          <Page
            pageNumber={1}
            width={pageWidth}
            renderTextLayer={manualRedactMode}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </div>
  );
}
