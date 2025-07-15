import React from "react";
import clsx from "clsx";

export default function Spinner({
  size = "md",
  color = "default",
}: {
  size?: "sm" | "md" | "lg";
  color?: "default" | "white";
}) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-12 h-12 border-4",
  };

  const baseColor =
    color === "white"
      ? "border-white border-t-indigo-300"
      : "border-blue-100 border-t-indigo-500";

  return (
    <div
      className={clsx(
        "animate-spin rounded-full",
        sizes[size],
        baseColor
      )}
    />
  );
}
