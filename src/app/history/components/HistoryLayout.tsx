"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { CircleCheckBig, Download, Eye, EyeClosed, Link } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import ResumePreview from "@/app/upload/components/ResumePreview";
import { capitalizeFirstLetter, urlToArrayBuffer } from "@/lib/client/utils";
import { convertPdfToImageAndDownload } from "@/lib/client/pdfToImg";
import { useUploadStore } from "@/components/store/uploadStore";
import { uploadToUploadThing } from "@/lib/client/uploadFiles";
import { imageToFile } from "@/lib/client/imgToFile";
import { HistoryRecords } from "@/types/historyTypes";

export default function HistoryLayout({
  resumeHistory,
}: {
  resumeHistory: HistoryRecords;
}) {
  const [unblurId, setUnblurId] = useState("");

  console.log(unblurId);

  return (
    <div className="text-white flex flex-col w-full items-center gap-8">
      <h2 className="text-4xl font-semibold text-center">
        Your Redaction History
      </h2>

      <div
        className={clsx(
          "grid grid-cols-4 w-full items-start gap-4 gap-y-6",
          "max-lg:grid-cols-3",
          "max-md:grid-cols-2",
          "max-sm:grid-cols-1"
        )}
      >
        {resumeHistory?.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "relative h-[580px] items-center justify-between bg-transparent border border-violet-300 flex flex-col gap-4 p-6 rounded-3xl shadow-2xl",
              "max-[1300px]:h-[500px]",
              "max-md:h-[550px]",
              "max-sm:h-[580px]",
              "max-[400px]:h-[500px]!"
            )}
          >
            <ResumePreview
              file={
                unblurId === item.id ? item.resumeUrl : item.redactedResumeUrl
              }
              isHistory
            />

            <div className="flex flex-col gap-5">
              <FileInfo item={item} />
              <ActionButtons
                item={item}
                setUnblurId={setUnblurId}
                unblurId={unblurId}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ActionButtons = ({
  item,
  setUnblurId,
  unblurId,
}: {
  item: any;
  setUnblurId: React.Dispatch<React.SetStateAction<string>>;
  unblurId: string;
}) => {
  const setFileName = useUploadStore((state) => state.setFileName);
  const [linkCopied, setLinkCopied] = useState(false);
  const [copyLinkId, setCopyLinkId] = useState("");
  const [downloadId, setDownloadId] = useState("");

  useEffect(() => {
    if (!linkCopied) return;

    const timeout = setTimeout(() => {
      setLinkCopied(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [linkCopied]);

  // Download File
  const downloadImageHandler = async () => {
    if (!item.redactedResumeUrl) {
      console.error("No file to download");
      return;
    }

    try {
      setDownloadId(item.id);
      setFileName(item.fileName);
      const arrayBuffer = await urlToArrayBuffer(
        unblurId === item.id ? item.resumeUrl : item.redactedResumeUrl
      );
      await convertPdfToImageAndDownload(
        arrayBuffer,
        unblurId !== "" ? true : false
      );
      setDownloadId("");
    } catch (err) {
      setDownloadId("");
      console.error("Error converting file URL to ArrayBuffer:", err);
    }
  };

  // Switch Between Resume
  const toggleUnblur = () => {
    if (unblurId === item.id) {
      setUnblurId("");
    } else {
      setUnblurId(item.id);
    }
  };

  // Copy File
  const copyLinkHandler = async () => {
    if (!item) return console.error("No file to download");

    setCopyLinkId(item.id);
    try {
      setFileName(item.fileName);
      const arrayBuffer = await urlToArrayBuffer(
        unblurId === item.id ? item.resumeUrl : item.redactedResumeUrl
      );
      const imageFile = await imageToFile(
        arrayBuffer,
        unblurId !== "" ? true : false
      );
      const imgUrl = await uploadToUploadThing(imageFile);

      if (imgUrl) {
        try {
          await navigator.clipboard.writeText(imgUrl);
          setLinkCopied(true);
          setCopyLinkId("");
        } catch (err) {
          // fallback for strict browsers
          const textarea = document.createElement("textarea");
          textarea.value = imgUrl;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
            setLinkCopied(true);
            setCopyLinkId("");
          } catch (fallbackErr) {
            console.error("Both clipboard methods failed", fallbackErr);
            setCopyLinkId("");
          }
          document.body.removeChild(textarea);
        }
      }
    } catch (error) {
      console.error("Error", error);
      setCopyLinkId("");
    }
  };

  return (
    <div className="flex items-center justify-center gap-14">
      <Download
        onClick={downloadImageHandler}
        className={clsx(
          "cursor-pointer hover:text-teal-300 transition-colors duration-300",
          downloadId === item.id && "pointer-events-none opacity-50"
        )}
      />
      {unblurId === item.id ? (
        <Eye
          onClick={() => {
            setUnblurId(item.id);
            toggleUnblur();
          }}
          className="cursor-pointer hover:text-teal-300 transition-colors duration-300"
        />
      ) : (
        <EyeClosed
          onClick={() => {
            setUnblurId(item.id);
            toggleUnblur();
          }}
          className="cursor-pointer hover:text-teal-300 transition-colors duration-300"
        />
      )}

      <Link
        onClick={copyLinkHandler}
        className={clsx(
          "cursor-pointer hover:text-teal-300 transition-colors duration-300",
          copyLinkId === item.id && "pointer-events-none opacity-50"
        )}
      />

      <AnimatePresence>
        {<CopyLinkMessage linkCopied={linkCopied} />}
      </AnimatePresence>
    </div>
  );
};

const FileInfo = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-center font-semibold">
        {capitalizeFirstLetter(item.fileName)}
      </h2>
      <span className="text-center text-sm text-gray-100">
        {new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
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
      className=" bg-blue-50 p-2 rounded-2xl absolute bottom-[68px] flex flex-col items-center justify-center text-green-700 gap-2 mt-2"
    >
      <div className="flex items-center gap-2">
        <CircleCheckBig size={20} className="text-green-600 max-sm:size-4" />
        <h2 className="font-semibold text-sm">Link copied successfully</h2>
      </div>
      <p className="text-xs text-gray-600 max-sm:text-xs">
        This link will remain active for 24 hours
      </p>
    </motion.div>
  );
};
