import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import "@ungap/with-resolvers";
import fs from "fs/promises";


const loadWorker = async () => {
//   @ts-ignore
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

    textContent.items.forEach((item: any) => {
      const y = Math.round(item.transform[5]);
      const x = item.transform[4];
      if (!lines[y]) lines[y] = [];
      lines[y].push({ x, str: item.str });

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
