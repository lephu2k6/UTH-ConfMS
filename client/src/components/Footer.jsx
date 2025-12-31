import { BookOpen, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 via-cyan-400/30 to-emerald-400/40" />

      {/* Overlay tối để nổi chữ */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">UTH-ConfMS 2025</h3>
                <p className="text-sm text-white/80">
                  International IT Conference
                </p>
              </div>
            </div>

            <p className="text-sm text-white/85 leading-relaxed max-w-sm">
              A professional conference management system supporting academic
              submissions, reviews, and research collaboration.
            </p>

            <a
              href="https://uth.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-white/80 hover:text-white transition"
            >
              <Globe className="w-4 h-4" />
              uth.edu.vn
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4 text-white/90">
              Conference
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              {[
                "Call for Papers",
                "Submission",
                "Important Dates",
                "Program",
                "Registration",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4 text-white/90">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-300 mt-0.5" />
                <span>
                  University of Transport HCMC <br />
                  District 9, Ho Chi Minh City
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-300" />
                <a
                  href="mailto:conference@uth.edu.vn"
                  className="hover:text-white"
                >
                  conference@uth.edu.vn
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-300" />
                <a href="tel:+842812345678" className="hover:text-white">
                  +84 28 1234 5678
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/65 gap-3">
          <span>© {year} UTH International Tech Conference</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Code of Conduct</a>
          </div>
        </div>
      </div>

      {/* Accent */}
      <div className="h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400" />
    </footer>
  );
}
