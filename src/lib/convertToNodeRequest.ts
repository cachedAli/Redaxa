import { NextRequest } from "next/server";
import { Readable } from "stream";



export const toNodeRequest = (req: NextRequest) => {
    const body = req.body;
    if (!body) throw new Error("No body found in request");

    const readableNodeStream = Readable.fromWeb(body as any)
    return Object.assign(readableNodeStream, {
        headers: Object.fromEntries(req.headers.entries()),
        method: req.method,
        url: ""
    })
}