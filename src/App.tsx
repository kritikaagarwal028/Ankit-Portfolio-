/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sun, 
  Moon, 
  Play, 
  X, 
  Video, 
  Briefcase, 
  Mail, 
  Linkedin,
  ChevronRight,
  Menu
} from "lucide-react";
import { ANKIT_DATA } from "./constants";

// Import local images so Vite bundles them in production
import cinematicAvStudio from "./assets/images/cinematic_av_studio_1778996449209.png";
import ankitSharedPortrait from "./assets/images/ankit_shared_portrait.jpeg";

// --- Theme Context / State ---
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
};

// --- Components ---

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center rounded-sm">
            <span className="text-white dark:text-black font-bold text-xl">AK</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold hidden sm:block">ANKIT KESHARI</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest font-bold opacity-60">
            <a href="#about" className="hover:opacity-100 transition-opacity">Expertise</a>
            <a href="#work" className="hover:opacity-100 transition-opacity">Case Studies</a>
            <a href="#process" className="hover:opacity-100 transition-opacity">Process</a>
            <a href="#skills" className="hover:opacity-100 transition-opacity">Technical</a>
            <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
          
          <motion.button 
            id="theme-toggle"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 md:hidden transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4 text-[10px] uppercase tracking-widest font-bold opacity-80">
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:opacity-100 py-2.5 border-b border-gray-100 dark:border-gray-900">Expertise</a>
              <a href="#work" onClick={() => setIsOpen(false)} className="hover:opacity-100 py-2.5 border-b border-gray-100 dark:border-gray-900">Case Studies</a>
              <a href="#process" onClick={() => setIsOpen(false)} className="hover:opacity-100 py-2.5 border-b border-gray-100 dark:border-gray-900">Process</a>
              <a href="#skills" onClick={() => setIsOpen(false)} className="hover:opacity-100 py-2.5 border-b border-gray-100 dark:border-gray-900">Technical</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:opacity-100 py-2.5">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const VideoModal = ({ video, onClose }: { video: any; onClose: () => void }) => {
  const isYoutube = video.videoUrl?.includes("youtube.com") || video.videoUrl?.includes("youtu.be");
  
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1].split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:scale-110 transition-transform p-2 bg-white/10 rounded-full"
      >
        <X size={24} />
      </button>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl"
      >
        {isYoutube ? (
          <iframe 
            src={getYoutubeEmbedUrl(video.videoUrl)} 
            className="w-full h-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        ) : (
          <video 
            src={video.videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          />
        )}
      </motion.div>
      
      <div className="absolute bottom-8 left-8 text-white">
        <h3 className="text-2xl font-bold font-serif italic mb-2">{video.title}</h3>
        <p className="text-white/60 text-sm uppercase tracking-widest">{video.category}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { theme, toggle } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar theme={theme} toggleTheme={toggle} />
      
      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:h-screen flex flex-col justify-center px-6 overflow-hidden pt-28 pb-12 md:py-0">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2 }}
            src={cinematicAvStudio} 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black" />
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-gray-500 rounded-full blur-[120px] mix-blend-screen opacity-20" />
          <div className="absolute -bottom-1/4 -left-20 w-[600px] h-[600px] bg-zinc-800 rounded-full blur-[120px] mix-blend-screen opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-current opacity-30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Professional Portfolio</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] font-bold leading-[0.9] md:leading-[0.85] tracking-tighter mb-8 max-w-4xl">
              BROADCAST <br />
              <span className="font-serif italic font-light opacity-80">MEDIA</span> & VIDEO <br />
              <span className="text-outline-dark dark:text-outline-light text-transparent uppercase">Production</span>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
              <div className="space-y-4 md:space-y-6">
                <p className="text-xl md:text-2xl font-bold tracking-tight opacity-90">
                  {ANKIT_DATA.experienceTagline}
                </p>
                <p className="text-base md:text-lg font-light leading-relaxed max-w-lg opacity-60">
                  {ANKIT_DATA.credibility}
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {ANKIT_DATA.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="px-3.5 py-1.5 md:px-4 md:py-2 border border-current/20 rounded-sm text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-current/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute bottom-12 right-12 hidden lg:block"
        >
          <div className="flex items-center gap-4 rotate-90 origin-right translate-x-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll to explore</span>
            <span className="w-16 h-[1px] bg-current" />
          </div>
        </motion.div>
      </section>

      {/* Showreel Section */}
      <section className="px-6 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div 
            className="relative group cursor-pointer overflow-hidden rounded-sm aspect-video bg-zinc-900 border border-current/10 shadow-2xl"
            onClick={() => setSelectedVideo({ title: "2026 Showreel", videoUrl: "https://youtu.be/wosWXTt0Egs", category: "Reel" })}
          >
            <img 
              src="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=2000" 
              alt="Showreel Cover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center shadow-2xl relative z-10"
              >
                <Play fill="black" size={24} className="sm:w-8 sm:h-8 ml-1" />
              </motion.div>
              <div className="mt-6 sm:mt-8 text-center relative z-10">
                <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.5em] mb-2 block text-white/80">Play Showreel</span>
                <h3 className="text-xl sm:text-4xl md:text-6xl font-black font-serif italic text-white line-clamp-2">ANKIT KESHARI / 2026</h3>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex gap-2 sm:gap-4 text-[6px] sm:text-[8px] font-bold uppercase tracking-widest text-white/40">
              <span>HD 4K</span>
              <span>•</span>
              <span>CINEMATIC PACK</span>
              <span>•</span>
              <span>MASTER GRADE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section - What I Do */}
      <section id="about" className="py-16 md:py-32 px-6 border-b border-current/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {ANKIT_DATA.pillars.map((pillar, idx) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-6"
              >
                <div className="text-4xl font-serif italic text-current/20">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="text-xl font-bold tracking-tight uppercase leading-snug">{pillar.title}</h3>
                <p className="text-sm opacity-60 leading-relaxed font-light">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Software Proficiency Section - RESTORED */}
      <section className="py-16 md:py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Software Mastery</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">PRECISION <br /><span className="font-serif italic font-light opacity-60">TOOLS</span></h2>
              <p className="text-base md:text-lg opacity-60 max-w-md leading-relaxed mb-8">
                Expert-level proficiency in industry-standard broadcast and post-production software, ensuring seamless transitions from live switcher to final edit.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {ANKIT_DATA.skills.map(skill => (
                  <span key={skill} className="px-3.5 py-1.5 md:px-4 md:py-2 border border-current/10 text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-current/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid gap-6 p-6 sm:p-8 bg-white dark:bg-black border border-current/10 rounded-sm shadow-xl">
              {ANKIT_DATA.software.map((item: { name: string; level: number }) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                    <span className="text-[10px] font-mono opacity-50">{item.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-current/5 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-current" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Profile / Intro Section */}
      <section className="py-16 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="w-full md:w-5/12 aspect-[4/5] relative overflow-hidden rounded-sm grayscale group bg-zinc-100 dark:bg-zinc-900 border border-current/10">
            <img 
              src={ankitSharedPortrait} 
              alt="Ankit Keshari"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div className="flex-1 space-y-6 md:space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Professional Summary</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter">THE INTERSECTION OF <br /><span className="font-serif italic font-light">JOURNALISM</span> & PRODUCTION</h2>
            <p className="text-lg md:text-xl opacity-70 leading-relaxed font-light">
              {ANKIT_DATA.summary}
            </p>
            <div className="grid grid-cols-2 gap-6 md:gap-12 pt-8 border-t border-current/10">
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Core Philosophy</div>
                <div className="text-sm font-medium leading-relaxed">Authoritative storytelling through precision technology.</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Industry Presence</div>
                <div className="text-sm font-medium leading-relaxed">15+ Years of Leadership across National & Regional Networks.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-32 px-6 border-b border-current/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Expertise Areas</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {ANKIT_DATA.categories.map((cat) => (
              <div key={cat.title} className="p-6 sm:p-8 border border-current/10 hover:bg-current/2 transition-colors space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest border-b border-current/10 pb-4">{cat.title}</h4>
                <div className="space-y-2">
                  {"companies" in cat && <div className="text-sm font-bold opacity-80">{cat.companies}</div>}
                  {"roles" in cat && <div className="text-[10px] uppercase opacity-60 tracking-widest">{cat.roles}</div>}
                  {"projects" in cat && <div className="text-sm font-bold opacity-80">{cat.projects}</div>}
                  {"description" in cat && <div className="text-xs opacity-60 leading-relaxed">{cat.description}</div>}
                  {"organization" in cat && <div className="text-sm font-bold opacity-80">{cat.organization}</div>}
                  {"shows" in cat && <div className="text-sm font-bold opacity-80">{cat.shows}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="work" className="py-16 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Field Execution</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter">CASE <span className="font-serif italic font-light">STUDIES</span></h2>
          </div>

          <div className="space-y-16 md:space-y-32">
            {ANKIT_DATA.caseStudies.map((cs, idx) => (
              <motion.div 
                key={cs.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-12 gap-6 md:gap-12 items-start"
              >
                <div className="lg:col-span-5 space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30">Case Study 0{idx + 1}</div>
                    <h3 className="text-3xl sm:text-4xl font-serif italic text-balance">{cs.title}</h3>
                  </div>
                  
                  <div className="space-y-6 text-sm">
                    <div>
                      <div className="font-bold uppercase tracking-widest text-[10px] mb-2 opacity-100">The Challenge</div>
                      <p className="opacity-60 leading-relaxed">{cs.situation}</p>
                    </div>
                    <div>
                      <div className="font-bold uppercase tracking-widest text-[10px] mb-2 opacity-100">Role & Execution</div>
                      <p className="opacity-60 leading-relaxed font-bold mb-2">{cs.role}</p>
                      <p className="opacity-60 leading-relaxed">{cs.work}</p>
                    </div>
                    <div>
                      <div className="font-bold uppercase tracking-widest text-[10px] mb-2 opacity-100 text-green-600 dark:text-green-400">Impact & Outcome</div>
                      <p className="opacity-80 leading-relaxed italic">{cs.outcome}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-current/10 flex flex-wrap gap-2 md:gap-3">
                    {cs.tools.split(',').map(tool => (
                      <span key={tool} className="text-[8px] font-bold uppercase tracking-widest px-3 py-1 bg-current/5 border border-current/10">
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="lg:col-span-7 aspect-video bg-zinc-100 dark:bg-zinc-900 border border-current/10 flex items-center justify-center group cursor-pointer relative overflow-hidden" 
                  onClick={() => setSelectedVideo({ title: cs.title, videoUrl: cs.videoUrl, category: "Case Study" })}
                >
                  {cs.thumbnail ? (
                    <img 
                      src={cs.thumbnail} 
                      alt={cs.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <Video size={48} className="opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                       <Play size={24} fill="white" className="ml-1" />
                     </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process Section */}
      <section id="process" className="py-16 md:py-32 px-6 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900 -skew-x-12 translate-x-1/2 opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 md:mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Operational Pipeline</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight">PROFESSIONAL <br /><span className="font-serif italic font-light opacity-60">WORKFLOW</span></h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 animate-fadeIn">
            {ANKIT_DATA.productionProcess.map((step, i) => (
              <div key={step} className="flex-1 group">
                <div className="h-[1px] md:h-[2px] w-full bg-white/10 mb-4 md:mb-8 relative">
                   <div className="absolute top-[-4px] md:top-[-3px] left-0 w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform" />
                </div>
                <div className="space-y-2 md:space-y-4">
                  <div className="text-[10px] font-mono opacity-30">0{i + 1}</div>
                  <h4 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{step}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Mastery Section */}
      <section id="skills" className="py-16 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-8 md:space-y-12">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Systems & Tools</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">TECHNICAL <br /><span className="font-serif italic font-light">MASTERY</span></h2>
              </div>
              
              <div className="space-y-8 md:space-y-10">
                {Object.entries(ANKIT_DATA.technicalMastery).map(([category, tools]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] border-l-2 border-current pl-4 mb-4 md:mb-6">{category.replace(/([A-Z])/g, ' $1')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {tools.map(tool => (
                        <span key={tool} className="px-3.5 py-2 md:px-5 md:py-3 bg-zinc-50 dark:bg-zinc-900 border border-current/5 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-current/20 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 md:space-y-12 bg-zinc-100 dark:bg-white/5 p-6 sm:p-12 rounded-sm self-start">
               <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-4 block">Mentorship</span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif italic mb-4 md:mb-6">Media Education & Studio Leadership</h3>
                <p className="text-xs sm:text-sm opacity-60 leading-relaxed mb-6 md:mb-8">
                  Extensive background in teaching broadcast media and film production. Successfully establishing and managing university AV studios, guiding 1000+ student projects from concept to final projection.
                </p>
                
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Broadcast Media Instruction (Intro to Advanced)",
                    "Film Production & Documentary Projection",
                    "Student Media Lab Management",
                    "Academic Show Packaging for Government Portals"
                  ].map(item => (
                    <li key={item} className="flex gap-4 items-center">
                       <ChevronRight size={14} className="shrink-0" />
                       <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-8 md:pt-12 border-t border-current/10">
                 <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-6 md:mb-8 block">Organizations Worked With</div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 overflow-hidden">
                    {ANKIT_DATA.organizations.map(org => (
                      <div key={org.name} className="space-y-1">
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-tight">{org.name}</div>
                        <div className="text-[9px] md:text-[10px] opacity-40 uppercase tracking-widest">{org.type}</div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 px-6 border-t border-current/10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-[100px] font-bold tracking-tighter mb-8 md:mb-12 leading-none">
              CONTACT <br />
              <span className="font-serif italic font-light opacity-60">PROPOSAL</span>
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-lg md:max-w-none mx-auto">
              <a href={`mailto:${ANKIT_DATA.contact.email}`} className="group flex flex-col items-center w-full md:w-auto">
                <div className="w-16 h-16 md:w-20 md:w-20 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all mb-4">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">Direct Email</span>
                <span className="text-xs md:text-sm opacity-50 mt-1 break-all px-4">{ANKIT_DATA.contact.email}</span>
              </a>
              
              <a href={`https://${ANKIT_DATA.contact.linkedin}`} target="_blank" rel="noreferrer" className="group flex flex-col items-center w-full md:w-auto">
                <div className="w-16 h-16 md:w-20 md:w-20 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all mb-4">
                  <Linkedin size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">Professional Node</span>
                <span className="text-xs md:text-sm opacity-50 mt-1">LinkedIn Profile</span>
              </a>

              <a href={`https://${ANKIT_DATA.contact.youtube}`} target="_blank" rel="noreferrer" className="group flex flex-col items-center w-full md:w-auto">
                <div className="w-16 h-16 md:w-20 md:w-20 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all mb-4">
                  <Video size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">Documentary Link</span>
                <span className="text-xs md:text-sm opacity-50 mt-1">YouTube Portfolio</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-current/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
          <div>© 2026 ANKIT KESHARI — PORTFOLIO</div>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Credits</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        .text-outline-light {
          -webkit-text-stroke: 1px white;
        }
        .text-outline-dark {
          -webkit-text-stroke: 1px black;
        }
        @media (max-width: 768px) {
          .text-outline-light, .text-outline-dark {
            -webkit-text-stroke: 0.5px currentColor;
          }
        }
      `}</style>
    </div>
  );
}
