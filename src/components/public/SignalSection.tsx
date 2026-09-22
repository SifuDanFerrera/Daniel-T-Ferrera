import React, { useEffect, useRef, useState } from 'react';

export const SignalSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Candlestick series following the curve (bearish sequence into harmonic squaring bottom and bullish expansion)
  const candles = [
    { x: 50, o: 100, c: 120, h: 90, l: 130, bull: false },
    { x: 85, o: 120, c: 140, h: 110, l: 150, bull: false },
    { x: 120, o: 138, c: 130, h: 125, l: 145, bull: true },
    { x: 155, o: 132, c: 165, h: 128, l: 172, bull: false },
    { x: 190, o: 165, c: 185, h: 160, l: 195, bull: false },
    { x: 225, o: 185, c: 180, h: 175, l: 190, bull: true },
    { x: 260, o: 182, c: 220, h: 178, l: 228, bull: false },
    { x: 295, o: 220, c: 255, h: 215, l: 265, bull: false },
    { x: 330, o: 255, c: 275, h: 250, l: 285, bull: false },
    // Reversal coordinate at x=365, price bottom
    { x: 365, o: 275, c: 270, h: 265, l: 282, bull: true, isKey: true },
    // Bullish ascent
    { x: 400, o: 270, c: 240, h: 235, l: 275, bull: true },
    { x: 435, o: 240, c: 210, h: 205, l: 245, bull: true },
    { x: 470, o: 210, c: 218, h: 205, l: 225, bull: false },
    { x: 505, o: 215, c: 175, h: 170, l: 220, bull: true },
    { x: 540, o: 175, c: 140, h: 135, l: 180, bull: true },
    { x: 575, o: 140, c: 105, h: 100, l: 145, bull: true },
    { x: 610, o: 105, c: 80, h: 75, l: 110, bull: true },
  ];

  return (
    <section
      id="signal"
      ref={containerRef}
      className="relative min-h-[90vh] py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/15 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        {/* Archival Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
          <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
          Scene 04 · The Pure Signal
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F5F0E8] font-normal leading-tight mb-4">
          One signal. One entry. <span className="italic text-[#C9A84C]">One edge.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-serif text-[#F5F0E8]/85 max-w-2xl mx-auto font-light leading-relaxed mb-10 sm:mb-12">
          No indicators. No lagging averages. No guesswork. The Keys identify the precise price-time
          coordinates where market structure demands a reversal.
        </p>

        {/* Asset B5 & A2: Clean Stylized Financial Signal Chart */}
        <div className="w-full relative border border-[#C9A84C]/30 bg-[#080c16] p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Chart Header Metadata */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono pb-4 border-b border-[#C9A84C]/20 gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-left">
              <span className="text-[#C9A84C] font-semibold">ICE FUTURES [PROMPT CONTRACT]</span>
              <span className="text-[#A0A5B5]">Interval: 1D</span>
              <span className="text-[#A0A5B5]">Scale: Natural Geometric Grid</span>
            </div>
            <div className="flex items-center gap-3 text-right">
              <span className="text-[#F5F0E8]/70">Cycle Period: 360° Harmonic</span>
              <span className="text-[#C9A84C] px-2 py-0.5 border border-[#C9A84C]/40 bg-[#C9A84C]/10 font-medium">
                Confirmed Squaring Vector
              </span>
            </div>
          </div>

          {/* Main Chart SVG */}
          <div className="relative w-full h-[300px] sm:h-[400px] my-4">
            <svg
              className="w-full h-full"
              viewBox="0 0 660 360"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Ferrera ICE Price Time Squaring Reversal Chart"
              role="img"
            >
              {/* Horizontal Price Grid Levels */}
              {[60, 120, 180, 240, 300].map((y) => (
                <g key={y}>
                  <line x1="30" y1={y} x2="630" y2={y} stroke="#8E95A5" strokeWidth="0.4" strokeDasharray="3 6" opacity="0.4" />
                  <text x="635" y={y + 3} fill="#A0A5B5" fontSize="8" fontFamily="IBM Plex Mono">
                    {(380 - y).toFixed(1)}
                  </text>
                </g>
              ))}

              {/* Vertical Time Increments (Cycle Days) */}
              {[100, 200, 300, 400, 500, 600].map((x) => (
                <g key={x}>
                  <line x1={x} y1="40" x2={x} y2="320" stroke="#8E95A5" strokeWidth="0.35" strokeDasharray="2 8" opacity="0.35" />
                  <text x={x - 12} y="340" fill="#A0A5B5" fontSize="8" fontFamily="IBM Plex Mono">
                    T+{x / 10}
                  </text>
                </g>
              ))}

              {/* 1x1 Gann Angle Line Rising from Reversal Point (365, 275) */}
              <line
                x1="365"
                y1="275"
                x2="600"
                y2="40"
                stroke="#C9A84C"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                opacity={inView ? '0.85' : '0'}
                className="transition-opacity duration-1000 delay-500"
              />
              <text
                x="530"
                y="80"
                fill="#C9A84C"
                fontSize="9"
                fontFamily="IBM Plex Mono"
                opacity={inView ? '0.9' : '0'}
                className="transition-opacity duration-1000 delay-700"
              >
                1×1 Ascending Angle
              </text>

              {/* Cycle Wave Arc Bottoming Exactly at Coordinate (365, 275) */}
              <path
                d="M 120 130 C 240 275 300 275 365 275 S 520 180 620 90"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset={inView ? '0' : '1000'}
                style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                fill="none"
              />

              {/* Candlesticks: Cream for Bullish, Steel Slate for Bearish */}
              {candles.map((c, i) => (
                <g key={i} opacity={inView ? '1' : '0'} style={{ transition: `opacity 0.4s ease ${i * 0.04}s` }}>
                  {/* High-Low Wick */}
                  <line
                    x1={c.x}
                    y1={c.h}
                    x2={c.x}
                    y2={c.l}
                    stroke={c.bull ? '#F5F0E8' : '#8E95A5'}
                    strokeWidth="1"
                  />
                  {/* Candle Body */}
                  <rect
                    x={c.x - 4}
                    y={Math.min(c.o, c.c)}
                    width="8"
                    height={Math.max(Math.abs(c.o - c.c), 3)}
                    fill={c.bull ? '#F5F0E8' : '#8E95A5'}
                    stroke={c.bull ? '#F5F0E8' : '#8E95A5'}
                    strokeWidth="0.5"
                  />
                </g>
              ))}

              {/* Key Diamond Entry Coordinate Indicator */}
              {inView && (
                <g className="animate-in fade-in zoom-in duration-700 delay-700">
                  {/* Highlight Target Cross */}
                  <line x1="330" y1="275" x2="400" y2="275" stroke="#C9A84C" strokeWidth="0.75" />
                  <line x1="365" y1="240" x2="365" y2="310" stroke="#C9A84C" strokeWidth="0.75" />

                  {/* Pulsing Outer Diamond Accent */}
                  <polygon
                    points="365,263 377,275 365,287 353,275"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    fill="none"
                    className="animate-pulse"
                  />
                  {/* Solid Center Diamond */}
                  <polygon points="365,268 372,275 365,282 358,275" fill="#C9A84C" />

                  {/* Callout Pointer Box */}
                  <rect
                    x="230"
                    y="295"
                    width="270"
                    height="32"
                    fill="#0A0E1A"
                    stroke="#C9A84C"
                    strokeWidth="0.75"
                  />
                  <text
                    x="240"
                    y="315"
                    fill="#C9A84C"
                    fontSize="9.5"
                    fontFamily="IBM Plex Mono"
                    fontWeight="500"
                    letterSpacing="0.03em"
                  >
                    ENTRY SIGNAL · Squaring Coordinate (P: 275.0, T: 36.5)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Chart Caption Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E8]/75 font-serif pt-4 border-t border-[#C9A84C]/15 text-left gap-2">
            <p>
              Actual chart diagram illustration demonstrating Ferrera’s price-time squaring method on an ICE
              commodity cycle reversal. No lagging indicator overlays.
            </p>
            <span className="font-mono text-[#C9A84C] text-[11px] shrink-0">
              Source: CosmoEconomics Archives
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
