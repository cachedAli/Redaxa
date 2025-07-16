import React from "react";
import clsx from "clsx";

import { LucideIcon } from "lucide-react";

export default function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className={clsx(
        "w-14 h-14 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-b from-blue-600 to-violet-600"
      )}
    >
      <Icon className="text-white" size={35} strokeWidth={2} />
    </div>
  );
}
