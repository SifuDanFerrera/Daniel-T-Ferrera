import React, { useEffect, useRef, useState } from 'react';

export const LockSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const start = windowHeight * 0.85;
          const totalDistance = rect.height + windowHeight * 0.4;
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

  // Determine alignment states for 5 tumblers
  const t1Aligned = scrollProgress > 0.15;
  const t2Aligned = scrollProgress > 0.32;
  const t3Aligned = scrollProgress > 0.50;
  const t4Aligned = scrollProgress > 0.68;
  const t5Aligned = scrollProgress > 0.85;

  const allAligned = t1Aligned && t2Aligned && t3Aligned && t4Aligned && t5Aligned;

  return (
    <section
      id="lock"
      ref={containerRef}
      className="relative min-h-[90vh] py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] flex flex-col justify-center items-center text-center overflow-hidden border-t border-[#C9A84C]/15"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
        {/* Archival Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
          <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
          Scene 03 · The Mechanical Resolution
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F5F0E8] font-normal leading-tight mb-4">
          Keys to <span className="italic text-[#C9A84C]">Speculation.</span>
        </h2>

        {/* Section Body */}
        <p className="text-base sm:text-lg md:text-xl font-serif text-[#F5F0E8]/85 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-10">
          Daniel Ferrera’s proprietary methodology for ICE futures. Three decades of cycle research, distilled
          into a systematic framework for identifying high-probability turning points before they appear on any
          conventional chart.
        </p>

        {/* Asset B4: The Precision Lock Mechanism SVG */}
        <div className="relative w-[280px] sm:w-[360px] h-[320px] sm:h-[400px] my-6 flex items-center justify-center">
          {/* Subtle Outer Frame transition */}
          <div
            className={`absolute inset-0 border bg-[#0d1322] transition-all duration-700 ${
              allAligned ? 'border-[#C9A84C] shadow-[0_0_25px_rgba(201,168,76,0.15)]' : 'border-[#C9A84C]/30'
            }`}
          />

          <svg
            className="w-full h-full relative z-10 p-4 sm:p-6"
            viewBox="0 0 320 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Interactive 5-tumbler mechanical lock alignment visualization"
            role="img"
          >
            {/* Outer Lock Frame */}
            <rect
              x="20"
              y="50"
              width="280"
              height="260"
              rx="2"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="#0A0E1A"
            />
            {/* Inner Precision Border */}
            <rect
              x="28"
              y="58"
              width="264"
              height="244"
              stroke="#C9A84C"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />

            {/* Central Vertical Shear Line (Alignment Point) */}
            <line
              x1="160"
              y1="68"
              x2="160"
              y2="292"
              stroke="#C9A84C"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.5"
            />

            {/* 5 Tumblers with Dynamic Mechanical Transitions */}
            {/* Tumbler 1 */}
            <g
              style={{
                transform: `translateX(${t1Aligned ? 0 : -45}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <line x1="80" y1="95" x2="240" y2="95" stroke={t1Aligned ? '#C9A84C' : '#8E95A5'} strokeWidth="2.5" />
              <circle cx="240" cy="95" r="4.5" fill={t1Aligned ? '#C9A84C' : '#8E95A5'} />
              <text x="50" y="98" fill={t1Aligned ? '#C9A84C' : '#8E95A5'} fontSize="9" fontFamily="IBM Plex Mono">
                T₁
              </text>
            </g>

            {/* Tumbler 2 */}
            <g
              style={{
                transform: `translateX(${t2Aligned ? 0 : 50}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <line x1="80" y1="135" x2="240" y2="135" stroke={t2Aligned ? '#C9A84C' : '#8E95A5'} strokeWidth="2.5" />
              <circle cx="80" cy="135" r="4.5" fill={t2Aligned ? '#C9A84C' : '#8E95A5'} />
              <text x="250" y="138" fill={t2Aligned ? '#C9A84C' : '#8E95A5'} fontSize="9" fontFamily="IBM Plex Mono">
                T₂
              </text>
            </g>

            {/* Tumbler 3 (Central Master) */}
            <g
              style={{
                transform: `translateX(${t3Aligned ? 0 : -35}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <line x1="80" y1="175" x2="240" y2="175" stroke={t3Aligned ? '#C9A84C' : '#8E95A5'} strokeWidth="2.5" />
              <circle cx="240" cy="175" r="4.5" fill={t3Aligned ? '#C9A84C' : '#8E95A5'} />
              <text x="50" y="178" fill={t3Aligned ? '#C9A84C' : '#8E95A5'} fontSize="9" fontFamily="IBM Plex Mono">
                T₃
              </text>
            </g>

            {/* Tumbler 4 */}
            <g
              style={{
                transform: `translateX(${t4Aligned ? 0 : 40}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <line x1="80" y1="215" x2="240" y2="215" stroke={t4Aligned ? '#C9A84C' : '#8E95A5'} strokeWidth="2.5" />
              <circle cx="80" cy="215" r="4.5" fill={t4Aligned ? '#C9A84C' : '#8E95A5'} />
              <text x="250" y="218" fill={t4Aligned ? '#C9A84C' : '#8E95A5'} fontSize="9" fontFamily="IBM Plex Mono">
                T₄
              </text>
            </g>

            {/* Tumbler 5 */}
            <g
              style={{
                transform: `translateX(${t5Aligned ? 0 : -55}px)`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <line x1="80" y1="255" x2="240" y2="255" stroke={t5Aligned ? '#C9A84C' : '#8E95A5'} strokeWidth="2.5" />
              <circle cx="240" cy="255" r="4.5" fill={t5Aligned ? '#C9A84C' : '#8E95A5'} />
              <text x="50" y="258" fill={t5Aligned ? '#C9A84C' : '#8E95A5'} fontSize="9" fontFamily="IBM Plex Mono">
                T₅
              </text>
            </g>

            {/* Keyhole Cylinder at Exact Center */}
            <g>
              <circle
                cx="160"
                cy="175"
                r="18"
                fill={allAligned ? '#C9A84C' : '#0A0E1A'}
                stroke="#C9A84C"
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />
              <polygon
                points="155,180 165,180 168,198 152,198"
                fill={allAligned ? '#0A0E1A' : '#C9A84C'}
                className="transition-colors duration-500"
              />
            </g>
          </svg>

          {/* Alignment Status Label */}
          <div className="absolute -bottom-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#C9A84C] bg-[#0A0E1A] px-3 py-1 border border-[#C9A84C]/50 shadow-md">
            {allAligned ? 'All 5 Keys Aligned · Edge Resolved' : 'Aligning Market Mechanics...'}
          </div>
        </div>

        {/* Secondary Action Link */}
        <a
          href="#methodology"
          className="mt-6 text-sm font-serif text-[#C9A84C] hover:text-[#d8b85c] underline underline-offset-8 transition-colors inline-flex items-center gap-2 focus-visible:outline-none"
        >
          <span>See the Methodology</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};
