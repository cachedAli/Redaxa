import React from "react";

export default function Waves({
  color = "blue",
}: {
  color?: "blue" | "white";
}) {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill={color === "blue" ? "#162456" : "#eff6ff"}
        d="M0,160L60,160C120,160,240,160,360,181.3C480,203,600,245,720,256C840,267,960,245,1080,213.3C1200,181,1320,139,1380,117.3L1440,96V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
      />
    </svg>
  );
}
