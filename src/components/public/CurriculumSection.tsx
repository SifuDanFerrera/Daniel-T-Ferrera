import React, { useState } from 'react';
import { CurriculumModule } from '../../types';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface CurriculumSectionProps {
  modules: CurriculumModule[];
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ modules }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  const deliverables = [
    'Complete 420-page Keys to Speculation Master Course Treatise',
    "Daniel Ferrera's Complete 6-Chapter Treatise: The Missing Dimension (Squaring Price & Time in Modern Markets)",
    'Proprietary ICE Futures Key Tables & Mathematical Matrix Plates',
    'Archival Reference Chart Folios with Full Harmonic Annotations',
    'Interactive Excel & Web Digital Calculation Tool Suite',
    'Exclusive CosmoEconomics Research Forum & Addenda Updates',
  ];

  return (
    <section id="curriculum" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/15">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Complete Curriculum Overview
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-4">
            What's inside.
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 font-serif font-light leading-relaxed">
            A comprehensive, modular journey from raw mathematical foundations to active futures execution.
          </p>
        </div>

        {/* Timeline / Accordion */}
        <div className="space-y-4 mb-14 sm:mb-16">
          {sortedModules.map((mod, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `module-content-${mod.id}`;
            const headerId = `module-header-${mod.id}`;

            return (
              <div
                key={mod.id}
                className={`border transition-all duration-200 ${
                  isOpen
                    ? 'border-[#C9A84C] bg-[#0e1627]'
                    : 'border-[#C9A84C]/25 bg-[#090e1b] hover:border-[#C9A84C]/50'
                }`}
              >
                <button
                  id={headerId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6">
                    <span className="font-mono text-xs px-2.5 py-1 border border-[#C9A84C]/40 text-[#C9A84C] bg-[#0A0E1A] shrink-0">
                      MODULE 0{mod.moduleNumber || idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-[#F5F0E8] font-normal">
                      {mod.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A84C] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#C9A84C]/15 text-base font-serif text-[#F5F0E8]/90 leading-relaxed"
                  >
                    <p>{mod.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deliverables Checklist */}
        <div className="border border-[#C9A84C]/30 bg-[#0d1424] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#C9A84C]/20 pb-4 mb-6 gap-2">
            <h4 className="text-xl font-serif text-[#F5F0E8]">
              Comprehensive Deliverables Included
            </h4>
            <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">
              Permanent Methodology License
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-1" aria-hidden="true" />
                <span className="text-sm font-serif text-[#F5F0E8]/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
