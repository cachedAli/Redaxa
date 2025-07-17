"use client";

import React from "react";

import DropzoneProvider from "@/providers/DropzoneProvider";
import { Button } from "../ui/button";

export default function UploadButton() {
  return (
    <DropzoneProvider>
      {({ getRootProps, getInputProps }) => (
        <Button
          {...getRootProps()}
          size="lg"
          className="max-sm:h-8 max-sm:gap-1.5 max-sm:px-3 max-[370px]:text-xs"
        >
          <input {...getInputProps()} hidden />
          Upload
        </Button>
      )}
    </DropzoneProvider>
  );
}
