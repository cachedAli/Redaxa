import clsx from "clsx";
import React from "react";
import FeatureList from "./FeatureList";

export default function Features() {
  return (
    <section
      id="features"
      className="pt-12 pb-52 h-full flex flex-col items-center"
    >
      <div
        className={clsx(
          "flex flex-col text-center gap-8 text-blue-900 px-28",
          "max-sm:px-12"
        )}
      >
        <h2 className="text-4xl font-semibold">What You Can Do with Redaxa</h2>

        <p className="text-xl leading-8">
          Use Redaxa once or make it part of your workflow. Get instant results
          without signing up, and unlock more control when you log in.
        </p>
      </div>

      <FeatureList />
    </section>
  );
}
