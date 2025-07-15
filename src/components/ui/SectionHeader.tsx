"use client";

import React from "react";
import clsx from "clsx";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  description: string;
  textColor?: "blue" | "white";
};

export default function SectionHeader({
  title,
  description,
  textColor = "white",
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "flex flex-col text-center gap-8 px-28",
        "max-sm:px-12",
        textColor === "white" ? "text-white" : "text-blue-900"
      )}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-semibold"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="text-xl leading-8"
      >
        {description}
      </motion.p>
    </div>
  );
}
