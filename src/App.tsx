/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebsiteData } from './types';
import { initialWebsiteData } from './data/initialSeed';
import { fetchAllWebsiteData, seedInitialFirestoreData } from './services/contentService';

// Public Components
import { Navbar } from './components/public/Navbar';
import { GannGridOverlay } from './components/public/GannGridOverlay';
import { HeroScatterCanvas } from './components/public/HeroScatterCanvas';
import { PatternSection } from './components/public/PatternSection';
import { LockSection } from './components/public/LockSection';
import { SignalSection } from './components/public/SignalSection';
import { MethodologySection } from './components/public/MethodologySection';
import { ChartEvidenceSection } from './components/public/ChartEvidenceSection';
import { SquaringPriceTimeTreatise } from './components/public/SquaringPriceTimeTreatise';
import { AboutSection } from './components/public/AboutSection';
import { CurriculumSection } from './components/public/CurriculumSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { PricingSection } from './components/public/PricingSection';
import { LeadCaptureSection } from './components/public/LeadCaptureSection';
import { FAQSection } from './components/public/FAQSection';
import { FinalCTASection } from './components/public/FinalCTASection';
import { Footer } from './components/public/Footer';
import { SeoStructuredData } from './components/public/SeoStructuredData';

// Admin Components
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { isAdmin } = useAuth();
  const [data, setData] = useState<WebsiteData>(initialWebsiteData);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Load website data
  const loadData = async () => {
    try {
      const siteData = await fetchAllWebsiteData();
      setData(siteData);
      // Attempt background seed if initial
      seedInitialFirestoreData().catch(() => {});
    } catch (err) {
      console.warn('Using initial seed data:', err);
    }
  };

  useEffect(() => {
    loadData();

    // Check if initial hash is #admin
    if (window.location.hash === '#admin') {
      if (isAdmin) {
        setIsAdminView(true);
      } else {
        setShowAdminModal(true);
      }
    }

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        if (isAdmin) {
          setIsAdminView(true);
        } else {
          setShowAdminModal(true);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdmin]);

  const handleOpenAdmin = () => {
    if (isAdmin) {
      setIsAdminView(true);
      window.location.hash = '#admin';
    } else {
      setShowAdminModal(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminModal(false);
    setIsAdminView(true);
    window.location.hash = '#admin';
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    window.location.hash = '';
  };

  // If viewing admin dashboard
  if (isAdminView && isAdmin) {
    return (
      <AdminDashboard
        data={data}
        onRefreshData={loadData}
        onExit={handleExitAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F5F0E8] paper-grain selection:bg-[#C9A84C]/30 selection:text-[#F5F0E8] relative">
      {/* Schema.org Structured Data for SEO, AEO, and GEO optimization */}
      <SeoStructuredData data={data} />

      {/* Asset B2: Gann Grid Background Pattern */}
      <GannGridOverlay />

      {/* Main Top Navigation */}
      <Navbar
        settings={data.siteSettings}
        navigation={data.navigation}
        onOpenAdmin={handleOpenAdmin}
      />

      <main>
        {/* Scene 1: Asset B1 Hero Scatter Canvas & Value Proposition */}
        <HeroScatterCanvas hero={data.hero} />

        {/* Scene 2: Asset B3 The Pattern Section & Geometric Cycle Arcs */}
        <PatternSection />

        {/* Scene 3: Asset B4 The Lock Section & 5-Tumbler Mechanism */}
        <LockSection />

        {/* Scene 4: Asset B5 The Signal Section & Precision Price Curve */}
        <SignalSection />

        {/* 4-Pillar Methodology Architecture Bento Grid */}
        <MethodologySection cards={data.methodology} />

        {/* Chart Evidence Gallery with Archival Zoom Inspection */}
        <ChartEvidenceSection charts={data.charts} />

        {/* Master Treatise: The Missing Dimension — Squaring Price and Time in Modern Markets */}
        <SquaringPriceTimeTreatise />

        {/* Scene 5 & Asset B8: About Daniel Ferrera & CosmoEconomics Lineage */}
        <AboutSection about={data.about} />

        {/* Curriculum Timeline Accordion & Deliverables */}
        <CurriculumSection modules={data.curriculum} />

        {/* Practitioner Verification Testimonials */}
        <TestimonialsSection testimonials={data.testimonials} />

        {/* Pricing, Master Offering & 30-Day Systematic Guarantee */}
        <PricingSection pricing={data.pricing} />

        {/* Complimentary Monograph / Free Chapter Lead Capture */}
        <LeadCaptureSection />

        {/* Frequently Asked Questions */}
        <FAQSection faqs={data.faqs} />

        {/* Final CTA with Asset B7 Interactive Rotating Key */}
        <FinalCTASection />
      </main>

      {/* Footer with Legal Notices, Regulatory Modal & CMS Gateway */}
      <Footer settings={data.siteSettings} onOpenAdmin={handleOpenAdmin} />

      {/* Administrator Authentication Modal */}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
