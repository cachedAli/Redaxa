export type HistoryRecord = {
  id: string;
  userId: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
  resumeUrl: string;
  redactedResumeUrl: string;
};

export type HistoryRecords = HistoryRecord[] | undefined;
