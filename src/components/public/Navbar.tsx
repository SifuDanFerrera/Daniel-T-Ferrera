import React, { useState, useEffect } from 'react';
import { Menu, X, Key, ShieldCheck } from 'lucide-react';
import { NavigationItem, SiteSettings } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  settings: SiteSettings;
  navigation: NavigationItem[];
  onOpenAdmin: () => void;
}

const DEFAULT_KEYS_URL =
  'https://www.cosmoeconomics.com/EZ/ice/ice/ice-book-the-keys-to-successful-speculation.php?item=297';

export const Navbar: React.FC<NavbarProps> = ({ settings, navigation, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Accessible Skip to Content Link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A84C] focus:text-[#0A0E1A] focus:font-serif focus:font-semibold focus:shadow-xl focus:border focus:border-[#C9A84C]"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0E1A]/95 backdrop-blur-md border-b border-[#C9A84C]/20 py-3 shadow-lg'
            : 'bg-[#0A0E1A]/60 backdrop-blur-sm sm:bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group focus-visible:outline-none">
            <div className="w-8 h-8 rounded border border-[#C9A84C]/60 flex items-center justify-center bg-[#0A0E1A]">
              <Key className="w-4 h-4 text-[#C9A84C] transform group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-base sm:text-lg tracking-wider text-[#F5F0E8] font-medium leading-none">
                DANIEL FERRERA
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A84C] mt-1">
                Keys to Speculation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navigation
              .filter((item) => item.isVisible)
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  className="font-serif text-sm text-[#F5F0E8]/90 hover:text-[#C9A84C] tracking-wide transition-colors relative py-1 focus-visible:outline-none"
                >
                  {item.label}
                </a>
              ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {/* Discreet Admin Link */}
            <button
              onClick={onOpenAdmin}
              title={isAdmin ? 'Open CMS Dashboard' : 'Administrator Portal'}
              aria-label={isAdmin ? 'Open CMS Dashboard' : 'Administrator Portal'}
              className="p-2 text-[#C9A84C] hover:bg-[#C9A84C]/10 border border-transparent hover:border-[#C9A84C]/40 transition-all text-xs font-mono flex items-center gap-1.5 focus-visible:outline-none"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C9A84C]" aria-hidden="true" />
                  <span className="text-[11px] font-medium">CMS</span>
                </>
              ) : (
                <Key className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>

            {/* Primary CTA */}
            <a
              href={settings.ctaURL && !settings.ctaURL.startsWith('#') ? settings.ctaURL : DEFAULT_KEYS_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-primary-cta"
              className="px-5 py-2.5 bg-[#C9A84C] text-[#0A0E1A] font-serif text-xs font-semibold uppercase tracking-wider hover:bg-[#d8b85c] active:scale-[0.99] transition-all border border-[#C9A84C] focus-visible:outline-none"
            >
              {settings.primaryCTA || 'Get the Keys'}
            </a>
          </div>

          {/* Mobile Hamburger Toggle & Admin Key */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#C9A84C] text-xs font-mono min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Administrator Login"
            >
              <Key className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F0E8] hover:text-[#C9A84C] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#C9A84C]" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-[#C9A84C]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden bg-[#0A0E1A] border-b border-[#C9A84C]/30 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navigation
                .filter((item) => item.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-base text-[#F5F0E8] hover:text-[#C9A84C] py-2.5 border-b border-[#F5F0E8]/10"
                  >
                    {item.label}
                  </a>
                ))}
              <div className="pt-3 flex flex-col gap-3">
                <a
                  href={settings.ctaURL && !settings.ctaURL.startsWith('#') ? settings.ctaURL : DEFAULT_KEYS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-[#C9A84C] text-[#0A0E1A] font-serif text-sm font-semibold tracking-wider uppercase border border-[#C9A84C]"
                >
                  {settings.primaryCTA || 'Get the Keys'}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-center py-2.5 border border-[#C9A84C]/40 text-[#C9A84C] font-mono text-xs uppercase"
                >
                  {isAdmin ? 'Open CMS Dashboard' : 'Administrator Portal'}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
