import React from 'react'

import { FileText } from 'lucide-react'

import { Upload } from '@/components/heroSection/Upload'
import SectionHeader from '@/components/ui/SectionHeader'
import IconBox from '@/components/ui/IconBox'

export default function LoggedInHistory() {
  return (
    <div className="flex py-32 flex-col w-full items-center justify-center gap-8 bg-gradient-main">
      <IconBox icon={FileText} />

      <SectionHeader
        title="No Redacted Resumes Yet!"
        description="It looks like your history is empty. Start redacting your resumes to see them appear here."
        animation={false}
      />

      <Upload animateOnView={false} history/>
    </div>
  )
}
