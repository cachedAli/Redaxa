"use client"

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";


export async function renderPdfPageToCanvas(pdfData: ArrayBuffer) {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // @ts-expect-error: canvasContext type mismatch in pdfjs render method
    await page.render({ canvasContext: context, viewport }).promise;

    return canvas;
}
