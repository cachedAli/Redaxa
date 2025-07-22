"use client";

import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { CircleCheckBig } from "lucide-react";

import { convertPdfToImageAndDownload } from "@/lib/client/pdfToImg";
import { useLoadingStore } from "@/components/store/loadingStore";
import { useUploadStore } from "@/components/store/uploadStore";
import { uploadToUploadThing } from "@/lib/client/uploadFiles";
import { urlToArrayBuffer } from "@/lib/client/utils";
import { imageToFile } from "@/lib/client/imgToFile";
import { noResumeMsg } from "@/lib/server/utils";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import ResumePreview from "./ResumePreview";
import { useFetch } from "@/hooks/useFetch";

export default function ResumeConversion() {
  const resumeConversionRef = useRef<HTMLDivElement | null>(null);

  const { scrollToSection, setScrollToSection, file } = useUploadStore(
    useShallow((state) => ({
      scrollToSection: state.scrollToSection,
      setScrollToSection: state.setScrollToSection,
      file: state.file,
    }))
  );

  const showActionButtonsLoading = useLoadingStore(
    (state) => state.showActionButtonsLoading
  );

  useEffect(() => {
    if (scrollToSection && resumeConversionRef.current) {
      const element = resumeConversionRef.current;
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        window.pageYOffset + elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setScrollToSection(false);
    }
  }, [scrollToSection]);

  return (
    file && (
      <div
        ref={resumeConversionRef}
        className="w-[970px] h-auto bg-blue-50 rounded-3xl p-6 flex"
      >
        <div className="bg-blue-900 h-[779px] w-3/5 rounded-3xl p-6 flex items-center justify-center">
          {file.trim() !== noResumeMsg ? (
            <ResumePreview />
          ) : (
            <p className="text-white text-lg font-medium text-center">{file}</p>
          )}
        </div>

        {showActionButtonsLoading && <ActionButtons file={file} />}
      </div>
    )
  );
}

const ActionButtons = ({ file }: { file: string | undefined }) => {
  const copyLinkLoading = useLoadingStore((state) => state.copyLinkLoading);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!linkCopied) return;

    const timeout = setTimeout(() => {
      setLinkCopied(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [linkCopied]);

  const copyLinkHandler = async () => {
    if (!file) return console.error("No file to download");

    try {
      const arrayBuffer = await urlToArrayBuffer(file);
      const imageFile = await imageToFile(arrayBuffer);
      const imgUrl = await uploadToUploadThing(imageFile);

      if (imgUrl) {
        try {
          await navigator.clipboard.writeText(imgUrl);
          setLinkCopied(true);
        } catch (err) {
          // fallback for strict browsers
          const textarea = document.createElement("textarea");
          textarea.value = imgUrl;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
            setLinkCopied(true);
          } catch (fallbackErr) {
            console.error("Both clipboard methods failed", fallbackErr);
          }
          document.body.removeChild(textarea);
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const downloadImageHandler = async () => {
    if (!file) {
      console.error("No file to download");
      return;
    }

    try {
      const arrayBuffer = await urlToArrayBuffer(file);
      await convertPdfToImageAndDownload(arrayBuffer);
    } catch (err) {
      console.error("Error converting file URL to ArrayBuffer:", err);
    }
  };

  return (
    <div className="w-2/5 p-6 flex flex-col items-center gap-20">
      <div className="w-full gap-4 flex flex-col items-center">
        <Button
          onClick={downloadImageHandler}
          className="w-full h-12 rounded-xl"
          size="lg"
        >
          Download Image
        </Button>

        <Button
          variant="secondary"
          onClick={copyLinkHandler}
          disabled={copyLinkLoading}
          className="w-full h-12 rounded-xl"
          size="lg"
        >
          {copyLinkLoading ? <Spinner size="md" /> : "Copy Link"}
        </Button>

        <div className="relative w-full">
          <AnimatePresence>
            <CopyLinkMessage linkCopied={linkCopied} />
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Redact Mode */}
      <RedactMode />
    </div>
  );
};

const CopyLinkMessage = ({ linkCopied }: { linkCopied: boolean }) => {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: linkCopied ? 1 : 0, y: linkCopied ? 0 : 10 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center justify-center text-green-700 gap-2 mt-2"
    >
      <div className="flex items-center gap-2">
        <CircleCheckBig size={20} className="text-green-600" />
        <h2 className="font-semibold text-sm sm:text-base">
          Link copied successfully
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        This link will remain active for 24 hours
      </p>
    </motion.div>
  );
};

const RedactMode = () => {
  const { manualRedactMode, setManualRedactMode } = useUploadStore(
    useShallow((state) => ({
      setManualRedactMode: state.setManualRedactMode,
      manualRedactMode: state.manualRedactMode,
    }))
  );
  return (
    <div className="w-full flex flex-col gap-2">
      {!manualRedactMode ? (
        <>
          <p className="text-sm text-gray-600 text-center">
            Didn't catch everything? You can manually redact any remaining
            sensitive text below.
          </p>
          <Button
            onClick={() => setManualRedactMode(true)}
            className="w-full h-12 rounded-xl"
            size="lg"
          >
            Redact Manually
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-center">
            Highlight the text you'd like to redact. You can select only one
            line at a time.
          </p>
          <RedactModeActionButtons setManualRedactMode={setManualRedactMode} />
        </>
      )}
    </div>
  );
};

const RedactModeActionButtons = ({
  setManualRedactMode,
}: {
  setManualRedactMode: (value: boolean) => void;
}) => {
  const [selectedText, setSelectedText] = useState("");
  const { redactedFile, setFile, setRedactedFile } = useUploadStore(
    useShallow((state) => ({
      redactedFile: state.redactedFile,
      setFile: state.setFile,
      setRedactedFile: state.setRedactedFile
    }))
  );

  useEffect(() => {
    const handleMouseUp = () => {
      const selected = window.getSelection();
      const text = selected?.toString().trim();

      if (text && text?.length > 0) {
        setSelectedText(text);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleApplyRedaction = async () => {
    if (!redactedFile) return;

    const formData = new FormData();
    formData.append("file", redactedFile);
    formData.append("selectedText", selectedText);
    const res = await useFetch("Post", "/api/redact-selected-text", formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const pdfBlob = new Blob([res?.data], {
      type: "application/pdf",
    });

    setRedactedFile(pdfBlob)
    const pdfUrl = URL.createObjectURL(pdfBlob);

    setFile(pdfUrl);

  };
  return (
    <div className="flex gap-2 w-full">
      <Button
        variant="secondary"
        onClick={() => setManualRedactMode(false)}
        className="w-1/2 h-12 rounded-xl"
        size="lg"
      >
        Cancel
      </Button>

      <Button
        onClick={handleApplyRedaction}
        className="w-1/2 h-12 rounded-xl"
        size="lg"
      >
        Apply Redaction
      </Button>
    </div>
  );
};
