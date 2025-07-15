import React from "react";
import clsx from "clsx";

import { LockKeyhole, Rocket } from "lucide-react";
import FeaturesCard from "./FeaturesCard";

export default function FeatureGridSection({
  features,
  variant = "free",
}: {
  title?: string;
  features: any[];
  variant: "free" | "loggedIn";
}) {
  return (
    <div className="mb-12">
      <FeatureBadge variant={variant} />

      <div className={clsx("grid grid-cols-2 gap-6", "max-md:grid-cols-1")}>
        {features.map((feature) => (
          <FeaturesCard
            key={feature.title}
            feature={feature}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

const FeatureBadge = ({ variant = "free" }) => {
  const isFree = variant === "free";

  const icon = isFree ? (
    <Rocket className="w-5 h-5 text-emerald-600" />
  ) : (
    <LockKeyhole className="w-5 h-5 text-indigo-600" />
  );

  const title = isFree ? "Free Features" : "Advanced Features";
  const label = isFree ? "No Account Needed" : "Account Required";

  return (
    <div className="text-center mb-12 mt-12">
      <div
        className={clsx(
          "inline-flex items-center gap-4 rounded-xl px-6 py-3 border backdrop-blur-md shadow-sm",
          isFree
            ? "bg-gradient-to-r from-emerald-100/40 to-teal-100/40 border-emerald-300/40"
            : "bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-violet-100/50 border-indigo-200/50"
        )}
      >
        {icon}
        <h3
          className={clsx(
            "text-xl font-semibold tracking-tight",
            "max-sm:text-base",
            isFree ? "text-gray-800" : "text-gray-900"
          )}
        >
          {title}
        </h3>
        <div
          className={clsx(
            "text-xs font-medium px-2.5 py-1 rounded-full",
            isFree
              ? "bg-emerald-200 text-emerald-800"
              : "bg-indigo-200 text-indigo-800"
          )}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
