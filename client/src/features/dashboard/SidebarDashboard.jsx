import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const goTo = (id) => {
    if (location.pathname.startsWith("/dashboard")) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // update hash without causing a navigation
        history.replaceState(null, '', `#${id}`);
      } else {
        navigate(`/dashboard#${id}`);
      }
    } else {
      navigate(`/dashboard#${id}`);
    }
  };

  const isActive = (id) => location.hash === `#${id}`;

  return (
    <nav className="p-3">
      <ul className="space-y-2 text-sm">
        <li>
          <button onClick={() => goTo("overview")} className={`w-full text-left px-3 py-2 rounded ${isActive("overview") ? 'bg-white text-teal-700 font-semibold' : 'text-white/90 hover:bg-white/10'}`}>
            Tổng quan
          </button>
        </li>
        <li>
          <button onClick={() => goTo("submissions")} className={`w-full text-left px-3 py-2 rounded ${isActive("submissions") ? 'bg-white text-teal-700 font-semibold' : 'text-white/90 hover:bg-white/10'}`}>
            Bài nộp
          </button>
        </li>
      </ul>
    </nav>
  );
} 
