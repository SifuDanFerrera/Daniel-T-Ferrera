import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { Key, ShieldAlert, X, ExternalLink } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const [showCFTC, setShowCFTC] = useState(false);

  return (
    <footer className="relative bg-[#060a14] border-t border-[#C9A84C]/20 py-16 px-6 text-xs text-[#F5F0E8]/60 font-serif">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Copyright & Publisher Attribution */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="font-serif text-sm text-[#F5F0E8] font-medium tracking-wide">
            © {new Date().getFullYear()} Daniel Ferrera · Keys to Speculation
          </div>
          <div className="font-mono text-[11px] text-[#C9A84C]">
            CosmoEconomics Research Series · Sacred Science Institute Fellow
          </div>
          <a
            href="https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1 mt-0.5"
            id="footer-author-bio-link"
          >
            <span>Daniel Ferrera Official Bio & Catalog</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#C9A84C]" />
          </a>
        </div>

        {/* Center: Legal & Regulatory Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
          <a
            href="https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C9A84C] transition-colors underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
          >
            <span>Author Bio</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#C9A84C]" />
          </a>
          <span>·</span>
          <button
            onClick={() => setShowCFTC(true)}
            className="hover:text-[#C9A84C] transition-colors underline underline-offset-4 cursor-pointer"
          >
            CFTC / FTC Disclaimer
          </button>
          <span>·</span>
          <button
            onClick={() => alert('CosmoEconomics Privacy Policy: We do not distribute, sell, or rent private scholar contact records or identity metrics to third-party ad networks.')}
            className="hover:text-[#C9A84C] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            onClick={() => alert('Terms of Research Access: All course treatises and calculation keys remain the intellectual property of Daniel Ferrera. Reproduction without license is strictly prohibited.')}
            className="hover:text-[#C9A84C] transition-colors underline underline-offset-4 cursor-pointer"
          >
            Terms of Access
          </button>
          <span>·</span>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="hover:text-[#C9A84C] transition-colors"
          >
            {settings.contactEmail}
          </a>
        </div>

        {/* Right: CMS Portal Access */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-mono text-xs tracking-wider transition-all"
            title="Administrator Content Management System"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Mandatory CFTC Regulatory Notice Modal */}
      {showCFTC && (
        <div className="fixed inset-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full border border-[#C9A84C] bg-[#0c1220] p-8 shadow-2xl text-left">
            <button
              onClick={() => setShowCFTC(false)}
              className="absolute top-4 right-4 text-[#F5F0E8]/60 hover:text-[#C9A84C] p-2"
              aria-label="Close Disclaimer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-[#C9A84C] font-mono text-xs uppercase tracking-widest mb-4">
              <ShieldAlert className="w-4 h-4" />
              <span>CFTC Commodity Futures Risk Disclosure</span>
            </div>

            <h3 className="text-xl font-serif text-[#F5F0E8] mb-4">
              Regulatory Risk Warning & Theoretical Performance Notice
            </h3>

            <div className="text-xs font-mono text-[#F5F0E8]/70 space-y-3 leading-relaxed border-t border-[#C9A84C]/20 pt-4 max-h-80 overflow-y-auto pr-2">
              <p>
                {settings.disclaimer}
              </p>
              <p>
                CFTC RULE 4.41: HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN INHERENT LIMITATIONS.
                UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE
                THE TRADES HAVE NOT ACTUALLY BEEN EXECUTED, THE RESULTS MAY HAVE UNDER- OR OVER-COMPENSATED FOR THE
                IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY.
              </p>
              <p>
                NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFITS OR LOSSES
                SIMILAR TO THOSE SHOWN. THE KEYS TO SPECULATION IS AN EDUCATIONAL AND HISTORICAL RESEARCH PROGRAM.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C9A84C]/20 flex justify-end">
              <button
                onClick={() => setShowCFTC(false)}
                className="px-5 py-2 bg-[#C9A84C] text-[#0A0E1A] font-serif text-xs font-semibold uppercase tracking-wider"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
