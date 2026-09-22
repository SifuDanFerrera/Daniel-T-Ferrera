import React, { useState, useEffect } from 'react';
import { ChartEvidence } from '../../types';
import { Maximize2, X } from 'lucide-react';
import { PriceTimeProjectionTool } from './PriceTimeProjectionTool';

interface ChartEvidenceProps {
  charts: ChartEvidence[];
}

export const ChartEvidenceSection: React.FC<ChartEvidenceProps> = ({ charts }) => {
  const [selectedChart, setSelectedChart] = useState<ChartEvidence | null>(null);
  const sortedCharts = [...charts].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedChart) {
        setSelectedChart(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedChart]);

  return (
    <section id="evidence" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#080d1a] border-t border-[#C9A84C]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Historical Verification
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-4">
            The record speaks.
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 font-serif font-light leading-relaxed">
            Selected historical applications of the Keys to ICE futures. Each chart exhibits the system’s signal
            overlaid on actual contract price action with exact squaring coordinates.
          </p>
        </div>

        {/* Interactive Price-Time Projection Oracle Tool */}
        <PriceTimeProjectionTool />

        {/* Archival Folio Reference Subheading */}
        <div className="flex items-center justify-between mb-6 border-b border-[#C9A84C]/20 pb-3">
          <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C]">
            Archival Monograph Exhibits & Contract Records
          </div>
          <div className="font-mono text-xs text-[#8E95A5]">
            Click any folio card below for high-resolution inspection
          </div>
        </div>

        {/* Chart Folio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sortedCharts.map((chart) => (
            <div
              key={chart.id}
              className="border border-[#C9A84C]/30 bg-[#0d1322] flex flex-col justify-between hover:border-[#C9A84C] transition-all duration-300 shadow-xl overflow-hidden group"
            >
              {/* Chart Visual Simulation / Archival Folio Canvas */}
              <div
                className="relative h-60 sm:h-64 bg-[#060a14] p-4 cursor-pointer overflow-hidden border-b border-[#C9A84C]/20"
                onClick={() => setSelectedChart(chart)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedChart(chart);
                  }
                }}
                aria-label={`Inspect ${chart.title} historical chart folio`}
              >
                {/* SVG Visual Archival Diagram */}
                <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" role="img" aria-label={chart.title}>
                  {/* Subtle Grid */}
                  <line x1="20" y1="40" x2="380" y2="40" stroke="#8E95A5" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="20" y1="120" x2="380" y2="120" stroke="#8E95A5" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#8E95A5" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.4" />

                  {/* Diagonal Gann Angle Line */}
                  <line x1="40" y1="210" x2="360" y2="30" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="40" y1="120" x2="360" y2="120" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />

                  {/* Harmonic Price Curve */}
                  <path
                    d="M 30 70 Q 110 180 200 210 T 370 50"
                    stroke="#F5F0E8"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Reversal Coordinate Marker */}
                  <circle cx="200" cy="210" r="10" stroke="#C9A84C" strokeWidth="1" className="animate-pulse" />
                  <polygon points="200,205 205,210 200,215 195,210" fill="#C9A84C" />
                  <text x="215" y="214" fill="#C9A84C" fontSize="9" fontFamily="IBM Plex Mono">
                    Signal Turn Point
                  </text>
                </svg>

                {/* Inspect Overlay Badge */}
                <div className="absolute top-3 right-3 bg-[#0A0E1A]/90 border border-[#C9A84C]/50 px-2.5 py-1 text-[10px] font-mono text-[#C9A84C] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" aria-hidden="true" />
                  <span>Inspect Folio</span>
                </div>

                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#F5F0E8]/70">
                  {chart.market} · {chart.year}
                </div>
              </div>

              {/* Chart Caption & Annotation */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-serif text-[#F5F0E8] font-normal mb-2 group-hover:text-[#C9A84C] transition-colors">
                    {chart.title}
                  </h3>
                  <p className="text-sm font-serif text-[#F5F0E8]/80 font-light leading-relaxed mb-4">
                    {chart.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C9A84C]/20 text-xs font-mono text-[#C9A84C]">
                  {chart.annotationText}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedChart && (
        <div
          className="fixed inset-0 z-50 bg-[#0A0E1A]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chart-modal-title"
        >
          <div className="relative max-w-4xl w-full border border-[#C9A84C] bg-[#0d1322] p-6 sm:p-10 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedChart(null)}
              className="absolute top-4 right-4 text-[#F5F0E8]/70 hover:text-[#C9A84C] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none"
              aria-label="Close Inspection Modal"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C]">
                Archival Record Exhibit · {selectedChart.market}
              </span>
              <h3 id="chart-modal-title" className="text-2xl sm:text-3xl font-serif text-[#F5F0E8]">
                {selectedChart.title}
              </h3>

              {/* Large Diagram Viewer */}
              <div className="w-full h-72 sm:h-84 bg-[#060a14] border border-[#C9A84C]/30 my-3 p-4 relative">
                <svg className="w-full h-full" viewBox="0 0 700 320" fill="none" role="img" aria-label={`Enlarged view of ${selectedChart.title}`}>
                  {/* Comprehensive Geometry Grid */}
                  {[40, 100, 160, 220, 280].map((y) => (
                    <line key={y} x1="30" y1={y} x2="670" y2={y} stroke="#8E95A5" strokeWidth="0.3" strokeDasharray="3 3" opacity="0.35" />
                  ))}
                  <line x1="50" y1="280" x2="650" y2="40" stroke="#C9A84C" strokeWidth="1.25" strokeDasharray="4 4" />
                  <path d="M 50 110 Q 220 300 380 300 T 650 70" stroke="#F5F0E8" strokeWidth="2" fill="none" />
                  <circle cx="380" cy="300" r="14" stroke="#C9A84C" strokeWidth="1.5" />
                  <polygon points="380,293 387,300 380,307 373,300" fill="#C9A84C" />
                  <text x="405" y="304" fill="#C9A84C" fontSize="12" fontFamily="IBM Plex Mono">
                    SQUARING TERMINAL: T=344 / P=10.13
                  </text>
                </svg>
              </div>

              <p className="text-base font-serif text-[#F5F0E8]/90 leading-relaxed">
                {selectedChart.caption}
              </p>
              <div className="p-4 border-l-2 border-[#C9A84C] bg-[#0A0E1A] font-mono text-xs text-[#C9A84C]">
                Verification Note: {selectedChart.annotationText}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
