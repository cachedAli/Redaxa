import { deleteOldFiles } from "@/lib/server/utils";
import { NextResponse } from "next/server";

export const config = {
  schedule: "0 */2 * * *" 
};


export async function GET() {
    try {
        await deleteOldFiles();
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: err });
    }
}
