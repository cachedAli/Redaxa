import React from "react";
import clsx from "clsx";

import SectionHeader from "../ui/SectionHeader";
import FeatureList from "./FeatureList";
import Waves from "../ui/Waves";

export default function Features() {
  return (
    <section id="features" className="relative">
      <div
        className={clsx(
          "pt-12 pb-52 h-full flex flex-col items-center bg-blue-50",
          "max-sm:pb-24"
        )}
      >
        <SectionHeader
          title="What You Can Do with Redaxa"
          description="Use Redaxa once or make it part of your workflow. Get instant results
          without signing up, and unlock more control when you log in."
          textColor="blue"
        />

        <FeatureList />
      </div>
      <Waves color="grad" />
    </section>
  );
}
