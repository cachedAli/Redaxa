import React from "react";
import clsx from "clsx";

import PrivacyInfoModal from "./PrivacyInfoModal";
import SectionHeader from "../ui/SectionHeader";
import Waves from "../ui/Waves";

export default function WhyPrivacyMatters() {
  return (
    <section className="relative">
      <div
        className={clsx(
          "relative pt-12 pb-52 h-full bg-blue-950 flex flex-col gap-8 items-center",
          "max-sm:pb-32"
        )}
      >
        <SectionHeader
          title="Why Privacy Matters?"
          description="Your personal information is valuable and deserves protection.When
            applying for jobs, you can't always control who sees your resume or
            how it's stored and shared."
        />

        <PrivacyInfoModal />
      </div>
      <Waves color="white" />
    </section>
  );
}
