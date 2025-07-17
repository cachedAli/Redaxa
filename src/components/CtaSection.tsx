import React from "react";

import { Upload } from "@/components/ui/Upload";
import SectionHeader from "./ui/SectionHeader";

export default function CtaSection() {
  return (
    <section className="pt-12 pb-20 gap-8 h-full flex flex-col items-center bg-gradient-main">
      <SectionHeader
        title="Ready to Redact Your Resume?"
        description="Upload your resume and instantly generate a clean, shareable version."
      />

      <Upload />
    </section>
  );
}
