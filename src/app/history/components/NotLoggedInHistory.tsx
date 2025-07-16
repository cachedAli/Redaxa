import React from "react";

import { History } from "lucide-react";

import AuthButtons from "@/components/ui/auth/AuthButtons";
import SectionHeader from "@/components/ui/SectionHeader";
import IconBox from "@/components/ui/IconBox";

export default function NotLoggedInHistory() {
  return (
    <div className="flex py-32 flex-col w-full items-center justify-center gap-8 bg-gradient-main">
      <IconBox icon={History} />

      <SectionHeader
        title="Access Your Redaction History"
        description="Sign in with Google to manage, re-download, and organize your previously
        redacted resumes in one place."
        animation={false}
      />
      <AuthButtons isHistory />
    </div>
  );
}
