export default function TopBar() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50">
      <span className="text-lg">⚗️</span>
      <span className="text-sm font-medium text-gray-800">Trial Command AI</span>
      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
        LIVE
      </span>
      <span className="ml-auto text-xs text-gray-400">
        NEXGEN-201 · Phase III
      </span>
    </div>
  );
}