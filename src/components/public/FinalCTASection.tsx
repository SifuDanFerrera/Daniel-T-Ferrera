import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  const [isTurned, setIsTurned] = useState(false);

  return (
    <section className="relative min-h-[80vh] py-20 sm:py-28 px-4 sm:px-6 bg-[#090e1c] border-t border-[#C9A84C]/20 flex items-center justify-center text-center overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
        {/* Asset B7: Interactive Antique Gold Key Icon (Rotates 90° on hover / tap) */}
        <div
          onClick={() => setIsTurned(!isTurned)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsTurned(!isTurned);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Turn the golden master key"
          className="group mb-8 cursor-pointer p-4 focus-visible:outline-none"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#C9A84C]/50 bg-[#0A0E1A] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-[#C9A84C] group-hover:scale-105">
            <svg
              className={`w-10 h-10 sm:w-12 sm:h-12 text-[#C9A84C] transform transition-transform duration-500 ease-in-out ${
                isTurned ? 'rotate-90' : 'group-hover:rotate-90'
              }`}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Antique Key Bow */}
              <circle cx="16" cy="16" r="10" />
              <circle cx="16" cy="16" r="4" strokeWidth="1" strokeDasharray="2 2" />
              {/* Key Shaft */}
              <line x1="23.5" y1="23.5" x2="42" y2="42" />
              {/* Bit / Teeth */}
              <line x1="36" y1="36" x2="42" y2="30" />
              <line x1="40" y1="40" x2="44" y2="36" />
            </svg>
          </div>
          <span className="block font-mono text-[10px] text-[#C9A84C] uppercase tracking-widest mt-3">
            {isTurned ? 'Key Engaged · Mechanism Unlocked' : 'Tap or Hover to Turn Key'}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F5F0E8] font-normal leading-tight mb-6">
          The keys are in your hands.
        </h2>

        {/* Body */}
        <p className="text-base sm:text-lg md:text-xl font-serif text-[#F5F0E8]/85 max-w-xl mx-auto font-light leading-relaxed mb-10">
          The market will continue to move in cycles whether you can read them or not. The only question is
          whether you'll have the keys.
        </p>

        {/* CTA Button */}
        <a
          href="https://www.cosmoeconomics.com/EZ/ice/ice/ice-book-the-keys-to-successful-speculation.php?item=297"
          target="_blank"
          rel="noopener noreferrer"
          id="final-get-the-keys-button"
          className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#C9A84C] text-[#0A0E1A] font-serif text-base sm:text-lg font-semibold tracking-wide hover:bg-[#d8b85c] active:scale-[0.99] transition-all duration-200 border border-[#C9A84C] shadow-2xl focus-visible:outline-none"
        >
          <span>Get the Keys</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
