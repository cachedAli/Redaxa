-- CreateTable
CREATE TABLE "history_records" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "resume_url" TEXT NOT NULL,
    "redacted_resume_url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history_records" ADD CONSTRAINT "history_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
