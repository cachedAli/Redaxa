
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { TextItem } from "react-pdf";
import "@ungap/with-resolvers";
import fs from "fs/promises";
import { JSDOM } from "jsdom";

const { window } = new JSDOM();
globalThis.DOMMatrix = window.DOMMatrix;
// @ts-expect-error: ImageData polyfill for Node.js
globalThis.ImageData = class {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  colorSpace = "srgb"; // Required by pdfjs

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = new Uint8ClampedArray(width * height * 4);
  }
};

// @ts-expect-error: Path2D polyfill for Node.js
globalThis.Path2D = class {
  constructor(_path?: string | Path2D) {
  void _path; 
}
  addPath() { }
  arc() { }
  arcTo() { }
  bezierCurveTo() { }
  closePath() { }
  ellipse() { }
  lineTo() { }
  moveTo() { }
  quadraticCurveTo() { }
  rect() { }
};

const loadWorker = async () => {

  await import("pdfjs-dist/build/pdf.worker.min.mjs");
};

export const extractTextFromPDF = async (filePath: string): Promise<string> => {
  await loadWorker();

  const data = await fs.readFile(filePath);
  const uint8Array = new Uint8Array(data);
  const doc = await pdfjsLib.getDocument({ data: uint8Array }).promise;


  let fullText = "";

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);


    const textContent = await page.getTextContent();

    const lines: Record<number, { x: number; str: string }[]> = {};

    textContent.items.forEach((item) => {
      if ("str" in item && "transform" in item) {
        const typedItem = item as TextItem;
        const y = Math.round(typedItem.transform[5]);
        const x = typedItem.transform[4];
        if (!lines[y]) lines[y] = [];
        lines[y].push({ x, str: typedItem.str });
      }
    });

    const sortedY = Object.keys(lines)
      .map(Number)
      .sort((a, b) => b - a);

    for (const y of sortedY) {
      const line = lines[y].sort((a, b) => a.x - b.x);
      fullText += line.map((item) => item.str).join(" ") + "\n";
    }
  }

  return fullText;
};
