"use client"

import { useUploadStore } from "@/components/store/uploadStore";
import { renderPdfPageToCanvas } from "./pdfToCanvas";



export async function convertPdfToImageAndDownload(pdfData: ArrayBuffer, addRedactedInName: boolean = false) {
    const canvas = await renderPdfPageToCanvas(pdfData)

    const fileName = useUploadStore.getState().fileName;

    const baseName = fileName?.replace(/\.[^/.]+$/, "");
    const downloadName = addRedactedInName ? `${baseName}.png` : `${baseName}_redacted.png`;


    const imgURL = canvas.toDataURL("image/png");


    const a = document.createElement("a");
    a.href = imgURL;
    a.download = downloadName ?? "unknown.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
