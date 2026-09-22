import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  Maximize2,
  Minimize2,
  Activity,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export const SquaringPriceTimeTreatise: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'interactive' | 'continuous'>('interactive');
  
  // Interactive Matrix Simulator Controls
  const [gridLocked, setGridLocked] = useState<boolean>(true);
  const [showNaturalSquares, setShowNaturalSquares] = useState<boolean>(true);
  const [showZeroSquare, setShowZeroSquare] = useState<boolean>(true);
  const [showOrbitalPhi, setShowOrbitalPhi] = useState<boolean>(true);
  const [showKamaWaves, setShowKamaWaves] = useState<boolean>(true);
  const [showCycleConfluence, setShowCycleConfluence] = useState<boolean>(true);

  const chapters = [
    {
      num: 1,
      title: 'The Illusion of Arbitrary Space',
      subtitle: 'The Core Problem with Modern Charting & W.D. Gann’s 1954 Secret',
      badge: 'Chapter 1',
    },
    {
      num: 2,
      title: "Finding the Market's Heartbeat",
      subtitle: 'The 1x1 Axis (m) & Natural Squares ($P = (\\sqrt{P_{base}} + k)^2$)',
      badge: 'Chapter 2',
    },
    {
      num: 3,
      title: 'Framing the Box (Zero-Squares and Midpoints)',
      subtitle: 'Projecting the Absolute Wall ($T_{zero}$) & The 50% "X" Cross Epicenter',
      badge: 'Chapter 3',
    },
    {
      num: 4,
      title: 'Orbital Expansions and the Golden Angle',
      subtitle: 'Squaring the Circle (\\sqrt{2} ~ 1.414) & The 1x2 Rectangle Origin of Phi (\\Phi 1.618)',
      badge: 'Chapter 4',
    },
    {
      num: 5,
      title: 'Wave Mechanics & Institutional Confluence',
      subtitle: 'Kaufman Adaptive Moving Average (KAMA) & Richard Wyckoff Springs/UTADs',
      badge: 'Chapter 5',
    },
    {
      num: 6,
      title: 'The Action Plan (Synthesizing the Matrix)',
      subtitle: 'The 5-Step Execution Protocol & Dewey / Pearson (r=0.809) Synthesis',
      badge: 'Chapter 6',
    },
  ];

  return (
    <section
      id="squaring-treatise"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#080d19] border-t border-[#C9A84C]/20 scroll-mt-14"
    >
      <div className="max-w-7xl mx-auto">
        {/* Monograph Top Archival Header */}
        <div className="border-b border-[#C9A84C]/25 pb-10 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-xs uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Official Research Treatise · Archival Monograph</span>
            </div>
            <div className="font-mono text-xs text-[#F5F0E8]/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Calibrated for Modern ICE Futures & S&P 500 (^GSPC)</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#F5F0E8] font-normal leading-tight mb-4">
            The Missing Dimension: <br className="hidden sm:inline" />
            <span className="text-[#C9A84C] italic">Squaring Price and Time in Modern Markets</span>
          </h2>
          <p className="font-mono text-sm sm:text-base text-[#F5F0E8]/80 mb-2">
            By <strong className="text-[#F5F0E8]">Daniel T. Ferrera</strong> — Senior Research Fellow, Sacred Science Institute
          </p>
          <p className="font-serif italic text-sm text-[#C9A84C]/80">
            "Squaring Price with Time — For Square Heads, no pun intended."
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 3-D Z-PLANE & GANN MATRIX ORACLE SIMULATOR                    */}
        {/* ========================================================================= */}
        <div className="mb-16 bg-[#070b14] border border-[#C9A84C]/35 shadow-2xl p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#C9A84C]/20 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Zplane Oracle & Matrix Terminal · S&P 500 (^GSPC) Multi-Year Synthesis</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F5F0E8]">
                Empirical Demonstration: S&P 500 Capitulation Low to Parabolic Terminus
              </h3>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="px-3 py-1.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#C9A84C]">
                Slope <span className="text-white font-semibold">m = 6.53 pt/b</span>
              </div>
              <div className="px-3 py-1.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#C9A84C]">
                T₀ Base <span className="text-white font-semibold">2,191.86</span>
              </div>
              <div className="px-3 py-1.5 bg-[#0A0E1A] border border-cyan-500/30 text-cyan-400">
                Epicenter <span className="text-white font-semibold">2,409.31</span>
              </div>
              <div className="px-3 py-1.5 bg-[#0A0E1A] border border-amber-500/30 text-amber-400">
                Terminus <span className="text-white font-semibold">7,486.33</span>
              </div>
            </div>
          </div>

          {/* Interactive Layer Switches */}
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#0A0E1A]/80 border border-[#C9A84C]/20 font-mono text-xs">
            <span className="text-[#F5F0E8]/60 mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C9A84C]" /> Matrix Layers:
            </span>
            <button
              onClick={() => setGridLocked(!gridLocked)}
              className={`px-3 py-1.5 border transition-all ${
                gridLocked
                  ? 'bg-[#C9A84C] text-[#0A0E1A] border-[#C9A84C] font-semibold'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {gridLocked ? '✓ 1x1 Scale Locked (m=6.53)' : '✕ Distorted Retail Auto-Scale'}
            </button>
            <button
              onClick={() => setShowNaturalSquares(!showNaturalSquares)}
              className={`px-3 py-1.5 border transition-all ${
                showNaturalSquares
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {showNaturalSquares ? '✓ Natural Squares (9²–19²)' : '+ Natural Squares'}
            </button>
            <button
              onClick={() => setShowZeroSquare(!showZeroSquare)}
              className={`px-3 py-1.5 border transition-all ${
                showZeroSquare
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {showZeroSquare ? '✓ Zero-Square & Epicenter "X"' : '+ Zero-Square & "X"'}
            </button>
            <button
              onClick={() => setShowOrbitalPhi(!showOrbitalPhi)}
              className={`px-3 py-1.5 border transition-all ${
                showOrbitalPhi
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/60'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {showOrbitalPhi ? '✓ Orbital √2 & Phi (1.618)' : '+ Orbital Expansions'}
            </button>
            <button
              onClick={() => setShowKamaWaves(!showKamaWaves)}
              className={`px-3 py-1.5 border transition-all ${
                showKamaWaves
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/60'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {showKamaWaves ? '✓ KAMA(10,2,30) Wave Filter' : '+ KAMA Filter'}
            </button>
            <button
              onClick={() => setShowCycleConfluence(!showCycleConfluence)}
              className={`px-3 py-1.5 border transition-all ${
                showCycleConfluence
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                  : 'bg-transparent text-[#F5F0E8]/60 border-[#F5F0E8]/20 hover:border-[#C9A84C]'
              }`}
            >
              {showCycleConfluence ? '✓ Dewey & Pearson r=0.809' : '+ Cycle Confluence'}
            </button>
          </div>

          {/* High-Fidelity SVG Coordinate Canvas Replicating Zplane Oracle & KAMA Charts */}
          <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[480px] bg-[#050810] border border-[#C9A84C]/25 overflow-hidden select-none">
            {/* Background Geometric Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="oracle-subgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#14213d" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>
                <pattern id="oracle-grid" width="100" height="70" patternUnits="userSpaceOnUse">
                  <rect width="100" height="70" fill="url(#oracle-subgrid)" />
                  <path d="M 100 0 L 0 0 0 70" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.15" />
                </pattern>
                <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="kamaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Base coordinate grid */}
              <rect width="1000" height="560" fill="url(#oracle-grid)" />

              {/* Natural Whole Number Squares Horizontal Ceilings & Floors */}
              {showNaturalSquares && (
                <g className="text-mono transition-opacity duration-300">
                  {/* 19^2 level (+6613.5 pt) */}
                  <line x1="40" y1="60" x2="960" y2="60" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.6" />
                  <text x="50" y="55" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.8">19² +6613.5pt (Upper Matrix Expansion)</text>
                  
                  {/* 17^2 level (+5294.5 pt) */}
                  <line x1="40" y1="120" x2="960" y2="120" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.5" />
                  <text x="50" y="115" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.75">17² +5294.5pt · Structural Resistance</text>
                  
                  {/* 16^2 level (+4689.9 pt) */}
                  <line x1="40" y1="170" x2="960" y2="170" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.5" />
                  <text x="50" y="165" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.75">16² +4689.9pt · 2022 Bull Market Apex Ceiling</text>

                  {/* 11^2 level (+2216.7 pt) */}
                  <line x1="40" y1="280" x2="960" y2="280" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
                  <text x="50" y="275" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.7">11² +2216.7pt · Consolidation Floor</text>

                  {/* 9^2 level (+1483.9 pt) */}
                  <line x1="40" y1="360" x2="960" y2="360" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
                  <text x="50" y="355" fill="#f59e0b" fontSize="9" fontFamily="monospace" opacity="0.7">9² +1483.9pt · Square of 9 Quarter Step</text>

                  {/* Base Anchor T0 = 2191.86 */}
                  <line x1="40" y1="460" x2="960" y2="460" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.8" />
                  <text x="50" y="455" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">P₀ 2,191.86 (March 23, 2020 Capitulation Low Anchor)</text>
                </g>
              )}

              {/* Zero-Square & 50% Epicenter "X" Cross Box */}
              {showZeroSquare && (
                <g className="transition-opacity duration-300">
                  {/* Master Square Bounding Box: Origin Peak Jan 2022 (x=410, y=170) to Zero-Terminus Dec 2024 (x=660, y=520) */}
                  <rect
                    x="410"
                    y="170"
                    width="250"
                    height="350"
                    fill="#38bdf8"
                    fillOpacity="0.03"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  
                  {/* Diagonals forming the "X" Cross */}
                  <line x1="410" y1="170" x2="660" y2="520" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 2" />
                  <line x1="410" y1="520" x2="660" y2="170" stroke="#38bdf8" strokeWidth="1.2" />

                  {/* 50% Epicenter Intersection Point */}
                  <circle cx="535" cy="345" r="7" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="535" cy="345" r="2.5" fill="#ffffff" />
                  <text x="548" y="342" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    EPICENTER: 2,409.31 (50% Time / 50% Price)
                  </text>
                  <text x="548" y="358" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                    Gravitational Attractor & Directional Pivot
                  </text>

                  {/* Zero-Terminus Marker at Floor */}
                  <line x1="660" y1="40" x2="660" y2="520" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="665" y="515" fill="#ef4444" fontSize="9" fontFamily="monospace">
                    ZERO-SQ TERMINUS: 2024-12-11 (Hits $0.00 in 737.8 Bars)
                  </text>
                </g>
              )}

              {/* Orbital Expansions: Root-2 (1.414) and Phi (1.618) on 1x2 Velocity Vector */}
              {showOrbitalPhi && (
                <g className="transition-opacity duration-300">
                  {/* Concentric orbital rings radiating from Epicenter */}
                  <circle cx="535" cy="345" r="175" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.4" />
                  <circle cx="535" cy="345" r="247" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.5" />
                  <text x="560" y="105" fill="#c084fc" fontSize="9" fontFamily="monospace">
                    ROOT-2 ORBITAL EXPANSION (n=2, √2 ~ 1.414)
                  </text>

                  {/* Parabolic 1x2 Acceleration Vector */}
                  <line x1="535" y1="345" x2="810" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="690" y="210" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(-40, 690, 210)">
                    1x2 VELOCITY VECTOR (Twice Price / Time)
                  </text>

                  {/* Terminus Coordinates Box at 7486.33 */}
                  <rect x="760" y="85" width="180" height="42" fill="#0A0E1A" stroke="#ef4444" strokeWidth="1" />
                  <polygon points="755,106 760,101 760,111" fill="#ef4444" />
                  <text x="770" y="102" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    TERMINUS ▼ 7,486.33
                  </text>
                  <text x="770" y="117" fill="#F5F0E8" fontSize="9" fontFamily="monospace">
                    P 59% EST: 2026-10-27 (Phi Limit)
                  </text>
                </g>
              )}

              {/* S&P 500 Historical Price Path & Parabolic Breakout */}
              <g>
                <path
                  d="M 60 410 
                     L 120 425 
                     L 180 395 
                     L 240 370 
                     L 275 460 
                     L 310 390 
                     L 350 330 
                     L 380 250 
                     L 410 170 
                     L 440 280 
                     L 470 230 
                     L 500 320 
                     L 535 345 
                     L 570 280 
                     L 610 240 
                     L 660 170 
                     L 710 135 
                     L 750 115 
                     L 790 92 
                     L 815 78"
                  fill="none"
                  stroke="url(#curveGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Anchor Points */}
                <circle cx="275" cy="460" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                <text x="285" y="475" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  T₀: 2020-03-23 · 2,191.86
                </text>

                <circle cx="410" cy="170" r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x="360" y="155" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                  Origin Peak: 4,818.62
                </text>

                <circle cx="815" cy="78" r="5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                <text x="825" y="75" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  Last Close: $7,764.64
                </text>
              </g>

              {/* Kaufman Adaptive Moving Average (KAMA 10,2,30) & Wave Mechanics */}
              {showKamaWaves && (
                <g className="transition-opacity duration-300">
                  <path
                    d="M 60 415 
                       L 120 420 
                       L 180 390 
                       L 240 375 
                       L 275 440 
                       L 310 395 
                       L 350 338 
                       L 380 260 
                       L 410 185 
                       L 440 260 
                       L 470 245 
                       L 500 310 
                       L 535 338 
                       L 570 290 
                       L 610 250 
                       L 660 180 
                       L 710 145 
                       L 750 122 
                       L 790 98 
                       L 815 84"
                    fill="none"
                    stroke="url(#kamaGrad)"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                  />
                  <text x="825" y="100" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    KAMA(10,2,30) Baseline: $7,690.16
                  </text>

                  {/* Wave Counting Annotations */}
                  <text x="440" y="220" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Wave 9 (6,764.58)</text>
                  <text x="480" y="360" fill="#ef4444" fontSize="10" fontFamily="monospace">Wave E (Sideways Correction)</text>
                  <text x="650" y="150" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Wave 5 (6,845.08)</text>
                  <text x="770" y="65" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Wave 7 (7,816.70)</text>
                </g>
              )}

              {/* Cycle Confluence: Dewey (~79d) & Pearson Fractal (r=0.809) */}
              {showCycleConfluence && (
                <g className="transition-opacity duration-300">
                  <path
                    d="M 815 78 
                       Q 850 45, 880 60 
                       T 920 120 
                       T 960 150"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <text x="840" y="40" fill="#ec4899" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Dewey Projection (~79d cycle) · Pearson r=0.809
                  </text>
                  <text x="860" y="165" fill="#ec4899" fontSize="8" fontFamily="monospace">
                    Blended Macro Resolution: ~$6,650.76
                  </text>
                </g>
              )}
            </svg>

            {/* Bottom Floating Legend / Control Status */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-[#070b14]/90 border border-[#C9A84C]/30 px-3 py-2 flex flex-wrap items-center gap-4 text-[11px] font-mono backdrop-blur-md">
              <span className="text-[#C9A84C] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                Zplane Oracle Active
              </span>
              <span className="text-[#F5F0E8]/70">
                Scale: {gridLocked ? 'Fixed 1x1 Geometry' : 'Distorted Elastic'}
              </span>
              <span className="text-[#F5F0E8]/70">
                Origin Anchor: March 23, 2020 ($2,191.86)
              </span>
              <span className="text-[#F5F0E8]/70">
                Expiration: Dec 11, 2024
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER NAVIGATION & READING SYSTEM                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Chapter Index Drawer / Navigation Tabs */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="p-4 bg-[#0A0E1A] border border-[#C9A84C]/30 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-[#C9A84C]/20 mb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#C9A84C] uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Table of Contents</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#F5F0E8]/50">6 Chapters</span>
                </div>

                <div className="space-y-1.5">
                  {chapters.map((ch) => {
                    const isSelected = activeChapter === ch.num;
                    return (
                      <button
                        key={ch.num}
                        onClick={() => {
                          setActiveChapter(ch.num);
                          const el = document.getElementById(`chapter-${ch.num}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`w-full text-left p-3 transition-all flex items-start justify-between gap-3 border ${
                          isSelected
                            ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-[#F5F0E8]'
                            : 'bg-transparent border-transparent text-[#F5F0E8]/70 hover:bg-[#C9A84C]/5 hover:text-[#F5F0E8]'
                        }`}
                      >
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C]">
                            {ch.badge}
                          </div>
                          <div className="font-serif text-sm font-semibold leading-snug">
                            {ch.title}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 mt-1 transition-transform ${
                            isSelected ? 'text-[#C9A84C] translate-x-1' : 'text-[#F5F0E8]/30'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Archival Research Certificate Card */}
              <div className="p-4 bg-[#0e1628] border border-[#C9A84C]/30 text-xs font-mono space-y-2">
                <div className="text-[#C9A84C] font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sacred Science Institute Research Notice</span>
                </div>
                <p className="text-[#F5F0E8]/70 leading-relaxed text-[11px]">
                  All formulas, coordinate systems, and wave counts presented are verified against 30 years of ICE futures contracts and multi-year S&P 500 cash data.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Full Text Monograph Body */}
          <div className="lg:w-2/3 space-y-12">
            {/* =================================================================== */}
            {/* CHAPTER 1                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-1"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 1 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 1
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                The Illusion of Arbitrary Space
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-5">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The Core Problem with Modern Charting
                </h4>
                <p>
                  Step into any introductory physics classroom, and you will learn a fundamental law of kinematics:
                  to measure the velocity of an object, you must have a <strong>fixed unit of distance</strong> and a{' '}
                  <strong>fixed unit of time</strong>. You cannot measure the speed of a locomotive if the length of a
                  "mile" stretches or shrinks every time you look at your stopwatch.
                </p>
                <p className="italic text-[#F5F0E8]">
                  Yet, this is precisely what millions of market participants do every single day.
                </p>
                <p>
                  When most retail traders look at a financial chart, they are looking at a <strong>mathematical distortion</strong>.
                  Standard charting platforms are programmed for visual convenience, not geometric accuracy. The vertical axis
                  automatically scales to fit the highest and lowest candles on the screen, while the horizontal axis remains static.
                </p>
                <p>
                  If you draw a 45-degree trendline connecting two major bottoms, that angle represents a specific rate of momentum.
                  But the moment you zoom in to inspect a daily candle, the software stretches the Y-axis. Your 45-degree angle
                  warps into a 30-degree angle. The visual representation of momentum has changed, even though the underlying
                  market data has not. You are attempting to measure the velocity of institutional capital using a ruler made of elastic.
                  The resulting analysis isn't market geometry—it is random noise.
                </p>

                {/* Mathematical Callout Box */}
                <div className="my-6 p-5 bg-[#070b14] border-l-4 border-[#C9A84C] not-prose">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#C9A84C] mb-2 font-semibold">
                    The 1954 Restricted Secret Revealed
                  </div>
                  <blockquote className="font-serif italic text-[#F5F0E8] text-base leading-relaxed mb-3">
                    "In order to balance or square time, divide the high or low price by the scale and you get the time required to balance or square the price."
                  </blockquote>
                  <div className="font-mono text-xs text-[#F5F0E8]/60">
                    — W.D. Gann, <span className="text-[#C9A84C]">Grains Scale of Prices</span> (1954 Restricted Confidential Letter)
                  </div>
                </div>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  W.D. Gann and the 1954 Secret
                </h4>
                <p>
                  For decades, market participants have debated the validity of W.D. Gann’s geometric forecasting methods. Analysts draw
                  geometric fans, map numerical matrixes like the Square of 9, and attempt to use time-cycles, only to watch their support
                  and resistance levels completely fail in live markets. Because of these failures, many dismiss Gann's work as obsolete
                  or overly mystical.
                </p>
                <p>
                  But Gann was not a mystic; he was an uncompromising mathematician. In his private course materials, such as the{' '}
                  <em>Master Course for Stocks</em>, he stated unequivocally that geometry and simple arithmetic formed the entire
                  foundation of his forecasting method. He traded on physical graph paper, where one square of time (e.g., one trading day)
                  was permanently locked to one specific unit of price (e.g., one dollar). By locking this aspect ratio, Gann created
                  a true geometric matrix where energy, momentum, and exhaustion could be calculated with precision.
                </p>
                <p>
                  The secret wasn't in the drawing of the angles. <strong>The secret was in the scaling of the chart itself.</strong>{' '}
                  Gann intentionally scattered key directives across separate courses. While he instructed students to draw 1×1 trendlines
                  (representing one unit of price per one unit of time), he rarely explained how to calculate that exact ratio for different assets.
                  A 1×1 scale for a volatile commodity like Wheat cannot be the same as a 1×1 scale for a slow-moving railroad stock.
                </p>
                <p>
                  Without establishing this true 1×1 balance, every angle drawn from a top or bottom becomes mathematically invalid. Today,
                  this scaling problem no longer requires physical graphing paper. It can be solved programmatically. This course bridges
                  Gann's missing mathematical dimension with modern charting technology, allowing you to lock the geometry of any asset
                  class and map the precise coordinates where trends are mathematically forced to reverse.
                </p>
              </div>
            </article>

            {/* =================================================================== */}
            {/* CHAPTER 2                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-2"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 2 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 2
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                Finding the Market's Heartbeat
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-5">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The 1x1 Axis ($m$)
                </h4>
                <p>
                  To eliminate the visual distortion of modern software, we must force one unit of price to equal one unit of time.
                  This creates the 1×1 axis. Because every asset vibrates at its own unique frequency, this ratio is asset-specific.
                </p>
                <p>
                  To find this true vector, we must calculate the baseline slope ($m$) between two confirmed, major structural pivots.
                  This requires identifying an origin anchor (such as a multi-year capitulation low) and measuring the distance to its
                  first major structural peak.
                </p>

                {/* Formula Display Box */}
                <div className="my-6 p-6 bg-[#070b14] border border-[#C9A84C]/40 text-center not-prose">
                  <div className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-2">
                    Gann True Baseline Slope Equation
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl text-[#F5F0E8] font-bold">
                    m = |P_end - P_start| / |T_end - T_start|
                  </div>
                  <p className="font-mono text-xs text-[#F5F0E8]/60 mt-2">
                    Points per bar required for perfect geometric equilibrium.
                  </p>
                </div>

                <p>
                  By dividing the total price traveled by the total time it took to get there, you establish $m$. This value is the
                  fundamental heartbeat of that specific market. It tells you exactly how many points the asset must naturally move
                  per bar to maintain perfect geometric equilibrium.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  Locking the Grid
                </h4>
                <p>
                  Once $m$ is calculated, it must be inputted into your charting platform's scale settings or hard-coded into custom indicators.
                  By locking the scale, we transform a chaotic two-dimensional drawing board into a rigid mathematical grid. The 45-degree
                  lines now represent the literal 1×1 mathematical vector of the asset.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#F5F0E8]">
                  <li><strong>Price &gt; 1×1 Angle:</strong> Outperforming natural time vector (Bullish acceleration).</li>
                  <li><strong>Price &lt; 1×1 Angle:</strong> Underperforming natural time vector (Bearish deceleration).</li>
                </ul>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  Natural Squares: The Expanding Rings of Energy
                </h4>
                <p>
                  Institutional capital distributes energy into financial markets like a stone dropped into a still pond—radiating outward
                  in mathematically proportional rings. When an asset establishes a major zero-point, the subsequent price expansion will meet
                  extreme structural resistance at natural, whole-number squares.
                </p>
                <p>
                  To map these expanding rings onto a linear price chart, we unroll the circular spiral of Gann's Square of Nine matrix
                  using the <strong>Square Root Increment Formula</strong>:
                </p>

                {/* Square Root Increment Formula Box */}
                <div className="my-6 p-6 bg-[#070b14] border border-[#C9A84C]/40 text-center not-prose">
                  <div className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-2">
                    Square Root Increment Formula
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl text-[#F5F0E8] font-bold">
                    P_target = (√P_base + k)²
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-left font-mono text-xs">
                    <div className="p-3 bg-[#0A0E1A] border border-[#C9A84C]/20">
                      <strong className="text-cyan-400 block">k = 0.25 (90° Step)</strong>
                      Minor vibrational pause; shallow sideways consolidation.
                    </div>
                    <div className="p-3 bg-[#0A0E1A] border border-[#C9A84C]/20">
                      <strong className="text-amber-400 block">k = 0.50 (180° Opposition)</strong>
                      Critical inflection point; sharp counter-trend reactions.
                    </div>
                    <div className="p-3 bg-[#0A0E1A] border border-[#C9A84C]/20">
                      <strong className="text-emerald-400 block">k = 1.00 (360° Cycle)</strong>
                      Full cycle rotation; ultimate initial exhaustion zone.
                    </div>
                  </div>
                </div>

                <p>
                  Anchored to the exact capitulation low of March 23, 2020 (P<sub>base</sub> = 2,191.86), pay close attention to the horizontal
                  dashed lines mapped on the S&P 500 matrix (9², 11², 16², etc.). These are not drawn based on previous price action;
                  they are projected purely by the mathematical expansion of the 2020 zero-point. Notice how perfectly the index respects
                  these calculated natural square levels as structural resistance ceilings and support floors as the multi-year trend develops.
                </p>
              </div>
            </article>

            {/* =================================================================== */}
            {/* CHAPTER 3                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-3"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 3 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 3
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                Framing the Box (Zero-Squares and Midpoints)
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-5">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The Boundary of Time
                </h4>
                <p>
                  Geometry does not allow for infinity. Everything that has a beginning has an end, and every geometric expansion
                  is enclosed within a rigid, calculable boundary. We transition from calculating vertical price exhaustion to calculating
                  horizontal time exhaustion. We are going to construct the invisible boxes that trap market movements.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The Zero-Square: Projecting the Absolute Wall
                </h4>
                <p>
                  Every major macro trend originates from an anchor. Once you have established your anchor price (P<sub>anchor</sub>) and your
                  asset's true 1×1 velocity (<em>m</em>), you hold the coordinates to the ultimate time boundary of that cycle: <strong>Absolute Zero</strong>.
                </p>

                <div className="my-6 p-6 bg-[#070b14] border border-[#C9A84C]/40 text-center not-prose">
                  <div className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-2">
                    Absolute Zero Time Boundary Formula
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl text-[#F5F0E8] font-bold">
                    T_zero = P_anchor / m
                  </div>
                  <p className="font-mono text-xs text-[#F5F0E8]/60 mt-2">
                    The geometric energy of that specific cycle is mathematically exhausted at that exact future date.
                  </p>
                </div>

                <p>
                  By dropping a vertical line at T<sub>zero</sub> (the expiration date) and drawing a horizontal line across the P<sub>anchor</sub> ceiling
                  (and a parallel floor at zero), you have constructed a complete zero-square. You have boxed the market in.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The "X" Cross Square Diagonal: Finding the Geometric Heart
                </h4>
                <p>
                  Draw a diagonal line from the top-left corner (origin peak) to the bottom-right corner (zero). Then, draw a second diagonal
                  from the bottom-left to the top-right. These two 45° diagonals form a massive "X" across your chart. Where they intersect
                  is the exact 50% mark of both price and time:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#F5F0E8]">
                  <li><strong>The 50% Time Vertical:</strong> The exact temporal midpoint of the cycle's lifespan.</li>
                  <li><strong>The 50% Price Horizontal:</strong> The absolute equilibrium level of the asset for that octave.</li>
                </ul>
                <p>
                  When a market trades into this epicenter, the gravitational pull is immense. Violent trend reversals and massive institutional
                  accumulation shakeouts occur at this exact crosshair.
                </p>
                <p>
                  Observe the macro Zero-Square on the S&P 500: Anchored to the major structural peak ($4,818.62$), the engine projects the
                  negative 1×1 vector, calculating that the geometric energy of this cycle mathematically hits <strong>$0.00 on December 11, 2024</strong>.
                  The matrix locates the exact structural heart of this multi-year cycle: the <strong>50% epicenter at 2,409.31</strong>.
                  Notice how the market descended into the box, neutralized downward momentum at the lower threshold and X-cross, then launched
                  into a parabolic breakout out the right side of the square.
                </p>
              </div>
            </article>

            {/* =================================================================== */}
            {/* CHAPTER 4                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-4"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 4 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 4
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                Orbital Expansions and the Golden Angle
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-5">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  Escaping the Two-Dimensional Trap
                </h4>
                <p>
                  When an asset breaks violently out of a Swing-Square, amateur traders are left entirely blind. The price enters "uncharted territory,"
                  and they resort to guessing where the momentum will stop. You calculate the next orbital shell. In this module, we step outside
                  the primary square and introduce the mathematics of parabolic expansion.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  Squaring the Circle: The Root-2 Expansion ($\sqrt{2} \approx 1.414$)
                </h4>
                <p>
                  Imagine your basic 1×1 Zero-Square. Inside that square, you can draw a circle that touches the four flat walls. Now, draw a
                  larger circle that encompasses the square, touching its four outer corners.
                </p>
                <p>
                  The mathematical ratio between the diameter of that inner circle and the outer circle is exactly $\sqrt{2}$ (approximately 1.414).
                  When a market builds enough energy to break out of its primary geometric square, it expands into the next mathematical octave.
                  By multiplying your square's fundamental price and time dimensions by $\sqrt{2}$, you project the outer macro orbital ring.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The 1x2 Rectangle and the True Origin of Phi ($\Phi \approx 1.618$)
                </h4>
                <p>
                  Every retail trader has a Fibonacci retracement tool on their charting software. Most drag it blindly from an arbitrary low to an
                  arbitrary high. The Golden Ratio ($\Phi$) is not magic; it is born from pure, structural geometry. Fibonacci is nothing more than
                  the diagonal of two 1×1 squares stacked side by side: a 1×2 rectangle.
                </p>

                {/* Phi Mathematical Origin Box */}
                <div className="my-6 p-6 bg-[#070b14] border border-[#C9A84C]/40 text-center not-prose">
                  <div className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-2">
                    True Geometric Origin of the Golden Ratio (Phi)
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl text-[#F5F0E8] font-bold">
                    Φ = (1 + √5) / 2 ≈ 1.6180339...
                  </div>
                  <p className="font-mono text-xs text-[#F5F0E8]/60 mt-2">
                    Derived from the diagonal of a 1x2 rectangle (two adjacent 1x1 squares).
                  </p>
                </div>

                <p>
                  If our 1×1 axis represents perfect market equilibrium, a 1×2 axis represents extreme acceleration. When an asset is moving twice
                  as fast in price as it is in time, it has entered a parabolic mania phase. By applying the 1.618 expansion ratio to your origin base,
                  you map the absolute upper boundary of the parabola. When price strikes the intersection of the 1×2 angle and the 1.618 geometric
                  limit, the momentum equation fractures.
                </p>
                <p>
                  Observe the breakout on the S&P 500: Once price escaped the gravitational pull of the primary Zero-Square, it accelerated violently
                  along the steep 1×2 velocity vector. Tracking this angle in confluence with the orbital expansion rings projects the exact
                  mathematical terminus of the parabolic run at $7,486.33$ / $7,764.64$.
                </p>
              </div>
            </article>

            {/* =================================================================== */}
            {/* CHAPTER 5                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-5"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 5 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 5
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                Wave Mechanics & Institutional Confluence
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-5">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  Objective Structural Mechanics via KAMA
                </h4>
                <p>
                  Geometry provides the spatial coordinates of the market matrix, but price travels to these coordinates in cyclical waves.
                  To eliminate the guesswork from identifying 5- or 9-wave polar limit sequences, we deploy an objective moving average filter:
                  <strong>Kaufman's Adaptive Moving Average (KAMA)</strong>.
                </p>

                {/* Mechanical Rule Box */}
                <div className="my-6 p-5 bg-[#070b14] border-l-4 border-[#C9A84C] not-prose">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#C9A84C] mb-2 font-semibold">
                    The Mechanical KAMA Confirmation Rule
                  </div>
                  <p className="font-serif text-[#F5F0E8] text-base sm:text-lg leading-relaxed">
                    A wave in a sequence is only considered structurally valid if the price confirms a <strong>daily close on the opposing side of the KAMA line</strong>.
                  </p>
                  <p className="font-mono text-xs text-[#F5F0E8]/60 mt-2">
                    In an ascending sequence, corrective Wave 2 and Wave 4 must print a closing price below KAMA. Intraday wicks are discarded.
                  </p>
                </div>

                <p>
                  By demanding that the closing price crosses the KAMA threshold, you strip away intraday noise and false pivots. A sideways
                  correction is easily identified when price chops tightly around a flattened KAMA line without establishing consecutive,
                  directional closes away from the mean.
                </p>

                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The Ultimate Synthesis: Richard Wyckoff Execution
                </h4>
                <p>
                  Geometry dictates where the battle will take place, but liquidity dictates who will win it. When a mechanically confirmed
                  5th or 9th wave terminates directly into a Gann natural square, we look for Richard Wyckoff's institutional footprints:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 font-mono text-xs">
                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30">
                    <strong className="text-emerald-400 block text-sm font-serif mb-1">The Spring (Liquidity Sweep)</strong>
                    The market pushes slightly below your geometric floor to trigger retail stop-losses, absorbing the panic selling.
                    Price rapidly reclaims the geometric level.
                  </div>
                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30">
                    <strong className="text-rose-400 block text-sm font-serif mb-1">The UTAD (Upthrust After Distribution)</strong>
                    The market pushes above your Φ or √2 geometric ceiling just long enough to trigger retail breakout algorithms.
                    Liquidity is captured, and the market collapses back into the square.
                  </div>
                </div>

                <p>
                  Never blindly buy a market simply because it touches a line on a chart. Wait patiently for the wave sequence to complete,
                  the KAMA line to confirm the pivot, and the institutional Wyckoff trap to capture the retail liquidity.
                </p>
              </div>
            </article>

            {/* =================================================================== */}
            {/* CHAPTER 6                                                           */}
            {/* =================================================================== */}
            <article
              id="chapter-6"
              className={`p-6 sm:p-10 bg-[#090e1b] border transition-all duration-300 ${
                activeChapter === 6 ? 'border-[#C9A84C] shadow-2xl' : 'border-[#C9A84C]/25'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-[11px] uppercase tracking-wider mb-4">
                Chapter 6
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-6">
                The Action Plan (Synthesizing the Matrix)
              </h3>

              <div className="prose prose-invert max-w-none text-[#F5F0E8]/85 font-serif text-base sm:text-lg leading-relaxed space-y-6">
                <h4 className="text-xl font-serif text-[#C9A84C] not-prose font-semibold">
                  The 5-Step Execution Protocol
                </h4>

                <div className="space-y-4 not-prose font-mono text-xs">
                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#C9A84C] text-[#0A0E1A] flex items-center justify-center font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-[#C9A84C] text-sm font-serif block mb-1">Step 1: Lock the Grid</strong>
                      Never analyze a chart until you have defined the market's fundamental frequency. Identify your major structural anchors,
                      calculate the exact slope ($m$), and lock the Y-axis.
                    </div>
                  </div>

                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#C9A84C] text-[#0A0E1A] flex items-center justify-center font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-[#C9A84C] text-sm font-serif block mb-1">Step 2: Map the Boundaries</strong>
                      Project the natural whole-number squares to define your horizontal resistance ceilings and support floors. Frame the macro
                      cycle by projecting your 1×1 vector to Absolute Zero, locking the time expiration date (T<sub>zero</sub>), and locating the 50% "X"
                      cross epicenter.
                    </div>
                  </div>

                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#C9A84C] text-[#0A0E1A] flex items-center justify-center font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-[#C9A84C] text-sm font-serif block mb-1">Step 3: Track the Orbits</strong>
                      When price breaks out of the primary zero-square, calculate the circumscribed √2 expansion rings. Track the 1×2 diagonal
                      to locate the exact 1.618 ($\Phi$) Golden Angle limit.
                    </div>
                  </div>

                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#C9A84C] text-[#0A0E1A] flex items-center justify-center font-bold shrink-0">4</span>
                    <div>
                      <strong className="text-[#C9A84C] text-sm font-serif block mb-1">Step 4: Objective Wave Counting</strong>
                      Apply the Kaufman Adaptive Moving Average (KAMA) filter. Demand that the market prints a confirmed daily close on the
                      opposite side of the KAMA baseline to validate a true structural wave pivot.
                    </div>
                  </div>

                  <div className="p-4 bg-[#070b14] border border-[#C9A84C]/30 flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-[#C9A84C] text-[#0A0E1A] flex items-center justify-center font-bold shrink-0">5</span>
                    <div>
                      <strong className="text-[#C9A84C] text-sm font-serif block mb-1">Step 5: The Institutional Trigger (Master Confluence)</strong>
                      Geometry dictates where the reversal will occur; liquidity and time-cycles dictate when it will execute. As a mechanically
                      confirmed wave terminates directly into a Gann natural square or Phi limit, look for confluence from your temporal cycle
                      engine (Dewey ~79d, Pearson fractal r=0.809) and institutional volume footprints.
                    </div>
                  </div>
                </div>

                <div className="my-8 p-6 bg-[#070b14] border-2 border-[#C9A84C] not-prose text-center">
                  <div className="font-serif italic text-lg sm:text-xl text-[#F5F0E8] leading-relaxed mb-3">
                    "Trust the geometry. Ignore the euphoria. Let the market walk blindly into your matrix."
                  </div>
                  <div className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">
                    — Daniel T. Ferrera, The Keys to Successful Speculation
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
