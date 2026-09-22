import React from 'react';
import { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const published = testimonials.filter((t) => t.isPublished);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#070b15] border-t border-[#C9A84C]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C9A84C] mb-3">
            <span className="w-1.5 h-1.5 bg-[#C9A84C]" />
            Practitioner Verification
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F0E8] leading-tight mb-4">
            From those who've turned the key.
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 font-serif font-light leading-relaxed">
            Reflections from disciplined commodities analysts and professional cycle traders.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {published.map((item) => (
            <div
              key={item.id}
              className="relative border border-[#C9A84C]/30 bg-[#0b101e] p-6 sm:p-8 flex flex-col justify-between shadow-xl"
            >
              {/* Oversized Serif Quotation Mark */}
              <div
                className="font-serif text-6xl text-[#C9A84C]/30 leading-none select-none -mb-4 -mt-2"
                aria-hidden="true"
              >
                “
              </div>

              {/* Quote Body */}
              <p className="text-base font-serif text-[#F5F0E8]/90 font-light leading-relaxed mb-6 italic relative z-10">
                {item.quote}
              </p>

              {/* Author & Credential */}
              <div className="pt-4 border-t border-[#C9A84C]/20 flex flex-col">
                <span className="font-serif text-base text-[#F5F0E8] font-medium">
                  {item.author}
                </span>
                <span className="font-mono text-xs text-[#C9A84C] mt-0.5">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
