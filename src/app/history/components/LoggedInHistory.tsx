import React from "react";

import { FileText } from "lucide-react";

import { Upload } from "@/components/ui/Upload";
import SectionHeader from "@/components/ui/SectionHeader";
import IconBox from "@/components/ui/IconBox";
import { prisma } from "@/lib/server/prisma";
import { Session } from "next-auth";
import HistoryLayout from "./HistoryLayout";
import { HistoryRecords } from "@/types/historyTypes";

export default async function LoggedInHistory({
  session,
}: {
  session: Session;
}) {
  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      historyRecords: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  let resumeHistory:HistoryRecords = [];

  resumeHistory = user?.historyRecords || [];
  
  return (
    <main className="flex py-32 px-12 flex-col w-full items-center justify-center gap-8 bg-gradient-main">
      {resumeHistory && resumeHistory.length > 0 ? (
        <HistoryLayout resumeHistory={resumeHistory} />
      ) : (
        <NoHistoryLayout />
      )}
    </main>
  );
}

const NoHistoryLayout = () => {
  return (
    <>
      <IconBox icon={FileText} />

      <SectionHeader
        title="No Redacted Resumes Yet!"
        description="It looks like your history is empty. Start redacting your resumes to see them appear here."
        animation={false}
      />

      <Upload animateOnView={false} history />
    </>
  );
};
