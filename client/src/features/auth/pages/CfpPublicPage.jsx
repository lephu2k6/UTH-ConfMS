import { useEffect, useState } from "react";
import { Calendar, BookOpen, Layers, ArrowRight, Clock, CheckCircle, Users, FileText, Award, Globe, Sparkles } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function CfpPublicPage() {
  const [deadlines, setDeadlines] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(0);

  useEffect(() => {
    // Mock data cho demo
    setDeadlines({
      submission: "March 15, 2025",
      review: "April 30, 2025",
      cameraReady: "May 20, 2025",
      conference: "July 10-12, 2025"
    });
    
    setTracks([
      {
        name: "Artificial Intelligence",
        description: "Advances in deep learning, natural language processing, computer vision, and AI applications in various domains.",
        icon: "🤖",
        topics: ["Machine Learning", "Neural Networks", "NLP", "Computer Vision"]
      },
      {
        name: "Cybersecurity",
        description: "Security protocols, threat detection, cryptography, network security, and data protection technologies.",
        icon: "🔒",
        topics: ["Network Security", "Cryptography", "Ethical Hacking", "Cyber Defense"]
      },
      {
        name: "Cloud & Edge Computing",
        description: "Distributed systems, cloud infrastructure, edge computing, virtualization, and containerization.",
        icon: "☁️",
        topics: ["Cloud Architecture", "Kubernetes", "Serverless", "Edge AI"]
      },
      {
        name: "Data Science & Analytics",
        description: "Big data analytics, data mining, visualization, predictive modeling, and business intelligence.",
        icon: "📊",
        topics: ["Big Data", "Data Mining", "Visualization", "Predictive Analytics"]
      },
      {
        name: "IoT & Smart Systems",
        description: "Smart devices, sensor networks, embedded systems, and connected intelligent systems.",
        icon: "📱",
        topics: ["IoT Protocols", "Smart Cities", "Wearables", "Sensor Networks"]
      },
      {
        name: "Software Engineering",
        description: "Agile methodologies, DevOps, software architecture, testing, and quality assurance.",
        icon: "💻",
        topics: ["DevOps", "Microservices", "Testing", "Code Quality"]
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50/30 to-white">
      <Header />

      {/* Hero Section với gradient cyan đậm */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-900 via-teal-800 to-emerald-900">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-900/50 to-transparent" />
        </div>

        {/* Animated dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span className="text-sm font-medium text-white/90">Call for Papers 2025</span>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                  <span className="text-white">International </span>
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    Tech
                  </span>
                  <span className="text-white"> Conference</span>
                </h1>
                
                <p className="text-xl text-cyan-100 mb-12 leading-relaxed">
                  Join the premier gathering of IT researchers, engineers, and innovators. 
                  Present your groundbreaking work and connect with global experts in the field of information technology.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/login"
                    className="group relative px-8 py-4 bg-white text-cyan-900 rounded-xl font-bold shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    Submit Your Paper
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a
                    href="#dates"
                    className="px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:-translate-y-1"
                  >
                    View Important Dates
                  </a>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-6 border border-cyan-400/20">
                        <Users className="w-8 h-8 text-cyan-300 mb-3" />
                        <div className="text-3xl font-bold text-white">500+</div>
                        <div className="text-sm text-cyan-200">Expected Participants</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-6 border border-emerald-400/20">
                        <Award className="w-8 h-8 text-emerald-300 mb-3" />
                        <div className="text-3xl font-bold text-white">80%</div>
                        <div className="text-sm text-emerald-200">Acceptance Rate</div>
                      </div>
                      <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-xl p-6 border border-teal-400/20">
                        <Globe className="w-8 h-8 text-teal-300 mb-3" />
                        <div className="text-3xl font-bold text-white">40+</div>
                        <div className="text-sm text-teal-200">Countries</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl p-6 border border-cyan-400/20">
                        <FileText className="w-8 h-8 text-cyan-300 mb-3" />
                        <div className="text-3xl font-bold text-white">150+</div>
                        <div className="text-sm text-cyan-200">Paper Submissions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section id="dates" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 mb-4">
              <Calendar className="w-5 h-5" />
              <span className="font-bold">Important Dates</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conference Timeline</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All deadlines are at 23:59 Anywhere on Earth (AoE). Late submissions will not be considered.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-200 via-cyan-400 to-emerald-400 hidden md:block" />
            
            <div className="space-y-12">
              {deadlines && [
                { title: "Full Paper Submission", date: deadlines.submission, status: "active", position: "left" },
                { title: "Notification of Acceptance", date: deadlines.review, status: "upcoming", position: "right" },
                { title: "Camera Ready Submission", date: deadlines.cameraReady, status: "upcoming", position: "left" },
                { title: "Conference Dates", date: deadlines.conference, status: "upcoming", position: "right" }
              ].map((item, index) => (
                <div key={index} className={`relative ${item.position === 'left' ? 'md:pr-1/2 md:pl-0 pl-12' : 'md:pl-1/2 md:pr-0 pr-12'}`}>
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-cyan-500 rounded-full z-10" />
                  <div className={`bg-white rounded-2xl shadow-lg border border-cyan-100 hover:shadow-xl hover:border-cyan-200 transition-all p-8 ${item.position === 'left' ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-4 py-1 rounded-full text-sm font-bold ${
                        item.status === 'active' 
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' 
                          : 'bg-cyan-50 text-cyan-700'
                      }`}>
                        {item.status === 'active' ? '⚡ OPEN NOW' : '📅 UPCOMING'}
                      </div>
                      <Clock className={`w-5 h-5 ${item.status === 'active' ? 'text-cyan-500' : 'text-gray-400'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                      {item.date}
                    </div>
                    {item.status === 'active' && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a 
                          href="/login" 
                          className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700"
                        >
                          Submit Now
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conference Tracks */}
      <section className="py-20 bg-gradient-to-b from-white to-cyan-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 mb-4">
              <Layers className="w-5 h-5" />
              <span className="font-bold">Research Tracks</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Conference Topics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Submit your research to one of our specialized tracks covering the latest advancements in IT.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tracks.map((track, index) => (
              <div
                key={index}
                onClick={() => setActiveTrack(index)}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeTrack === index 
                    ? 'transform -translate-y-2 shadow-2xl' 
                    : 'hover:-translate-y-1'
                }`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                  activeTrack === index 
                    ? 'from-cyan-500 to-emerald-500' 
                    : 'from-cyan-100 to-emerald-100'
                } opacity-50`} />
                <div className="relative bg-white rounded-2xl p-8 border border-cyan-200 group-hover:border-cyan-300 overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                      activeTrack === index 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-br from-cyan-50 to-emerald-50'
                    }`}>
                      {track.icon}
                    </div>
                    {activeTrack === index && (
                      <div className="animate-bounce">
                        <ArrowRight className="w-6 h-6 text-cyan-600" />
                      </div>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    activeTrack === index ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {track.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    activeTrack === index ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {track.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {track.topics.map((topic, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activeTrack === index
                            ? 'bg-white/30 text-white'
                            : 'bg-cyan-50 text-cyan-700'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Track Details */}
          {tracks[activeTrack] && (
            <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-2xl p-8 border border-cyan-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-3xl">
                  {tracks[activeTrack].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{tracks[activeTrack].name}</h3>
                  <p className="text-cyan-700">Track Chair: Prof. John Smith</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Track Description</h4>
                  <p className="text-gray-700">{tracks[activeTrack].description}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Submission Requirements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500" />
                      <span className="text-gray-700">Maximum 12 pages (including references)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500" />
                      <span className="text-gray-700">Springer LNCS format</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500" />
                      <span className="text-gray-700">Double-blind review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-500" />
                      <span className="text-gray-700">Original, unpublished work</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000')] opacity-10 mix-blend-overlay" />
            <div className="relative p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Present Your Research?
                </h2>
                <p className="text-xl text-cyan-100 mb-10">
                  Join leading researchers from around the world. Submit your paper before the deadline.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/login"
                    className="group relative px-8 py-4 bg-white text-cyan-900 rounded-xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    Submit Paper Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a
                    href="#dates"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    View Important Dates
                  </a>
                </div>
                <p className="text-cyan-200 mt-8 text-sm">
                  ⏰ Deadline: March 15, 2025 • 23:59 AoE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}