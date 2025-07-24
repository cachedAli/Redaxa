"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { AnimatePresence, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { CircleCheckBig } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { convertPdfToImageAndDownload } from "@/lib/client/pdfToImg";
import { useLoadingStore } from "@/components/store/loadingStore";
import { useUploadStore } from "@/components/store/uploadStore";
import { uploadToUploadThing } from "@/lib/client/uploadFiles";
import { urlToArrayBuffer } from "@/lib/client/utils";
import { imageToFile } from "@/lib/client/imgToFile";
import { useFetchApi } from "@/hooks/useFetchApi";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import ResumePreview from "./ResumePreview";

export default function ResumeConversion() {
  const resumeConversionRef = useRef<HTMLDivElement | null>(null);

  const { scrollToSection, setScrollToSection, file } = useUploadStore(
    useShallow((state) => ({
      scrollToSection: state.scrollToSection,
      setScrollToSection: state.setScrollToSection,
      file: state.file,
    }))
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

  const redactResumeLoading = useLoadingStore(
    (state) => state.redactResumeLoading
  );

  return (
    file && (
      <div
        ref={resumeConversionRef}
        className={clsx(
          "w-[970px] h-auto bg-blue-50 rounded-3xl p-6 flex",
          "max-lg:w-full max-lg:flex-col"
        )}
      >
        <div
          className={clsx(
            "bg-blue-900 relative w-3/5 rounded-3xl p-6 flex items-center justify-center",
            "max-lg:w-full",
            typeof file === "string" && file.startsWith("blob:")
              ? "h-[779px] max-lg:h-auto"
              : "h-auto"
          )}
        >
          {/* Skeleton */}
          {redactResumeLoading && (
            <div className="bg-gray-300/50 animate-pulse w-full h-full absolute rounded-3xl z-30"></div>
          )}
          {typeof file === "string" && file.startsWith("blob:") ? (
            <ResumePreview file={file} />
          ) : (
            <p className="text-white text-lg font-medium text-center">
              {typeof file === "string" ? file : "Something went wrong."}
            </p>
          )}
        </div>

        {typeof file === "string" && file.startsWith("blob:") && (
          <ActionButtons file={file} />
        )}
      </div>
    )
  );
}

const ActionButtons = ({ file }: { file: string | undefined }) => {
  const { copyLinkLoading, redactResumeLoading } = useLoadingStore(
    useShallow((state) => ({
      copyLinkLoading: state.copyLinkLoading,
      redactResumeLoading: state.redactResumeLoading,
    }))
  );
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
    <div
      className={clsx(
        "w-2/5 p-6 flex flex-col items-center",
        "max-lg:w-full",
        "max-sm:px-2 py-4"
      )}
    >
      <div className="w-full gap-4 flex flex-col items-center h-2/5">
        {redactResumeLoading ? (
          <div className="w-full flex flex-col gap-3 -mt-1">
            <Skeleton
              height={48}
              width="100%"
              borderRadius={14}
              baseColor="#615fff"
              highlightColor="#2b7fff"
            />
            <Skeleton
              height={48}
              width="100%"
              borderRadius={14}
              baseColor="#cbd5e1"
              highlightColor="#e2e8f0"
            />
          </div>
        ) : (
          <>
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
          </>
        )}
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
        <CircleCheckBig size={20} className="text-green-600 max-sm:size-4" />
        <h2 className="font-semibold text-sm sm:text-base">
          Link copied successfully
        </h2>
      </div>
      <p className="text-sm text-gray-600 max-sm:text-xs">
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

  const redactResumeLoading = useLoadingStore(
    (state) => state.redactResumeLoading
  );
  return (
    <div className="w-full flex flex-col gap-2">
      {!manualRedactMode ? (
        <>
          <p className="text-sm text-gray-600 text-center max-sm:text-xs">
            Didn't catch everything? You can manually redact any remaining
            sensitive text below.
          </p>

          {redactResumeLoading ? (
            <div className="-mt-1">
              <Skeleton
                height={48}
                width="100%"
                borderRadius={14}
                baseColor="#615fff"
                highlightColor="#2b7fff"
              />
            </div>
          ) : (
            <Button
              onClick={() => setManualRedactMode(true)}
              className="w-full h-12 rounded-xl"
              size="lg"
            >
              Redact Manually
            </Button>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-center max-sm:text-xs">
            Highlight the text you'd like to redact. You can select across
            multiple lines if needed.
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
  const { redactedFile, setFile, setRedactedFile, fileName } = useUploadStore(
    useShallow((state) => ({
      redactedFile: state.redactedFile,
      setFile: state.setFile,
      setRedactedFile: state.setRedactedFile,
      fileName: state.fileName,
    }))
  );

  const { setRedactSelectedTextLoading, redactSelectedTextLoading } =
    useLoadingStore(
      useShallow((state) => ({
        setRedactSelectedTextLoading: state.setRedactSelectedTextLoading,
        redactSelectedTextLoading: state.redactSelectedTextLoading,
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

    if (!selectedText) return;

    if (!fileName) return;

    setRedactSelectedTextLoading(true);

    const formData = new FormData();
    formData.append("file", redactedFile);
    formData.append("selectedText", selectedText);
    formData.append("fileName", fileName);
    const res = await useFetchApi(
      "Post",
      "/api/redact-selected-text",
      formData,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res) {
      setRedactSelectedTextLoading(false);
    }

    const pdfBlob = new Blob([res?.data], {
      type: "application/pdf",
    });

    setRedactedFile(pdfBlob);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    setManualRedactMode(false);

    setFile(pdfUrl);
  };
  return (
    <div className="flex gap-2 w-full">
      <Button
        variant="secondary"
        disabled={redactSelectedTextLoading}
        onClick={() => setManualRedactMode(false)}
        className="w-1/2 h-12 rounded-xl max-sm:text-sm"
        size="lg"
      >
        Cancel
      </Button>

      <Button
        onClick={handleApplyRedaction}
        disabled={redactSelectedTextLoading}
        className="w-1/2 h-12 rounded-xl max-sm:text-sm"
        size="lg"
      >
        {redactSelectedTextLoading ? <Spinner size="md" /> : "Apply Redaction"}
      </Button>
    </div>
  );
};
