"use client";

import React, { ReactElement } from "react";

import Dropzone, { DropzoneState } from "react-dropzone";
import { useShallow } from "zustand/react/shallow";
import { useRouter, usePathname } from "next/navigation";

import { useUploadStore } from "@/components/store/uploadStore";
import axios from "axios";

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

  const { setFile, setScrollToSection } = useUploadStore(
    useShallow((state) => ({
      setScrollToSection: state.setScrollToSection,
      setFile: state.setFile,
    }))
  );

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        const newFile = acceptedFiles[0];
        if (newFile) {
          setFile(URL.createObjectURL(newFile));

          const formData = new FormData();
          formData.append("file", newFile);

          axios
            .post("/api/redact-resume", formData)
            .then((response) => {
              console.log("axios ", response);
            })
            .catch((error) => {
              console.log(error);
            });

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
