import React, { useState, useEffect } from 'react';
import { MethodologyCard } from '../../types';
import { Maximize2, X, ZoomIn, Crosshair, Compass, ShieldCheck, Activity } from 'lucide-react';

interface MethodologySectionProps {
  cards: MethodologyCard[];
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ cards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const sortedCards = [...cards].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Geometric fine-line SVG icon renderers
  const renderIcon = (type: string) => {
    switch (type) {
      case 'cycle':
        return (
          <svg className="w-8 h-8 text-[#C9A84C]" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 4 16 Q 10 4 16 16 T 28 16" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
        );
      case 'squaring':
        return (
          <svg className="w-8 h-8 text-[#C9A84C]" viewBox="0 0 32 32" fill="none">
            <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1" />
            <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="5" y1="27" x2="27" y2="5" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        );
      case 'keys':
        return (
          <svg className="w-8 h-8 text-[#C9A84C]" viewBox="0 0 32 32" fill="none">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1" />
            <rect x="9" y="9" width="4" height="4" stroke="currentColor" strokeWidth="0.75" />
            <line x1="16" y1="16" x2="27" y2="27" stroke="currentColor" strokeWidth="1.5" />
            <line x1="23" y1="23" x2="27" y2="19" stroke="currentColor" strokeWidth="1.5" />
            <line x1="26" y1="26" x2="29" y2="23" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'timing':
      default:
        return (
          <svg className="w-8 h-8 text-[#C9A84C]" viewBox="0 0 32 32" fill="none">
            <polygon points="16,3 29,27 3,27" stroke="currentColor" strokeWidth="1" />
            <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1" />
            <line x1="16" y1="7" x2="16" y2="27" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          </svg>
        );
    }
  };

  return (
    <section id="methodology" className="relative py-28 px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Methodology Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-4">
            The architecture of the system.
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/70 font-serif font-light">
            Three decades of cycle research synthesized into an uncompromising four-pillar analytical framework.
          </p>
        </div>

        {/* Hero Architectural Chart Blueprint */}
        <div id="methodology-hero-image" className="relative mb-20">
          <div className="relative border border-[#C9A84C]/30 bg-[#090D18] shadow-2xl overflow-hidden group">
            {/* Corner Decorative Brackets */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C9A84C] z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C9A84C] z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C9A84C] z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C9A84C] z-20 pointer-events-none" />

            {/* Top Archival Instrument Bar */}
            <div className="px-4 py-3 bg-[#0A0E1A] border-b border-[#C9A84C]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#F5F0E8]/70">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]"></span>
                </span>
                <span className="text-[#C9A84C] font-semibold tracking-wider">
                  MASTER GANN MATRIX & QUADRANT CYCLES
                </span>
                <span className="hidden sm:inline text-[#F5F0E8]/40">|</span>
                <span className="hidden sm:inline text-[#F5F0E8]/60">S&P 500 (^GSPC) Secular Harmonics</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-[11px] text-[#C9A84C]/70">
                  ANCHOR B: 2022-01-04 (P: 4,818.62) • ANCHOR C: 2022-10-13 (P: 3,491.58)
                </span>
                <button
                  type="button"
                  id="inspect-hero-chart-button"
                  onClick={() => {
                    setZoomLevel(1);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-colors text-xs font-mono cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect High-Res</span>
                </button>
              </div>
            </div>

            {/* Image Canvas Container */}
            <div
              className="relative cursor-pointer overflow-hidden bg-[#060810] flex items-center justify-center p-2 sm:p-4"
              onClick={() => {
                setZoomLevel(1);
                setIsModalOpen(true);
              }}
            >
              <img
                src="/assets/gann-matrix-hero.jpg"
                alt="Gann Matrix Cycle Analysis - S&P 500 Geometric Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[620px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Subtle hover inspection hint */}
              <div className="absolute inset-0 bg-[#0A0E1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 border border-[#C9A84C] bg-[#0A0E1A]/95 text-[#C9A84C] text-xs font-mono tracking-wider flex items-center gap-2 shadow-xl">
                  <ZoomIn className="w-4 h-4" />
                  Click to inspect full cycle matrix resolution
                </div>
              </div>
            </div>

            {/* Bottom Instrument Telemetry Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#C9A84C]/20 bg-[#0A0E1A] divide-x divide-[#C9A84C]/10 text-xs font-mono">
              <div className="p-3.5 flex items-center gap-2.5">
                <Crosshair className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#F5F0E8]/40 uppercase">Gann Geometric Vectors</div>
                  <div className="text-[#F5F0E8]/90 font-medium">1x1: 11.65 pt/b • 2x1: 5.82 pt/b</div>
                </div>
              </div>

              <div className="p-3.5 flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#F5F0E8]/40 uppercase">Squaring Division Nodes</div>
                  <div className="text-[#F5F0E8]/90 font-medium">25% (90°) • 50% MID (180°) • 75% (270°)</div>
                </div>
              </div>

              <div className="p-3.5 flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#F5F0E8]/40 uppercase">Curvature Harmonizers</div>
                  <div className="text-[#F5F0E8]/90 font-medium">KAMA(10,2,30) & SMA(3) Overlay</div>
                </div>
              </div>

              <div className="p-3.5 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#F5F0E8]/40 uppercase">Secular Terminus</div>
                  <div className="text-[#F5F0E8]/90 font-medium">Swing-SQ Harmonic Resonance</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/50 px-1">
            <span>FIGURE 1.0: MASTER PRICE-TIME SQUARING ARCHITECTURE (^GSPC 2022–2026)</span>
            <span className="text-[#C9A84C]/80">VERIFIED COSMOECONOMICS CYCLE REPOSITORY</span>
          </div>
        </div>

        {/* 4-Column Bento Card Grid (Sharp Corners, Gold Borders, Parchment Tone) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCards.map((card, index) => (
            <div
              key={card.id}
              className="group relative border border-[#C9A84C]/25 bg-[#0f172a]/70 p-8 flex flex-col justify-between hover:border-[#C9A84C] hover:bg-[#111c33] transition-all duration-300 shadow-md"
            >
              {/* Top Accent Index */}
              <div className="flex items-center justify-between mb-8">
                <div className="p-2 border border-[#C9A84C]/30 bg-[#0A0E1A]">
                  {renderIcon(card.iconType)}
                </div>
                <span className="font-mono text-xs text-[#C9A84C]/50 tracking-widest">
                  [PILLAR 0{index + 1}]
                </span>
              </div>

              {/* Title & Body */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-serif text-[#F5F0E8] font-normal tracking-wide mb-3 group-hover:text-[#C9A84C] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm font-serif text-[#F5F0E8]/75 font-light leading-relaxed">
                  "{card.body}"
                </p>
              </div>

              {/* Bottom Decorative Fine Line */}
              <div className="mt-8 pt-4 border-t border-[#C9A84C]/10 flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/40">
                <span>ICE Verified Matrix</span>
                <span className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">
                  Active Vector →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Full-Screen Modal Lightbox */}
      {isModalOpen && (
        <div
          id="hero-image-modal"
          className="fixed inset-0 z-50 bg-[#05070E]/95 backdrop-blur-md flex flex-col p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between border-b border-[#C9A84C]/30 pb-4 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9A84C] uppercase tracking-wider">
                <span className="w-2 h-2 bg-[#C9A84C] rounded-full" />
                Archival Technical Inspection
              </div>
              <h3 className="text-lg sm:text-xl font-serif text-[#F5F0E8] mt-1">
                Gann Master Matrix & Cycle Vectors — S&P 500 (^GSPC)
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 border border-[#C9A84C]/30 px-2 py-1 text-xs font-mono text-[#C9A84C]">
                <button
                  type="button"
                  onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.25))}
                  className="px-2 py-0.5 hover:bg-[#C9A84C]/20"
                >
                  -
                </button>
                <span className="px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
                  className="px-2 py-0.5 hover:bg-[#C9A84C]/20"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                id="close-hero-modal-button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Viewport */}
          <div
            className="flex-1 overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200 max-w-full"
            >
              <img
                src="/assets/gann-matrix-hero.jpg"
                alt="Gann Matrix Full High Resolution Chart"
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain border border-[#C9A84C]/20 shadow-2xl"
              />
            </div>
          </div>

          {/* Modal Footer Notes */}
          <div
            className="border-t border-[#C9A84C]/20 pt-3 mt-2 text-xs font-mono text-[#F5F0E8]/60 flex flex-wrap items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Geometry: 1x1 11.65 pt/b | Anchor B (2022-01-04) & Anchor C (2022-10-13) | Epicenter: 3,505.24</span>
            <span className="text-[#C9A84C]">Press ESC or click anywhere outside to close</span>
          </div>
        </div>
      )}
    </section>
  );
};
