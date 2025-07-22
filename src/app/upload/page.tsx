import React from "react";
import { Upload } from "@/components/ui/Upload";
import ResumeConversion from "./components/ResumeConversion";

export default function page() {
  return (
    <main className="bg-gradient-main flex flex-col py-40 items-center text-white gap-8 w-full">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-semibold">Upload your resume</h1>
        <h1 className="text-4xl font-semibold ">
          to redact personal information
        </h1>
      </div>
      <Upload animateOnView={false} />
      <ResumeConversion />
    </main>
  );
}
