export default function IdentityProtection() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 flex-shrink-0 group-hover:from-indigo-100 group-hover:to-indigo-150 transition-all duration-300 w-full max-w-[300px] aspect-[4/3] flex items-center justify-center relative overflow-hidden">
      {/* SCALE-WRAPPER */}
      <div className="absolute scale-[1.8] sm:scale-[2] origin-center">
        {/* Document Base */}
        <div className="w-16 h-20 bg-white rounded-lg shadow-lg border border-gray-200 relative">
          {/* Profile Icon */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-indigo-200 rounded-full"></div>

          {/* Text Lines */}
          <div className="absolute top-8 left-3 w-8 h-0.5 bg-gray-300 rounded"></div>
          <div className="absolute top-10 left-3 w-6 h-0.5 bg-gray-300 rounded"></div>

          {/* Redacted Info */}
          <div className="absolute top-12 left-3 w-8 h-1 bg-gray-900 rounded animate-pulse"></div>
          <div className="absolute top-14 left-3 w-6 h-1 bg-gray-900 rounded animate-pulse delay-200"></div>

          {/* More text */}
          <div className="absolute top-16 left-3 w-7 h-0.5 bg-gray-300 rounded"></div>
        </div>

        {/* Shield Glow */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <div className="w-4 h-4 border-2 border-white rounded-sm bg-transparent"></div>
          <div className="absolute inset-0 bg-indigo-400 rounded-full opacity-30 animate-ping"></div>
        </div>

        {/* Eye with Slash */}
        <div className="absolute -bottom-1 -left-1 w-6 h-4 bg-indigo-400 rounded-full flex items-center justify-center opacity-80">
          <div className="w-2 h-1 bg-white rounded-full"></div>
          <div className="absolute w-4 h-0.5 bg-white rotate-45"></div>
        </div>
      </div>
    </div>
  );
}
