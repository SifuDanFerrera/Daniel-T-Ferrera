import React, { useState } from 'react';
import { PricingConfig } from '../../types';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  pricing: PricingConfig;
  onEnrollClick?: () => void;
}

const DEFAULT_KEYS_URL =
  'https://www.cosmoeconomics.com/EZ/ice/ice/ice-book-the-keys-to-successful-speculation.php?item=297';

export const PricingSection: React.FC<PricingSectionProps> = ({ pricing }) => {
  const keysURL = pricing.ctaURL && !pricing.ctaURL.startsWith('#') ? pricing.ctaURL : DEFAULT_KEYS_URL;

  return (
    <section id="pricing" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0E1A] border-t border-[#C9A84C]/15 scroll-mt-12">
      <div id="enroll" className="max-w-4xl mx-auto">
        {/* Pricing Master Card */}
        <div className="border-2 border-[#C9A84C] bg-[#0c1322] p-6 sm:p-14 shadow-2xl relative overflow-hidden text-center">
          {/* Top Decorative Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#C9A84C]/40 bg-[#0A0E1A] text-[#C9A84C] font-mono text-xs uppercase tracking-widest mb-6">
            Institutional Master Program
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F0E8] font-normal leading-tight mb-4">
            {pricing.heading || 'The cost of edge.'}
          </h2>

          <p className="text-base sm:text-lg font-serif text-[#F5F0E8]/85 max-w-xl mx-auto font-light leading-relaxed mb-8">
            {pricing.body ||
              'The Keys to Speculation are not a subscription. They are a permanent methodology you will use for the rest of your trading career.'}
          </p>

          {/* Price Display */}
          <div className="my-8 flex flex-col items-center justify-center gap-3">
            {/* Current Discount Price Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A84C]/15 border border-[#C9A84C]/50 text-[#C9A84C] font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(201,168,76,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Current Discount Price: {pricing.discountPrice || pricing.price || '$595.00'}
            </div>

            <div className="flex flex-wrap items-baseline justify-center gap-3 sm:gap-4 mt-1">
              <span className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#C9A84C] font-semibold tracking-tight">
                {pricing.discountPrice || pricing.price || '$595.00'}
              </span>

              {(pricing.originalPrice || '$2,850') && (
                <div className="flex flex-col items-start text-left">
                  <span className="font-serif text-2xl sm:text-3xl text-[#8E95A5] line-through decoration-[#C9A84C]/80 decoration-2">
                    {pricing.originalPrice || '$2,850'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5]/80">
                    Regular Price
                  </span>
                </div>
              )}

              <span className="font-mono text-xs uppercase tracking-widest text-[#F5F0E8]/70">
                One-Time Investment
              </span>
            </div>
          </div>

          {/* Guarantee Box */}
          <div className="max-w-2xl mx-auto my-8 p-5 sm:p-6 border border-[#C9A84C]/40 bg-[#070b14] text-left flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#C9A84C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-serif text-base text-[#F5F0E8] font-medium mb-1">
                30-Day Systematic Verification Guarantee
              </h4>
              <p className="text-xs sm:text-sm font-serif text-[#F5F0E8]/80 leading-relaxed font-light">
                {pricing.guarantee}
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="max-w-xl mx-auto text-left my-8 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C9A84C] block mb-3">
              Included With Enrollment:
            </span>
            {pricing.includes.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm font-serif text-[#F5F0E8]/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA Button */}
          <a
            href={keysURL}
            target="_blank"
            rel="noopener noreferrer"
            id="enroll-checkout-button"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#C9A84C] text-[#0A0E1A] font-serif text-base sm:text-lg font-semibold tracking-wide hover:bg-[#d8b85c] active:scale-[0.99] transition-all duration-200 border border-[#C9A84C] shadow-lg cursor-pointer focus-visible:outline-none"
          >
            <span>{pricing.ctaText || 'Get the Keys'}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>

          <p className="font-mono text-xs text-[#F5F0E8]/70 mt-4">
            Direct secure checkout via CosmoEconomics Institutional Ledger · Wire & Card Accepted
          </p>
        </div>
      </div>
    </section>
  );
};
