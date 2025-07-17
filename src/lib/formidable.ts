import { IncomingMessage } from "http";
import formidable from "formidable";

export function parseForm(req: IncomingMessage): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    const form = formidable({
        maxFileSize: 5 * 1024 * 1024,
        multiples: false,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
}
