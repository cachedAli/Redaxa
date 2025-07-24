import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing();

export const ourFileRouter = {
    redactedImageUploader: f({
        image: {
            maxFileSize: "8MB",
            maxFileCount: 1
        }
    }).onUploadComplete(async () => {
        console.log("Upload complete");
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter