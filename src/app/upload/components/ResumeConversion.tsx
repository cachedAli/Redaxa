"use client";

import React, { useEffect, useRef } from "react";
import ResumePreview from "./ResumePreview";
import { useUploadStore } from "@/components/store/uploadStore";
import { useShallow } from "zustand/react/shallow";

export default function ResumeConversion() {
  const resumeConversionRef = useRef<HTMLDivElement | null>(null);

  const { scrollToSection, setScrollToSection, file } = useUploadStore(
    useShallow((state) => ({
      scrollToSection: state.scrollToSection,
      setScrollToSection: state.setScrollToSection,
      file: state.file,
    }))
  );

  useEffect(() => {
    if (scrollToSection && resumeConversionRef.current) {
      const element = resumeConversionRef.current;
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        window.pageYOffset + elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setScrollToSection(false);
    }
  }, [scrollToSection]);

  return (
    file && (
      <div
        ref={resumeConversionRef}
        className="w-[970px] h-auto bg-blue-50 rounded-3xl p-6 flex"
      >
        <div className="bg-blue-900 h-full w-1/2 rounded-3xl p-6 flex items-center justify-center">
          <ResumePreview />
        </div>
      </div>
    )
  );
}
