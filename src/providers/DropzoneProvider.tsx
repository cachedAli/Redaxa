"use client";

import React, { ReactElement } from "react";

import Dropzone, { DropzoneState } from "react-dropzone";
import { useRouter, usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

import { useLoadingStore } from "@/components/store/loadingStore";
import { useUploadStore } from "@/components/store/uploadStore";
import { useFetch } from "@/hooks/useFetch";

export default function DropzoneProvider({
  children,
}: {
  children: (props: {
    getRootProps: DropzoneState["getRootProps"];
    getInputProps: DropzoneState["getInputProps"];
    open: DropzoneState["open"];
  }) => ReactElement;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { setFile, setScrollToSection, setFileName, setRedactedFile } =
    useUploadStore(
      useShallow((state) => ({
        setScrollToSection: state.setScrollToSection,
        setFile: state.setFile,
        setFileName: state.setFileName,
        setRedactedFile: state.setRedactedFile,
      }))
    );

  const setShowActionButtonsLoading = useLoadingStore(
    (state) => state.setShowActionButtonsLoading
  );

  const handleUpload = async (formData: FormData) => {
    setShowActionButtonsLoading(false);
    setScrollToSection(true);
    const response = await useFetch("Post", "/api/redact-resume", formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response) return;

    const contentType = response.headers["content-type"];

    if (contentType === "application/pdf") {
      const pdfBlob = new Blob([response.data], {
        type: "application/pdf",
      });
      setRedactedFile(pdfBlob);

      const pdfUrl = URL.createObjectURL(pdfBlob);
      setFile(pdfUrl);
      setShowActionButtonsLoading(true);
    } else if (contentType === "application/json") {
      const text = await new Response(response.data).text();
      const parse = JSON.parse(text);
      setFile(parse.message);
      setShowActionButtonsLoading(false);
    }
  };

  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        const newFile = acceptedFiles[0];
        if (newFile) {
          setFile(URL.createObjectURL(newFile));

          setFileName(newFile.name);

          const formData = new FormData();
          formData.append("file", newFile);

          await handleUpload(formData);

          if (pathname !== "/upload") {
            router.push("/upload");
            setScrollToSection(true);
          } else {
            setScrollToSection(true);
          }
        }
      }}
      accept={{
        "application/pdf": [],
      }}
      maxSize={5 * 1024 * 1024}
      multiple={false}
    >
      {({ getRootProps, getInputProps, open }) =>
        children({ getRootProps, getInputProps, open })
      }
    </Dropzone>
  );
}
