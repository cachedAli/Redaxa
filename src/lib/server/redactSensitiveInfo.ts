
import { PDFDocument, rgb } from "@cantoo/pdf-lib";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs/promises"
import { cleanSocialLinks } from "./utils";


const loadWorker = async () => {
    //   @ts-ignore
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

        const textContent = page.getTextContent();


        (await textContent).items.forEach((item: any) => {
            const text = cleanSocialLinks(item.str.replace(/\s+/g, "").toLowerCase());
            const x = item.transform[4];
            const y = Math.round(item.transform[5]);
            const width = item.width;
            const height = item.height;

            

            if (!selectedText) {

                if (sensitiveWords.has(text)) {

                    // Using Pdf-lib to draw rectangle on text
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
                    })
                }
            } else {
                const cleanedSelected = cleanSocialLinks(selectedText.replace(/\s+/g, "").toLowerCase());
                
                if (cleanedSelected === text) {
                    console.log(`Drawing box at (${x}, ${y}) size: ${width}x${height} for text: "${item.str}"`);

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
                    })
                }
            }
        })
    }
    const pdfBytes = await pdfDoc.save();
    return pdfBytes
}