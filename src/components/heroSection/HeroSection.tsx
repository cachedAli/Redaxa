import React from "react";
import clsx from "clsx";

import { FilePlus2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ResumePortrait from "./ResumePortrait";

export default function HeroSection() {
  return (
    <section
      className={clsx(
        "py-16 px-12 flex items-center justify-between w-full bg-gradient-to-r from-blue-900 via-violet-800 to-blue-900",
        "max-lg:flex-col max-lg:text-center max-lg:pt-28"
      )}
    >
      <div
        className={clsx(
          "flex flex-col w-[50%] gap-8 text-white",
          "max-lg:w-full"
        )}
      >
        <h1 className="font-bold text-5xl">Redact your resume in seconds</h1>

        <p className="text-xl">
          Redaxa makes it simple to hide sensitive details and share a polished
          version of your resume.
        </p>
        <Upload />
      </div>

      <ResumePortrait />
    </section>
  );
}

const Upload = () => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 w-60",
        "max-lg:w-full max-lg:items-center"
      )}
    >
      <Button size="lg" className="h-12 w-60 rounded-xl shadow-lg">
        <FilePlus2 size={20} /> Upload Your Resume
      </Button>

      <p className="text-center text-gray-100">or drag and drop your resume</p>
    </div>
  );
};
