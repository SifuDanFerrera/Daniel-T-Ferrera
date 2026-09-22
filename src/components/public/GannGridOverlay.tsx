import React from 'react';

export const GannGridOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg width="100%" height="100%" className="opacity-[0.035]">
        <defs>
          <pattern id="gann-grid" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Primary Diagonal 1x1 Gann Angles */}
            <line x1="0" y1="200" x2="200" y2="0" stroke="#C9A84C" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="200" y2="200" stroke="#C9A84C" strokeWidth="0.75" />
            {/* 2x1 and 1x2 Sub-Angles */}
            <line x1="0" y1="200" x2="200" y2="100" stroke="#C9A84C" strokeWidth="0.5" />
            <line x1="0" y1="200" x2="100" y2="0" stroke="#C9A84C" strokeWidth="0.5" />
            {/* Square Divisions */}
            <line x1="0" y1="100" x2="200" y2="100" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="3 3" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gann-grid)" />
      </svg>
    </div>
  );
};
