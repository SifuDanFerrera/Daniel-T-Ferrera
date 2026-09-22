import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCw,
  Sparkles,
  Shield,
  Compass,
} from 'lucide-react';

const ZPLANE_ORACLE_URL = 'https://zplane-oracle.lovable.app';

export const PriceTimeProjectionTool: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#070b16] p-4 sm:p-6 flex flex-col'
          : 'mb-16 border-2 border-[#C9A84C]/50 bg-[#070b16] shadow-2xl relative overflow-hidden'
      }`}
    >
      {/* Archival Tool Command Header */}
      <div className="bg-[#0b1222] border-b border-[#C9A84C]/30 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_8px_#00FF41]" />
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#C9A84C]">
              <Compass className="w-3.5 h-3.5 text-[#C9A84C]" />
              Z-Plane Oracle · Price-Time Projection Tool
            </div>
            <h3 className="text-base sm:text-lg font-serif text-[#F5F0E8] font-normal">
              Interactive Geometric Cycle Overlays & Historical Charts
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Refresh Frame */}
          <button
            onClick={handleRefresh}
            className="p-2 border border-[#C9A84C]/30 bg-[#050811] text-[#8E95A5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors cursor-pointer"
            title="Reload Z-Plane Oracle"
            aria-label="Reload Z-Plane Oracle"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Fullscreen / Expand */}
          <button
            onClick={toggleFullscreen}
            className="p-2 border border-[#C9A84C]/30 bg-[#050811] text-[#8E95A5] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Direct Launch in New Window */}
          <a
            href={ZPLANE_ORACLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs font-semibold hover:bg-[#d8b85c] transition-colors"
          >
            <span>Open Direct</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Iframe Viewport */}
      <div className={`relative w-full bg-[#050811] ${isFullscreen ? 'flex-1 min-h-0' : 'h-[750px] sm:h-[840px] md:h-[900px]'}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-[#070b16] z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-10 h-10 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mb-4" />
            <div className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] mb-1">
              Loading Z-Plane Oracle...
            </div>
            <p className="text-xs font-serif text-[#F5F0E8]/70 max-w-sm">
              Initializing interactive price-time coordinate projections and historical cycle models.
            </p>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={ZPLANE_ORACLE_URL}
          title="Z-Plane Oracle Interactive Price-Time Projection Tool"
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        />
      </div>

      {/* Contextual Archival Status Bar */}
      {!isFullscreen && (
        <div className="bg-[#0b1222] border-t border-[#C9A84C]/20 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between text-xs font-mono text-[#8E95A5] gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[#F5F0E8]/80">
              Interactive Methodology Verification: Toggle geometric overlays and inspect price-time cycles directly above.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#C9A84C]/80">
            <Shield className="w-3.5 h-3.5" />
            <span>Source: zplane-oracle.lovable.app</span>
          </div>
        </div>
      )}
    </div>
  );
};
