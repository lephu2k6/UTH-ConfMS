import { useEffect, useState } from "react";
import { Calendar, BookOpen, Layers } from "lucide-react";

export default function CfpPublicPage() {
  /* ================= STATE ================= */
  const [deadlines, setDeadlines] = useState(null);
  const [tracks, setTracks] = useState([]);

  /* ================= FETCH DATA (FE-2) ================= */
  useEffect(() => {
    // ⚠️ FE-2 chưa có API → để trống
    // Sau này chỉ cần mở lại đoạn này

    /*
    api.get("/public/cfp").then(res => {
      setDeadlines(res.data.deadlines);
      setTracks(res.data.tracks || []);
    });
    */

    setDeadlines(null);
    setTracks([]);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gray-50">

      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <img
            src="https://portal.ut.edu.vn/images/logo_full.png"
            alt="UTH Logo"
            className="h-14 object-contain"
          />
        </div>
      </header>

      {/* ================= HERO ================= */}
    <section
  className="relative w-full py-28 px-6 text-white bg-cover bg-center"
  style={{
    backgroundImage: "url('https://portal.ut.edu.vn/images/1.jpg')",
  }}
>

  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <span className="inline-block mb-6 px-6 py-2 bg-white/20 rounded-full text-sm font-semibold">
      🎓 Call for Papers 2025
    </span>

    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
      UTH Conference on <br /> Information Technology
    </h1>

    <p className="max-w-3xl mx-auto text-xl opacity-95 mb-10">
      An international conference for researchers, engineers and students
      to present innovative research in information technology.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="/login"
        className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition"
      >
        📄 Submit Paper
      </a>
      <a
        href="/register"
        className="bg-white/10 border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 hover:-translate-y-1 transition"
      >
        ✨ Register Now
      </a>
    </div>
  </div>
</section>


      {/* ================= IMPORTANT DATES ================= */}
      {deadlines && (
        <section className="w-full py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex justify-center gap-3">
              <Calendar className="text-teal-600" size={32} />
              Important Dates
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <DateCard title="Submission Deadline" date={deadlines.submission} icon="📝" />
              <DateCard title="Review Notification" date={deadlines.review} icon="🔍" />
              <DateCard title="Camera-ready" date={deadlines.cameraReady} icon="✅" />
            </div>
          </div>
        </section>
      )}

      {/* ================= TRACKS ================= */}
      {tracks.length > 0 && (
        <section className="w-full py-20 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex justify-center gap-3">
              <Layers className="text-teal-600" size={32} />
              Conference Tracks
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {tracks.map((track, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition"
                >
                  <h3 className="font-bold text-xl mb-3 text-gray-800">
                    {track.name}
                  </h3>
                  <p className="text-gray-600">
                    {track.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CFP ================= */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
            <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-teal-500">
              <BookOpen className="text-white" size={24} />
            </span>
            Call for Papers
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            Authors are invited to submit{" "}
            <strong className="text-teal-600">
              original and unpublished research papers
            </strong>. All submissions will be peer-reviewed.
          </p>

          <div className="border-l-4 border-teal-500 bg-teal-50 p-5 rounded-r-lg">
            📚 Accepted papers will be published in conference proceedings.
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-sm text-gray-500 py-6 bg-white">
        © 2025 UTH-ConfMS – University of Transport Ho Chi Minh City
      </footer>
    </div>
  );
}

/* ================= DATE CARD ================= */
function DateCard({ title, date, icon }) {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-semibold text-lg">{title}</p>
      <p className="text-2xl font-bold mt-1">{date}</p>
    </div>
  );
}
