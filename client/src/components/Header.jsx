import React from "react";

export default function Header () {
    return (
        <header className="bg-white px-5 py-2.5 border-b border-gray-300 h-20 flex items-center">
            <img
                src="https://portal.ut.edu.vn/images/logo_full.png"
                alt="UTH Logo"
                className="h-full max-w-[300px] object-contain"
            />
        </header>
    )
}