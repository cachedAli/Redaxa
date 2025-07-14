import clsx from "clsx";

import { FilePlus2 } from "lucide-react";
import { Button } from "../ui/button";

export const Upload = () => {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 w-60",
        "max-lg:w-full max-lg:items-center"
      )}
    >
      <Button size="lg" className="h-12 w-60 rounded-xl shadow-lg">
        <FilePlus2 size={20} /> Upload Your Resume
      </Button>

      <p className="text-center text-gray-100">or drag and drop your resume</p>
    </div>
  );
};
