import React from "react";
import clsx from "clsx";

import PrivacyInfoModal from "./PrivacyInfoModal";
import Waves from "../ui/Waves";

export default function WhyPrivacyMatters() {
  return (
    <section className="relative">
      <div className="relative pt-12 pb-52 h-full bg-blue-950 flex flex-col gap-8 items-center">
        <div
          className={clsx(
            "flex flex-col text-center gap-8 text-white px-28",
            "max-sm:px-12"
          )}
        >
          <h2 className="text-4xl font-semibold">Why Privacy Matters?</h2>

          <p className="text-xl leading-8">
            Your personal information is valuable and deserves protection. When
            applying for jobs, you can't always control who sees your resume or
            how it's stored and shared.
          </p>
        </div>

        <PrivacyInfoModal />
      </div>
      <Waves color="white" />
    </section>
  );
}
