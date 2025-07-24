
import { PDFDocument, rgb } from "@cantoo/pdf-lib";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { cleanSocialLinks } from "./utils";
import { TextItem } from "react-pdf";
import { JSDOM } from "jsdom";
import fs from "fs/promises"


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

export const redactSensitiveInfo = async (filePath: string, array?: string[], selectedText?: string): Promise<Uint8Array> => {
    await loadWorker();

    const data = await fs.readFile(filePath);
    const original = new Uint8Array(data);

    //separate copies:
    const pdfjsArray = new Uint8Array(original);
    const pdfLibArray = new Uint8Array(original);


    const doc = await pdfjsLib.getDocument({ data: pdfjsArray }).promise
    const pdfDoc = await PDFDocument.load(pdfLibArray);

    const sensitiveWords = new Set(
        array?.map((str) =>
            cleanSocialLinks(str.replace(/\s+/g, "").toLowerCase())
        )
    );

    for (let i = 0; i < doc.numPages; i++) {
        const page = await doc.getPage(i + 1);
        const pdfLibPage = pdfDoc.getPage(i);

        const textContent = await page.getTextContent();


        const linesMap = new Map<number, TextItem[]>();
        textContent.items.forEach((item) => {
            if ("transform" in item && Array.isArray(item.transform) && "str" in item) {
                const typedItem = item as TextItem;
                const y = Math.round(typedItem.transform[5]);
                if (!linesMap.has(y)) linesMap.set(y, []);
                linesMap.get(y)?.push(typedItem);
            }
        });

        if (!selectedText) {
            // Iterate over each line
            for (const [y, items] of linesMap.entries()) {
                // Combine cleaned line
                const cleanedLine = items
                    .map((i) => cleanSocialLinks(i.str.replace(/\s+/g, "").toLowerCase()))
                    .join("");

                for (const word of sensitiveWords) {
                    if (!cleanedLine.includes(word)) continue;

                    // Now redact matching segments
                    let remaining = word;

                    for (const item of items) {
                        const cleaned = cleanSocialLinks(item.str.replace(/\s+/g, "").toLowerCase());

                        if (remaining.startsWith(cleaned)) {
                            const x = item.transform[4];
                            const height = item.height;
                            const width = item.width;

                            pdfLibPage.drawRectangle({
                                x,
                                y: y - 2,
                                width,
                                height: height * 1.2,
                                color: rgb(0, 0, 0),
                                opacity: 1,
                                borderWidth: 1,
                                rx: 3,
                                ry: 3,
                            });

                            remaining = remaining.slice(cleaned.length);
                            if (!remaining.length) break;
                        }
                    }
                }
            }
        } else {

            for (const [, items] of linesMap.entries()) {
                const cleanedSelected = cleanSocialLinks(selectedText.replace(/\s+/g, "").toLowerCase());

                // Build cleaned versions of each item's text
                const cleanedItems = items.map(i => ({
                    original: i,
                    text: cleanSocialLinks(i.str.replace(/\s+/g, "").toLowerCase())
                }));

                // Flatten line into a single string for matching
                const fullLineText = cleanedItems.map(i => i.text).join("");

                const matchIndex = fullLineText.indexOf(cleanedSelected);

                if (matchIndex !== -1) {
                    // Now find the exact sequence of items contributing to the match
                    let startIndex = 0;
                    let runningText = "";

                    for (let i = 0; i < cleanedItems.length; i++) {
                        runningText += cleanedItems[i].text;

                        if (runningText.length >= matchIndex + cleanedSelected.length) {
                            startIndex = i;
                            break;
                        }
                    }

                    // Now step backward to get starting item index
                    const endIndex = startIndex;
                    let reversedText = "";
                    for (let i = startIndex; i >= 0; i--) {
                        reversedText = cleanedItems[i].text + reversedText;
                        if (reversedText === cleanedSelected) {
                            for (let j = i; j <= endIndex; j++) {
                                const item = cleanedItems[j].original;
                                pdfLibPage.drawRectangle({
                                    x: item.transform[4],
                                    y: Math.round(item.transform[5]) - 2,
                                    width: item.width,
                                    height: item.height * 1.2,
                                    color: rgb(0, 0, 0),
                                    opacity: 1,
                                    borderWidth: 1,
                                    rx: 3,
                                    ry: 3,
                                });
                            }
                            break;
                        }
                    }
                }
            }

        }
    }
    const pdfBytes = await pdfDoc.save();
    return pdfBytes
}