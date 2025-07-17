"use client";

import clsx from "clsx";

import { FilePlus2 } from "lucide-react";
import { motion } from "framer-motion";

import DropzoneProvider from "@/providers/DropzoneProvider";

export const Upload = ({
  animateOnView = true,
  history = false,
}: {
  animateOnView?: boolean;
  history?: boolean;
}) => {
  return (
    <DropzoneProvider>
      {({ getRootProps, getInputProps, open }) => (
        <div
          onDragEnter={getRootProps().onDragEnter}
          onDragOver={getRootProps().onDragOver}
          onDrop={getRootProps().onDrop}
          className={clsx(
            "flex flex-col gap-4 w-60",
            "max-lg:w-full max-lg:items-center"
          )}
        >
          <motion.button
            onClick={open}
            initial={animateOnView ? { opacity: 0, y: 40 } : {}}
            whileInView={animateOnView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            type="button"
            className={clsx(
              "h-12 rounded-xl shadow-lg bg-indigo-500 hover:bg-blue-500 text-white flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300",
              history ? "w-64" : "w-60"
            )}
          >
            <input {...getInputProps()} hidden />
            <FilePlus2 size={20} />
            {history ? "Redact Your First Resume" : "Upload Your Resume"}
          </motion.button>

          <motion.p
            initial={animateOnView ? { opacity: 0, y: 40 } : {}}
            whileInView={animateOnView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-100"
          >
            or drag and drop your resume
          </motion.p>
        </div>
      )}
    </DropzoneProvider>
  );
};
