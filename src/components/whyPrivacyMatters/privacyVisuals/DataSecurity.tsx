import React from "react";

export default function DataSecurity() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 flex-shrink-0 group-hover:from-blue-100 group-hover:to-blue-150 transition-all duration-300 w-full max-w-[300px] aspect-[4/3] flex items-center justify-center relative overflow-hidden">
      <div className="relative scale-[1.8] sm:scale-[2] origin-center">
        {/* Folder/File Base */}
        <div className="w-16 h-14 bg-white rounded-lg shadow-lg border border-gray-200 relative">
          {/* File Tab */}
          <div className="absolute -top-2 left-2 w-6 h-4 bg-blue-100 rounded-t-lg border-l border-r border-t border-gray-200"></div>

          {/* Binary Code/Encryption Symbols */}
          <div className="absolute top-2 left-2 text-xs text-blue-400 font-mono">
            01
          </div>
          <div className="absolute top-4 left-2 text-xs text-blue-400 font-mono">
            10
          </div>
          <div className="absolute top-6 left-2 text-xs text-blue-400 font-mono">
            11
          </div>

          {/* Lock Symbol */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Shield with Bounce Animation */}
        <div className="absolute -top-1.5 -right-1.5 w-10 h-10 z-10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-500 animate-[spin_4s_linear_infinite]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrow"
                markerWidth="4"
                markerHeight="4"
                refX="0"
                refY="2"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,4 L4,2 Z" fill="currentColor" />
              </marker>
            </defs>

            <path
              d="M4 12a8 8 0 1 1 8 8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrow)"
            />
          </svg>
        </div>

        {/* Secure Network Lines/Firewall Arc */}
        <div className="absolute -inset-2">
          <div className="w-full h-full border-2 border-blue-300 rounded-lg opacity-40 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
        </div>

        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-blue-200 rounded-lg opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}
