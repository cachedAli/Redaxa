import { useUploadStore } from "@/components/store/uploadStore";
import { renderPdfPageToCanvas } from "./pdfToCanvas";

export const imageToFile = async (pdfData: ArrayBuffer) => {
    const canvas = await renderPdfPageToCanvas(pdfData);

    const fileName = useUploadStore.getState().fileName;
    if (!fileName) throw new Error("fileName is not set");

    const baseName = fileName.replace(/\.[^/.]+$/, "");
    const downloadName = `${baseName}_redacted.png`;

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((blob) => resolve(blob), "image/png")
    );

    if (!blob) throw new Error("Failed to create blob");

    const file = new File([blob], downloadName, { type: "image/png" });

    return file;
}
