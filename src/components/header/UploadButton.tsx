"use client";

import React from "react";

import DropzoneProvider from "@/providers/DropzoneProvider";
import { useLoadingStore } from "../store/loadingStore";
import { useUploadStore } from "../store/uploadStore";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";

export default function UploadButton() {
  const redactResumeLoading = useLoadingStore(
    (state) => state.redactResumeLoading
  );

  const { manualRedactMode, setManualRedactMode } = useUploadStore(
    useShallow((state) => ({
      setManualRedactMode: state.setManualRedactMode,
      manualRedactMode: state.manualRedactMode,
    }))
  );
  return (
    <DropzoneProvider>
      {({ getRootProps, getInputProps, open }) => (
        <Button
          {...getRootProps()}
          onClick={() => {
            open()
            if (manualRedactMode) setManualRedactMode(false);
          }}
          size="lg"
          disabled={redactResumeLoading}
          className="max-sm:h-8 max-sm:gap-1.5 max-sm:px-3 max-[370px]:text-xs"
        >
          <input {...getInputProps()} hidden />
          Upload
        </Button>
      )}
    </DropzoneProvider>
  );
}
