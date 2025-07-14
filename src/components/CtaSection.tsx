import React from "react";
import clsx from "clsx";

import { Upload } from "@/components/heroSection/Upload";

export default function CtaSection() {
  return (
    <section
      style={{
        background: "linear-gradient(to right, #1c398e, #5d0ec0, #1c398e)",
      }}
      className="pt-12 pb-20 gap-8 h-full flex flex-col items-center"
    >
      <div
        className={clsx(
          "flex flex-col text-center gap-8 text-white px-28",
          "max-sm:px-12"
        )}
      >
        <h2 className="text-4xl font-semibold">Ready to Redact Your Resume?</h2>

        <p className="text-xl leading-8">
          Upload your resume and instantly generate a clean, shareable version.
        </p>
      </div>

      <Upload />
    </section>
  );
}
