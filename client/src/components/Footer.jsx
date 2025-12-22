export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        {/* LEFT */}
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">
            UTH-ConfMS
          </span>{" "}
          – University of Transport Ho Chi Minh City
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <span className="hover:text-[#0e7c7b] cursor-pointer transition">
            Privacy Policy
          </span>
          <span className="hover:text-[#0e7c7b] cursor-pointer transition">
            Terms
          </span>
          <span className="hover:text-[#0e7c7b] cursor-pointer transition">
            Support
          </span>
        </div>
      </div>
    </footer>
  );
}
