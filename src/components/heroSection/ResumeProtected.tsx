import React from "react";
import clsx from "clsx";

export default function ResumeProtected() {
  return (
    <div
      className={clsx(
        "relative mt-10 flex items-center justify-center p-4 sm:p-6 md:p-8 h-[500px]",
        "max-lg:mt-0"
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-6 w-20 h-20 bg-gradient-to-tr from-blue-300/20 to-indigo-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-6 w-24 h-24 bg-gradient-to-tr from-indigo-300/20 to-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-200/40 rounded-full blur-lg"></div>
      </div>

      {/* Resume Document */}
      <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-xl shadow-2xl shadow-blue-100/50 p-4 sm:p-6 w-[360px] max-[400px]:w-[300px] sm:w-[400px] max-h-full">
        {/* Document Header */}
        <div className="mb-4">
          <div className="h-6 bg-blue-900 rounded mb-2 w-3/4 shadow-md"></div>
          <div className="space-y-1">
            <div className="h-3 bg-blue-900 rounded w-1/2 shadow-sm"></div>
            <div className="h-3 bg-blue-900 rounded w-2/3 shadow-sm"></div>
            <div className="h-3 bg-blue-900 rounded w-1/3 shadow-sm"></div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2 border-b border-blue-200 pb-1">
            Professional Summary
          </h3>
          <div className="space-y-1">
            <div className="h-2.5 bg-violet-300 rounded w-full"></div>
            <div className="h-2.5 bg-violet-300 rounded w-4/5"></div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2 border-b border-blue-200 pb-1">
            Work Experience
          </h3>

          {/* Job 1 */}
          <div className="mb-2">
            <div className="flex justify-between items-start mb-1">
              <div className="h-3 bg-blue-900 rounded w-2/3 shadow-sm"></div>
              <div className="h-2 bg-blue-900 rounded w-1/4 shadow-sm"></div>
            </div>
            <div className="h-2 bg-blue-900 rounded w-1/2 mb-1 shadow-sm"></div>
            <div className="space-y-0.5 ml-4">
              <div className="flex items-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mr-1.5"></div>
                <div className="h-2 bg-violet-300 rounded flex-1"></div>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mr-1.5"></div>
                <div className="h-2 bg-violet-300 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2 border-b border-blue-200 pb-1">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="h-2 bg-violet-300 rounded w-4/5"></div>
              <div className="h-2 bg-violet-300 rounded w-2/3"></div>
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-violet-300 rounded w-3/4"></div>
              <div className="h-2 bg-violet-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase mb-2 border-b border-blue-200 pb-1">
            Education
          </h3>
          <div className="flex justify-between items-start mb-1">
            <div className="h-3 bg-blue-900 rounded w-2/3 shadow-sm"></div>
            <div className="h-2 bg-blue-900 rounded w-1/5 shadow-sm"></div>
          </div>
          <div className="h-2 bg-blue-900 rounded w-1/3 shadow-sm"></div>
        </div>

        {/* Privacy Badge */}
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium shadow">
          Privacy Protected
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-[15%] right-[15%] w-4 h-4 bg-gradient-to-tr from-blue-400/30 to-indigo-300/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[10%] w-3 h-3 bg-gradient-to-tr from-indigo-400/40 to-blue-300/40 rounded-full animate-pulse delay-1000"></div>
    </div>
  );
}
