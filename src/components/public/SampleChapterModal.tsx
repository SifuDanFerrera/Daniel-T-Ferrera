import React, { useEffect } from 'react';
import { X, BookOpen, Download } from 'lucide-react';

interface SampleChapterModalProps {
  onClose: () => void;
  email: string;
}

export const SampleChapterModal: React.FC<SampleChapterModalProps> = ({ onClose, email }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
    >
      <div className="relative max-w-3xl w-full border-2 border-[#C9A84C] bg-[#0c1220] p-6 sm:p-10 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F5F0E8]/70 hover:text-[#C9A84C] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none"
          aria-label="Close Sample Chapter Modal"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Complimentary Monograph · Sent to {email}</span>
        </div>

        <h3 id="sample-modal-title" className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] font-normal mb-2">
          Keys to Speculation — Chapter I: The Axiom of Non-Randomness
        </h3>
        <span className="text-xs font-mono text-[#C9A84C] block mb-6">
          By Daniel Ferrera · CosmoEconomics Research Addenda
        </span>

        {/* Archival Monograph Content Reader */}
        <div className="max-h-96 overflow-y-auto pr-4 border-y border-[#C9A84C]/25 py-6 text-sm sm:text-base font-serif text-[#F5F0E8]/90 space-y-4 leading-relaxed bg-[#080d18] p-6 text-left">
          <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#C9A84C] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            In modern financial academia, the prevailing orthodoxy remains the Efficient Market Hypothesis (EMH)
            and its mathematical progeny, the Random Walk. Yet anyone who has dedicated twenty years to the continuous
            study of raw commodity contracts recognizes the fatal flaw in this assumption: it ignores the physical
            law of periodic recurrence.
          </p>

          <p>
            When W.D. Gann declared in 1909 that "everything in existence is based on exact proportion and perfect
            relationship," he was not proposing a metaphysical conjecture; he was describing the geometry of
            matter in motion. Commodity markets, particularly those traded across the Intercontinental Exchange (ICE),
            represent tangible physical assets subject to astronomical, solar, and seasonal cycles.
          </p>

          <p>
            The fundamental error of standard chart analysis lies in divorcing the vertical axis (Price) from the
            horizontal axis (Time). Standard software permits the trader to compress or expand time arbitrarily.
            When you square price with time, you establish an immutable 1×1 equilibrium angle. When price strikes this
            angle after completing a harmonic cycle period, market structure demands an immediate vector resolution.
          </p>

          <div className="p-4 border-l-2 border-[#C9A84C] bg-[#0A0E1A] my-4 font-mono text-xs text-[#C9A84C]">
            [Formula 1.1]: T_square = √(P_range × Harmonic_Coefficient) mod (360° / N)
            <br />
            Where N represents the contract vibration constant (Sugar: 7, Brent: 9, Cocoa: 12).
          </div>

          <p>
            In the chapters that follow, we unpack the exact calculation tables and historical matrices used to
            anticipate multi-year cyclical bottoms across prompt ICE contracts weeks before commercial hedgers
            reposition their commitments.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#F5F0E8]/70">
            Archival Monograph #FE-01 · 24 Pages
          </span>
          <a
            href="https://www.cosmoeconomics.com/EZ/ice/ice/SamplePages/sb_297_ferrera_keys.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0E1A] font-serif text-sm font-semibold tracking-wide hover:bg-[#d8b85c] active:scale-[0.99] transition-all cursor-pointer min-h-[44px] border border-[#C9A84C]"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download Free Chapter PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
