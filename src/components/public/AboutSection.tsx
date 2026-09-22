import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { AboutContent } from '../../types';

interface AboutSectionProps {
  about: AboutContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0c1220] border-t border-[#C9A84C]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Fine-Line Margin Note Diagrams (Asset B8) & Lineage */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-[#C9A84C]/30 bg-[#090d18] p-6 sm:p-8 shadow-xl relative">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] block mb-6">
                CosmoEconomics Lineage & Primary Codices
              </span>

              {/* 4 Asset B8 Margin Note Illustrations */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Square of Nine Spiral Diagram */}
                <div className="border border-[#C9A84C]/30 p-4 bg-[#0A0E1A] flex flex-col items-center text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9A84C]" viewBox="0 0 100 100" fill="none" role="img" aria-label="Square of Nine geometric spiral diagram">
                    <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.75" />
                    <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.75" />
                    <rect x="40" y="40" width="20" height="20" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="2" fill="currentColor" />
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]/75 mt-2">
                    Square of Nine
                  </span>
                </div>

                {/* 2. Cycle Wheel Diagram */}
                <div className="border border-[#C9A84C]/30 p-4 bg-[#0A0E1A] flex flex-col items-center text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9A84C]" viewBox="0 0 100 100" fill="none" role="img" aria-label="12-Division cycle wheel harmonic diagram">
                    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="50"
                        x2={50 + 38 * Math.cos((deg * Math.PI) / 180)}
                        y2={50 + 38 * Math.sin((deg * Math.PI) / 180)}
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    ))}
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]/75 mt-2">
                    12-Division Cycle
                  </span>
                </div>

                {/* 3. Price-Time Triangle */}
                <div className="border border-[#C9A84C]/30 p-4 bg-[#0A0E1A] flex flex-col items-center text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9A84C]" viewBox="0 0 100 100" fill="none" role="img" aria-label="1x1 Squaring triangle diagram">
                    <polygon points="15,85 85,85 85,15" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="15" y1="85" x2="85" y2="15" stroke="currentColor" strokeWidth="1" />
                    <path d="M 35 85 A 20 20 0 0 0 35 70" stroke="currentColor" strokeWidth="0.5" />
                    <text x="38" y="78" fill="currentColor" fontSize="8" fontFamily="IBM Plex Mono">
                      45°
                    </text>
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]/75 mt-2">
                    1×1 Squaring Triangle
                  </span>
                </div>

                {/* 4. Planetary Aspect Diagram */}
                <div className="border border-[#C9A84C]/30 p-4 bg-[#0A0E1A] flex flex-col items-center text-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 text-[#C9A84C]" viewBox="0 0 100 100" fill="none" role="img" aria-label="Trine and Square geometric hexagram diagram">
                    <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="50,14 81,68 19,68" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="50,86 81,32 19,32" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]/75 mt-2">
                    Trine & Square Hexagram
                  </span>
                </div>
              </div>

              {/* Author Citations */}
              <div className="mt-6 pt-4 border-t border-[#C9A84C]/20 text-xs font-mono text-[#F5F0E8]/75 leading-relaxed">
                Foundational Research Lineage: W.D. Gann (1878–1955) · Dr. Jerome Baumring · George Bayer · Sacred Science Institute
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Biography */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
              <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
              The Author & Investigator
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-6 sm:mb-8">
              {about.heading || 'Three decades of research. One system.'}
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-[#F5F0E8]/90 font-serif font-light leading-relaxed">
              <p>
                {about.body}
              </p>
              <p className="text-sm sm:text-base font-body text-[#F5F0E8]/80 leading-relaxed">
                Ferrera’s breakthroughs do not treat market behavior as an isolated stochastic random walk.
                Instead, by mapping price action to rigorous mathematical squaring rules, the Keys reveal that
                commodity market movements are periodic physical waveforms governed by equilibrium coordinates.
              </p>
            </div>

            {/* Author Credentials Card */}
            <div className="mt-8 p-5 sm:p-6 border-l-2 border-[#C9A84C] bg-[#090d18] flex flex-col gap-3">
              <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">
                Recognized Publications & Fellowships
              </span>
              <p className="font-serif text-sm text-[#F5F0E8]/95 italic leading-relaxed">
                {about.credentials}
              </p>

              <div className="pt-3 border-t border-[#C9A84C]/20 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-[#F5F0E8]/70">
                  Institutional Profile & Research Catalog:
                </span>
                <a
                  href={about.bioURL || 'https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0E1A] font-mono text-xs font-semibold tracking-wider transition-all duration-200 group"
                  id="author-bio-link"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C9A84C] group-hover:text-[#0A0E1A] transition-colors" />
                  <span>Daniel Ferrera Bio & Bibliography</span>
                  <ExternalLink className="w-3 h-3 text-[#C9A84C] group-hover:text-[#0A0E1A] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
