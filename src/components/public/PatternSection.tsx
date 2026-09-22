import React, { useEffect, useRef, useState } from 'react';

export const PatternSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Scrub as section travels through the comfortable reading viewport
          const start = windowHeight * 0.85;
          const totalDistance = rect.height + windowHeight * 0.5;
          const progress = Math.min(Math.max((start - rect.top) / totalDistance, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute stroke offsets based on scroll progress
  const arcLength = 700;
  const arcOffset = Math.max(arcLength * (1 - scrollProgress * 1.4), 0);

  const angleLength = 600;
  const angleOffset = Math.max(angleLength * (1 - Math.max((scrollProgress - 0.1) * 1.5, 0)), 0);

  const waveLength = 800;
  const waveOffset = Math.max(waveLength * (1 - Math.max((scrollProgress - 0.2) * 1.6, 0)), 0);

  return (
    <section
      id="pattern"
      ref={sectionRef}
      className="relative min-h-[90vh] py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/15 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Scholarly Copy */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Scene 02 · The Underlying Law
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-6">
            Beneath the noise, <br />
            <span className="italic text-[#C9A84C]">structure.</span>
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#F5F0E8]/85 font-serif font-light leading-relaxed">
            <p>
              Every market moves in cycles that repeat with mathematical precision. The question was never
              whether the patterns exist — it was whether you had the keys to read them.
            </p>
            <p className="text-sm text-[#F5F0E8]/70 font-body">
              Standard modern indicators lag price because they operate on averages. Ferrera’s methodology
              calculates the geometric vectors where time expires and directional momentum reverses.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#C9A84C]/20 flex items-center gap-6 font-mono text-xs text-[#C9A84C]">
            <div>
              <span className="block text-[#F5F0E8]/70 text-[10px] uppercase font-mono mb-0.5">Gann Angle</span>
              1×1 Equilibrium
            </div>
            <div className="h-6 w-[1px] bg-[#C9A84C]/30" />
            <div>
              <span className="block text-[#F5F0E8]/70 text-[10px] uppercase font-mono mb-0.5">Cycle Arc</span>
              Harmonic Resonance
            </div>
            <div className="h-6 w-[1px] bg-[#C9A84C]/30" />
            <div>
              <span className="block text-[#F5F0E8]/70 text-[10px] uppercase font-mono mb-0.5">Precision</span>
              Price-Time Squaring
            </div>
          </div>
        </div>

        {/* Right Column: Scroll-Linked SVG Geometric Overlay */}
        <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[420px] border border-[#C9A84C]/30 bg-[#0d1322] p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Subtle Grid Coordinates */}
          <div className="absolute top-3 left-4 text-[10px] font-mono text-[#C9A84C]/70 uppercase tracking-widest">
            Fig 2.1 — Geometry of Periodic Recurrence
          </div>
          <div className="absolute top-3 right-4 text-[10px] font-mono text-[#F5F0E8]/60">
            Scroll Progress: {Math.round(scrollProgress * 100)}%
          </div>

          <svg
            className="w-full h-full relative z-10"
            viewBox="0 0 600 380"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Geometric illustration of periodic recurrence and Gann squaring"
            role="img"
          >
            {/* Background Archival Coordinate Grid */}
            <line x1="50" y1="330" x2="550" y2="330" stroke="#8E95A5" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.6" />
            <line x1="50" y1="50" x2="50" y2="330" stroke="#8E95A5" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.6" />
            <line x1="50" y1="190" x2="550" y2="190" stroke="#8E95A5" strokeWidth="0.3" strokeDasharray="4 6" opacity="0.4" />

            {/* 1. Large Semicircular Arc (Cycle Wave) */}
            <path
              d="M 60 330 A 240 240 0 0 1 540 330"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={arcLength}
              strokeDashoffset={arcOffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />

            {/* 2. Primary 1x1 Gann Angle Line */}
            <line
              x1="60"
              y1="330"
              x2="460"
              y2="50"
              stroke="#C9A84C"
              strokeWidth="1.25"
              strokeDasharray={angleLength}
              strokeDashoffset={angleOffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />

            {/* 2b. Secondary 2x1 Gann Angle Line */}
            <line
              x1="60"
              y1="330"
              x2="540"
              y2="190"
              stroke="#C9A84C"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* 3. Harmonic Sine Wave (Two Periods) */}
            <path
              d="M 60 230 Q 180 130 300 230 T 540 230"
              stroke="#F5F0E8"
              strokeWidth="1"
              strokeOpacity="0.5"
              fill="none"
              strokeDasharray={waveLength}
              strokeDashoffset={waveOffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />

            {/* 4. Convergence Point & Mathematical Coordinates */}
            {scrollProgress > 0.4 && (
              <g className="transition-opacity duration-700 ease-in">
                {/* Intersection Circle */}
                <circle cx="360" cy="140" r="14" stroke="#C9A84C" strokeWidth="1" fill="none" />
                <circle cx="360" cy="140" r="3" fill="#C9A84C" />
                {/* Horizontal & Vertical Crosshairs */}
                <line x1="330" y1="140" x2="390" y2="140" stroke="#C9A84C" strokeWidth="0.5" />
                <line x1="360" y1="110" x2="360" y2="170" stroke="#C9A84C" strokeWidth="0.5" />
                {/* Annotation Label */}
                <text x="380" y="130" fill="#C9A84C" fontSize="10" fontFamily="IBM Plex Mono" letterSpacing="0.05em">
                  P-T Squaring [Σ: 0.618]
                </text>
              </g>
            )}

            {/* Data Point Constellation (Migrating toward alignment) */}
            {[
              { cx: 120, cy: 300, targetY: 280 },
              { cx: 180, cy: 260, targetY: 235 },
              { cx: 240, cy: 210, targetY: 195 },
              { cx: 300, cy: 175, targetY: 165 },
              { cx: 360, cy: 140, targetY: 140 },
              { cx: 420, cy: 190, targetY: 175 },
              { cx: 480, cy: 260, targetY: 245 },
            ].map((p, idx) => {
              const currentY = p.cy + (p.targetY - p.cy) * scrollProgress;
              return (
                <g key={idx}>
                  <circle cx={p.cx} cy={currentY} r="2.5" fill="#F5F0E8" fillOpacity="0.8" />
                  <line
                    x1={p.cx}
                    y1={currentY - 6}
                    x2={p.cx}
                    y2={currentY + 6}
                    stroke="#C9A84C"
                    strokeWidth="0.5"
                    opacity={scrollProgress}
                  />
                </g>
              );
            })}
          </svg>

          {/* Bottom Footnote on Chart */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#F5F0E8]/60 pt-2 border-t border-[#C9A84C]/20">
            <span>CosmoEconomics Mathematical Matrix</span>
            <span className="text-[#C9A84C]">Ferrera ICE Calibrations</span>
          </div>
        </div>
      </div>
    </section>
  );
};
