declare module 'pdfjs-dist/build/pdf.mjs' {
  export * from 'pdfjs-dist/types/src/pdf';
}

declare module 'pdfjs-dist/build/pdf.worker.min.mjs';

declare module "pdfjs-dist/legacy/build/pdf.node.mjs";

declare module "pdfjs-legacy/build/pdf" {
  import type { PDFDocumentProxy, PDFPageProxy, TextContent } from "pdfjs-dist";
  export function getDocument(src: any): { promise: Promise<PDFDocumentProxy> };
  export interface GlobalWorkerOptions {
    workerSrc: string;
  }
  export const GlobalWorkerOptions: GlobalWorkerOptions;
}

declare module "pdfjs-legacy/build/pdf.worker.js";
