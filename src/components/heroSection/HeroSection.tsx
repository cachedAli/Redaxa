import React from "react";
import clsx from "clsx";

import ResumeProtected from "./ResumeProtected";
import { Upload } from "./Upload";
import Waves from "../ui/Waves";

export default function HeroSection() {
  return (
    <section className="relative">
      <div
        className={clsx(
          "pt-16 pb-40 px-12 flex items-center justify-between w-full bg-gradient-main",
          "max-lg:flex-col max-lg:text-center max-lg:pt-28",
          "max-sm:pb-24"
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
            Redaxa makes it simple to hide sensitive details and share a
            polished version of your resume.
          </p>
          <Upload animateOnView={false} />
        </div>

        <ResumeProtected />
      </div>
      <Waves />
    </section>
  );
}
