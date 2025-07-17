import { NextRequest, NextResponse } from "next/server"
import { toNodeRequest } from "@/lib/convertToNodeRequest";
import { parseForm } from "@/lib/formidable"


export const config = {
    api: {
        bodyParser: false
    }
}

export const POST = async (req: NextRequest) => {
    const nodeReq = toNodeRequest(req)

    try {
        const { files } = await parseForm(nodeReq as any);
        return NextResponse.json({ files })

    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }

}