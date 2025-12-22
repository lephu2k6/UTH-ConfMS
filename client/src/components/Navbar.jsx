export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-700">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Xin chào 👋
        </span>
        <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center">
          U
        </div>
      </div>
    </header>
  );
}
