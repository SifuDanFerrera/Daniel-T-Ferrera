import React, { useState } from 'react';
import { FAQItem } from '../../types';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const sortedFaqs = [...faqs].filter((f) => f.isPublished).sort((a, b) => a.order - b.order);

  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/15 scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Methodological Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-4">
            Frequently asked questions.
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 font-serif font-light leading-relaxed">
            Clarity on the syllabus, mathematical prerequisites, and real-world futures execution.
          </p>
        </div>

        {/* Accordion List with Schema.org Question / Answer microdata */}
        <div className="space-y-4">
          {sortedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className={`border transition-all duration-200 ${
                  isOpen
                    ? 'border-[#C9A84C] bg-[#0c1322]'
                    : 'border-[#C9A84C]/25 bg-[#070b16] hover:border-[#C9A84C]/50'
                }`}
              >
                <button
                  id={headerId}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <h3 itemProp="name" className="text-lg sm:text-xl font-serif text-[#F5F0E8] font-normal">
                    {faq.question}
                  </h3>
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
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#C9A84C]/15 text-base font-serif text-[#F5F0E8]/90 leading-relaxed"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
                {/* Hidden semantic answer for crawlers/readers when accordion is collapsed */}
                {!isOpen && (
                  <meta itemProp="acceptedAnswer" content={faq.answer} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
