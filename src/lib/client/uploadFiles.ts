"use client"

import { useLoadingStore } from "@/components/store/loadingStore";
import { uploadFiles } from "@/lib/client/uploadthingClient";

export const uploadToUploadThing = async (file: File) => {

  useLoadingStore.getState().setCopyLinkLoading(true);
  try {
    const res = await uploadFiles("redactedImageUploader", {
      files: [file],
    });

    const imageUrl = res[0].ufsUrl;

    useLoadingStore.getState().setCopyLinkLoading(false);


    return imageUrl;
  } catch (err) {
    console.error("❌ Upload failed:", err);
    useLoadingStore.getState().setCopyLinkLoading(false);
    return null;
  }
};
