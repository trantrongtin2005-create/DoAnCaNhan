import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiCpu, FiUser } from "react-icons/fi";
import { SiReact, SiLaravel, SiPhp, SiMysql, SiJavascript, SiGit } from "react-icons/si";
import { playHoverSound } from "../utils/audioSynth";
import playerPhoto from "../assets/tin.jpg";

export default function PlayerCard() {
  // Dynamic holographic positioning variables
  const [holoStyle, setHoloStyle] = useState({
    "--holo-x": "50%",
    "--holo-y": "50%"
  });

  // Motion values for 3D card tilt effect on mouse hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map motion values to tilt rotation degrees
  const rotateX = useTransform(y, [-150, 150], [18, -18]);
  const rotateY = useTransform(x, [-150, 150], [-18, 18]);

  // Spring animations for a realistic physics-based kinetic inertia
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseEnter = () => {
    playHoverSound();
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center for tilt
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);

    // Calculate percentage coords for holographic foil shine sweep
    const pctX = ((e.clientX - rect.left) / width) * 100;
    const pctY = ((e.clientY - rect.top) / height) * 100;
    setHoloStyle({
      "--holo-x": `${pctX}%`,
      "--holo-y": `${pctY}%`
    });
  };

  const handleMouseLeave = () => {
    // Smooth reset tilt
    x.set(0);
    y.set(0);
    setHoloStyle({
      "--holo-x": "50%",
      "--holo-y": "50%"
    });
  };

  // Real world tech skills mapping
  const devSkills = [
    { label: "FE", val: 95, name: "Frontend" },
    { label: "BE", val: 90, name: "Backend" },
    { label: "DB", val: 88, name: "Database" },
    { label: "UI", val: 85, name: "UI/UX" },
    { label: "SOLV", val: 92, name: "Problem Solving" },
    { label: "TEAM", val: 95, name: "Teamwork" }
  ];

  // Tech stack items
  const techStack = [
    { name: "ReactJS", icon: SiReact, color: "text-[#00f5ff]" },
    { name: "Laravel", icon: SiLaravel, color: "text-[#ff2d20]" },
    { name: "PHP", icon: SiPhp, color: "text-[#777bb4]" },
    { name: "MySQL", icon: SiMysql, color: "text-[#00758f]" },
    { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
    { name: "Git", icon: SiGit, color: "text-[#f05032]" }
  ];

  return (
    <div className="flex justify-center items-center py-4">
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
          ...holoStyle
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-78 h-[490px] sm:w-[330px] sm:h-[530px] cursor-grab active:cursor-grabbing group select-none transition-shadow duration-300 rounded-[28px] aaa-card-entrance"
      >
        {/* Glowing FUT outer backdrop shadow - soft cyan & purple */}
        <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-[#7b2fff]/30 via-[#00f5ff]/20 to-[#ffd700]/10 opacity-30 blur-xl group-hover:opacity-60 group-hover:blur-2xl transition-all duration-500" />

        {/* Dynamic Rainbow Edge Reflective Border */}
        <div className="holo-border-glow" />

        {/* FUT Card Outer Shield (Standard FUT 24 Card Shape) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/40 via-[#7b2fff]/30 to-[#ffd700]/20 p-[2px] fut-card-clip transition-all duration-300">
          
          {/* Inner Card Shell - Premium Glassmorphism */}
          <div className="absolute inset-[2px] bg-[#090b11]/92 backdrop-blur-xl fut-card-inner-clip flex flex-col p-4 sm:p-5 overflow-hidden justify-between border border-white/5">
            
            {/* Tech grid mesh backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,245,255,0.012)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(123,47,255,0.08)_0%,transparent_60%)] pointer-events-none" />

            {/* True Interactive Holographic Foil Layer */}
            <div className="holo-shine-layer" />

            {/* Top Row: Overall Rating & Job Title */}
            <div className="flex justify-between items-start pt-2 relative z-20" style={{ transform: "translateZ(30px)" }}>
              <div className="flex flex-col items-center">
                <span className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#ffd700] to-[#ffffff] bg-clip-text text-transparent text-glow-gold leading-none drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                  99
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  OVR
                </span>
                <div className="w-6 h-[1px] bg-[#00f5ff]/30 my-1" />
                <span className="text-xs font-mono text-[#00f5ff] text-glow-cyan font-bold tracking-wider">FS</span>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  <FiCpu size={11} className="text-[#00f5ff] animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-300 font-semibold tracking-wider">VN / DEV</span>
                </div>
                <span className="text-[8px] font-mono text-[#bd00ff] font-bold uppercase tracking-widest bg-[#bd00ff]/10 border border-[#bd00ff]/20 px-1.5 py-0.5 rounded mt-1">
                  GOAT
                </span>
              </div>
            </div>

            {/* Avatar section - High tech framing */}
            <div 
              className="absolute top-4 right-2 w-[180px] h-[210px] sm:w-[195px] sm:h-[235px] z-10 pointer-events-none overflow-hidden" 
              style={{ 
                transform: "translateZ(45px)",
                maskImage: "radial-gradient(circle at 45% 38%, black 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.15) 80%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle at 45% 38%, black 45%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.15) 80%, transparent 100%)"
              }}
            >
              <img 
                src={playerPhoto} 
                alt="Avatar"
                className="w-full h-full object-cover object-[30%_18%] scale-105 contrast-[1.08] brightness-[1.02] saturate-[1.05] drop-shadow-[0_0_12px_rgba(0,245,255,0.3)] transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Spacer for player image positioning */}
            <div className="h-28 sm:h-32" />

            {/* Name Banner & Description */}
            <div className="text-center relative z-20 mt-2" style={{ transform: "translateZ(35px)" }}>
              <h3 className="fc-title-slanted text-xl sm:text-2xl font-black text-white text-glow-cyan tracking-wider drop-shadow-[0_0_8px_rgba(0,245,255,0.3)]">
                TRẦN TRỌNG TÍN
              </h3>
              <p className="text-[8px] font-mono text-[#00f5ff] tracking-widest uppercase mt-0.5 font-bold">
                Fullstack Developer
              </p>
              <div className="w-28 h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/40 to-transparent mx-auto my-1.5" />
            </div>

            {/* Real World Technical Skills Grid */}
            <div 
              className="grid grid-cols-3 gap-x-2 gap-y-2 pt-2.5 pb-2.5 relative z-20 border border-white/5 bg-black/60 p-2 sm:p-2.5 rounded-xl border-cyan-500/10 text-center"
              style={{ transform: "translateZ(25px)" }}
            >
              {devSkills.map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center">
                  <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider" title={skill.name}>
                    {skill.label}
                  </span>
                  <span className="text-sm sm:text-base font-display font-black text-[#ffd700] text-glow-gold mt-0.5">
                    {skill.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Cyberpunk Tech Stack Badges */}
            <div 
              className="grid grid-cols-3 gap-1 relative z-20 pt-1"
              style={{ transform: "translateZ(20px)" }}
            >
              {techStack.map((tech, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-md text-[8px] sm:text-[9px] font-mono font-medium text-slate-300 backdrop-blur-sm justify-center group-hover:border-[#00f5ff]/30 transition-all duration-300"
                >
                  <tech.icon className={`${tech.color} text-[9px] sm:text-[11px]`} />
                  <span className="truncate">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Micro chip telemetry detail */}
            <div className="flex justify-between items-center text-[7px] font-mono text-slate-500 relative z-20 px-1 pt-1.5 border-t border-white/5">
              <span>PORTFOLIO CORE v2.0</span>
              <span>DEV STATUS: ACTIVE</span>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
