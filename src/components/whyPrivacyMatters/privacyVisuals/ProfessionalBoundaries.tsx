import React from "react";

export default function ProfessionalBoundaries() {
  return (
    <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-6 flex-shrink-0 group-hover:from-violet-100 group-hover:to-violet-150 transition-all duration-300 w-full max-w-[300px] aspect-[4/3] flex items-center justify-center relative overflow-hidden">
      <div className="absolute scale-[1.8] sm:scale-[2] origin-center">
        {/* Document Base */}
        <div className="relative w-16 h-20 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Profile Circle */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-violet-300 rounded-full"></div>

          {/* Text Lines (shown) */}
          <div className="absolute top-8 left-3 w-8 h-0.5 bg-gray-300 rounded"></div>
          <div className="absolute top-10 left-3 w-6 h-0.5 bg-gray-300 rounded"></div>

          {/* Hidden Text (covered by mask) */}
          <div className="absolute top-12 left-3 w-8 h-1 bg-gray-400 rounded opacity-50"></div>
          <div className="absolute top-14 left-3 w-6 h-1 bg-gray-400 rounded opacity-50"></div>

          {/* Reveal Mask - animated sliding */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-200 to-violet-100 animate-slide-mask pointer-events-none" />
        </div>

        {/* Unique Toggle Switch Icon (replaces eye) */}
        <div className="absolute -bottom-2 right-0 w-6 h-3 bg-violet-500 rounded-full flex items-center px-0.5 shadow-md">
          <div className="w-2 h-2 bg-white rounded-full animate-slide-toggle" />
        </div>
      </div>
    </div>
  );
}
