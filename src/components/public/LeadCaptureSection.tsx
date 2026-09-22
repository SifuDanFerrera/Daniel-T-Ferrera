import React, { useState } from 'react';
import { submitLead } from '../../services/contentService';
import { SampleChapterModal } from './SampleChapterModal';
import { ArrowRight, BookOpen } from 'lucide-react';

const FREE_CHAPTER_PDF_URL =
  'https://www.cosmoeconomics.com/EZ/ice/ice/SamplePages/sb_297_ferrera_keys.pdf';

export const LeadCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email && email.includes('@')) {
      setLoading(true);
      try {
        await submitLead(email, 'landing_page_free_chapter');
      } catch (err: unknown) {
        console.warn('Lead capture notification:', err);
      } finally {
        setLoading(false);
      }
    }
    window.open(FREE_CHAPTER_PDF_URL, '_blank', 'noopener,noreferrer');
    setShowModal(true);
  };

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 bg-[#080d19] border-t border-[#C9A84C]/15 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Archival Tag */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-4">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Complimentary Monograph</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-serif text-[#F5F0E8] font-normal mb-4">
          Not ready to commit?
        </h3>

        <p className="text-base sm:text-lg font-serif text-[#F5F0E8]/85 max-w-xl mx-auto font-light leading-relaxed mb-8">
          Download the first chapter free. See the mathematical methodology in action before you invest.
        </p>

        {/* Lead Capture Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <label htmlFor="lead-email-input" className="sr-only">
            Institutional or professional email address
          </label>
          <input
            id="lead-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter institutional email (optional)..."
            className="flex-1 px-4 py-3 bg-[#0A0E1A] border border-[#C9A84C]/40 text-[#F5F0E8] placeholder-[#F5F0E8]/40 font-serif text-sm focus:outline-none focus:border-[#C9A84C] min-h-[48px]"
          />
          <a
            href={FREE_CHAPTER_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="download-free-chapter-button"
            onClick={() => {
              if (email && email.includes('@')) {
                submitLead(email, 'landing_page_free_chapter').catch(() => {});
              }
              setShowModal(true);
            }}
            className="px-6 py-3 bg-[#C9A84C] text-[#0A0E1A] font-serif text-sm font-semibold tracking-wide hover:bg-[#d8b85c] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap min-h-[48px] active:scale-[0.99] border border-[#C9A84C]"
          >
            <span>{loading ? 'Processing...' : 'Download Free Chapter'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </form>

        {error && (
          <p className="mt-3 text-xs font-mono text-rose-400">
            {error}
          </p>
        )}

        <p className="font-mono text-xs text-[#F5F0E8]/70 mt-4">
          Instant digital dispatch. We respect intellectual privacy and never transmit promotional solicitations.
        </p>
      </div>

      {showModal && (
        <SampleChapterModal email={email} onClose={() => setShowModal(false)} />
      )}
    </section>
  );
};
