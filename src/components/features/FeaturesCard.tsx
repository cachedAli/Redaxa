import React from "react";
import clsx from "clsx";

import { motion } from "framer-motion";

export default function FeaturesCard({
  feature,
  variant = "free",
}: {
  feature: any;
  variant?: "free" | "loggedIn";
}) {
  const Icon = feature.icon;

  const bgColor =
    variant === "free"
      ? "bg-emerald-500"
      : "bg-gradient-to-br from-indigo-500 to-violet-500";

  const hoverOverlay =
    variant === "free"
      ? "from-emerald-500/5 to-teal-500/5"
      : "from-indigo-500/5 to-violet-500/5";

  const hoverText =
    variant === "free"
      ? "group-hover:text-emerald-700"
      : "group-hover:text-indigo-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group flex flex-col items-center text-center relative bg-blue-100 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Hover Overlay */}
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          hoverOverlay
        )}
      />

      {/* Icon Box */}
      <div className="mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div
            className={clsx(
              "w-12 h-12 rounded-lg flex items-center justify-center shadow-md",
              bgColor
            )}
          >
            {Icon && <Icon className="text-white" strokeWidth={2} />}
          </div>
        </div>
      </div>

      {/* Text */}
      <h4
        className={clsx(
          "font-bold text-blue-900 text-lg mb-2 transition-colors",
          hoverText
        )}
      >
        {feature.title}
      </h4>
      <p className="text-blue-900 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
