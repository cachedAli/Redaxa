"use client";

import React from "react";
import clsx from "clsx";

import FeatureGridSection from "./FeatureGridSection";
import { features } from "./constants";

export default function FeatureList() {
  return (
    <div className={clsx("w-full px-28", "max-sm:px-12")}>
      <FeatureGridSection features={features.slice(0, 4)} variant="free" />
      <FeatureGridSection features={features.slice(4)} variant="loggedIn" />
    </div>
  );
}
