import React, { useState, useEffect } from 'react';
import {
  WebsiteData,
  SiteSettings,
  HeroContent,
  MethodologyCard,
  ChartEvidence,
  AboutContent,
  CurriculumModule,
  Testimonial,
  PricingConfig,
  FAQItem,
  LeadSubmission,
} from '../../types';
import {
  saveSiteSettings,
  saveHeroContent,
  saveMethodologyCard,
  deleteMethodologyCard,
  saveChartEvidence,
  deleteChartEvidence,
  saveAboutContent,
  saveCurriculumModule,
  deleteCurriculumModule,
  savePricingConfig,
  saveTestimonial,
  deleteTestimonial,
  saveFAQItem,
  deleteFAQItem,
  fetchAllLeads,
} from '../../services/contentService';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  Layers,
  LineChart,
  User,
  GraduationCap,
  Tag,
  MessageSquareQuote,
  HelpCircle,
  Users,
  LogOut,
  ExternalLink,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Download,
  Globe,
} from 'lucide-react';
import { IndexingManager } from './IndexingManager';

interface AdminDashboardProps {
  data: WebsiteData;
  onRefreshData: () => Promise<void>;
  onExit: () => void;
}

type TabType =
  | 'overview'
  | 'settings'
  | 'hero'
  | 'methodology'
  | 'charts'
  | 'about'
  | 'curriculum'
  | 'pricing'
  | 'testimonials'
  | 'faqs'
  | 'indexing';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onRefreshData, onExit }) => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Editable form states initialized from current website data
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({ ...data.siteSettings });
  const [hero, setHero] = useState<HeroContent>({ ...data.hero });
  const [about, setAbout] = useState<AboutContent>({ ...data.about });
  const [pricing, setPricing] = useState<PricingConfig>({ ...data.pricing });
  const [methodology, setMethodology] = useState<MethodologyCard[]>([...data.methodology]);
  const [charts, setCharts] = useState<ChartEvidence[]>([...data.charts]);
  const [curriculum, setCurriculum] = useState<CurriculumModule[]>([...data.curriculum]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([...data.testimonials]);
  const [faqs, setFaqs] = useState<FAQItem[]>([...data.faqs]);

  // Load leads on mount
  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const fetched = await fetchAllLeads();
        setLeads(fetched);
      } catch (err) {
        console.error('Failed to load leads:', err);
      }
    };
    fetchLeadsData();
  }, []);

  const triggerSaveNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Save Handlers
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await saveSiteSettings(siteSettings);
      await onRefreshData();
      triggerSaveNotification('Site settings updated in Firestore successfully.');
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHero = async () => {
    setIsSaving(true);
    try {
      await saveHeroContent(hero);
      await onRefreshData();
      triggerSaveNotification('Hero section updated successfully.');
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    setIsSaving(true);
    try {
      await saveAboutContent(about);
      await onRefreshData();
      triggerSaveNotification('About section updated successfully.');
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePricing = async () => {
    setIsSaving(true);
    try {
      await savePricingConfig(pricing);
      await onRefreshData();
      triggerSaveNotification('Pricing and guarantee updated successfully.');
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Methodology Handlers
  const handleUpdateMethodology = async (card: MethodologyCard) => {
    setIsSaving(true);
    try {
      await saveMethodologyCard(card);
      await onRefreshData();
      triggerSaveNotification(`Methodology card "${card.title}" saved.`);
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMethodology = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pillar?')) return;
    try {
      await deleteMethodologyCard(id);
      setMethodology((prev) => prev.filter((m) => m.id !== id));
      await onRefreshData();
      triggerSaveNotification('Methodology card deleted.');
    } catch (err: unknown) {
      alert(`Delete error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddMethodology = () => {
    const newCard: MethodologyCard = {
      id: `m-${Date.now()}`,
      title: 'New Methodological Pillar',
      body: 'Description of the proprietary cycle calculation or key calibration.',
      order: methodology.length + 1,
      iconType: 'cycle',
    };
    setMethodology((prev) => [...prev, newCard]);
  };

  // Charts Handlers
  const handleUpdateChart = async (chart: ChartEvidence) => {
    setIsSaving(true);
    try {
      await saveChartEvidence(chart);
      await onRefreshData();
      triggerSaveNotification(`Chart "${chart.title}" saved.`);
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteChart = async (id: string) => {
    if (!confirm('Delete this chart folio?')) return;
    try {
      await deleteChartEvidence(id);
      setCharts((prev) => prev.filter((c) => c.id !== id));
      await onRefreshData();
      triggerSaveNotification('Chart folio deleted.');
    } catch (err: unknown) {
      alert(`Delete error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddChart = () => {
    const newChart: ChartEvidence = {
      id: `c-${Date.now()}`,
      title: 'ICE Commodity Reversal Analysis',
      caption: 'Squaring analysis of prompt contract.',
      annotationText: 'Harmonic angle entry verified at day 180.',
      order: charts.length + 1,
      market: 'ICE Cotton',
      year: 'Historical Folio',
    };
    setCharts((prev) => [...prev, newChart]);
  };

  // Curriculum Handlers
  const handleUpdateCurriculum = async (mod: CurriculumModule) => {
    setIsSaving(true);
    try {
      await saveCurriculumModule(mod);
      await onRefreshData();
      triggerSaveNotification(`Module "${mod.title}" saved.`);
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCurriculum = async (id: string) => {
    if (!confirm('Delete this curriculum module?')) return;
    try {
      await deleteCurriculumModule(id);
      setCurriculum((prev) => prev.filter((c) => c.id !== id));
      await onRefreshData();
      triggerSaveNotification('Curriculum module deleted.');
    } catch (err: unknown) {
      alert(`Delete error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddCurriculum = () => {
    const newMod: CurriculumModule = {
      id: `mod-${Date.now()}`,
      moduleNumber: curriculum.length + 1,
      title: 'New Advanced Research Module',
      description: 'Module core concepts and execution proofs.',
      order: curriculum.length + 1,
    };
    setCurriculum((prev) => [...prev, newMod]);
  };

  // Testimonials Handlers
  const handleUpdateTestimonial = async (test: Testimonial) => {
    setIsSaving(true);
    try {
      await saveTestimonial(test);
      await onRefreshData();
      triggerSaveNotification(`Testimonial by ${test.author} saved.`);
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      await onRefreshData();
      triggerSaveNotification('Testimonial deleted.');
    } catch (err: unknown) {
      alert(`Delete error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddTestimonial = () => {
    const newTest: Testimonial = {
      id: `t-${Date.now()}`,
      quote: 'Reflections on the predictive accuracy of the price-time squaring method.',
      author: 'Trader Name',
      title: 'Futures Analyst / CTA',
      order: testimonials.length + 1,
      isPublished: true,
    };
    setTestimonials((prev) => [...prev, newTest]);
  };

  // FAQ Handlers
  const handleUpdateFAQ = async (faq: FAQItem) => {
    setIsSaving(true);
    try {
      await saveFAQItem(faq);
      await onRefreshData();
      triggerSaveNotification('FAQ saved.');
    } catch (err: unknown) {
      alert(`Save error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFAQItem(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      await onRefreshData();
      triggerSaveNotification('FAQ deleted.');
    } catch (err: unknown) {
      alert(`Delete error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleAddFAQ = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: 'New question regarding the methodology?',
      answer: 'Detailed explanation for the prospective scholar.',
      order: faqs.length + 1,
      isPublished: true,
    };
    setFaqs((prev) => [...prev, newFaq]);
  };

  // Export leads to CSV
  const handleExportLeadsCSV = () => {
    if (!leads.length) {
      alert('No leads recorded yet.');
      return;
    }
    const headers = 'Email,SubmittedAt,Source\n';
    const rows = leads.map((l) => `"${l.email}","${l.submittedAt}","${l.source}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ferrera-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-[#F5F0E8] font-serif flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0A0E1A] border-b border-[#C9A84C]/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded border border-[#C9A84C] flex items-center justify-center bg-[#060a14]">
            <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-medium text-[#F5F0E8]">
              Daniel Ferrera CMS & Control Terminal
            </h1>
            <span className="font-mono text-[10px] text-[#C9A84C] uppercase tracking-wider">
              Firestore Cloud Connected · {user?.email || 'Master Administrator'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus && (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 border border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{saveStatus}</span>
            </div>
          )}

          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 text-[#C9A84C] font-mono text-xs uppercase tracking-wider transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-[#F5F0E8]/60 hover:text-rose-400 font-mono text-xs transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#080d19] border-r border-[#C9A84C]/15 p-4 flex flex-col gap-1 shrink-0">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C]/60 px-3 py-2">
            CMS Modules
          </span>

          {[
            { id: 'overview', label: 'Overview & Leads', icon: Users, badge: leads.length },
            { id: 'settings', label: 'Site Settings', icon: Settings },
            { id: 'hero', label: 'Hero & Headlines', icon: Sliders },
            { id: 'methodology', label: 'Methodology Pillars', icon: Layers },
            { id: 'charts', label: 'Chart Evidence Folios', icon: LineChart },
            { id: 'about', label: 'About & Lineage', icon: User },
            { id: 'curriculum', label: 'Curriculum Modules', icon: GraduationCap },
            { id: 'pricing', label: 'Pricing & Guarantee', icon: Tag },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
            { id: 'faqs', label: 'FAQs Accordion', icon: HelpCircle },
            { id: 'indexing', label: 'Search & IndexNow', icon: Globe },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono tracking-wide transition-all text-left ${
                  active
                    ? 'bg-[#C9A84C] text-[#0A0E1A] font-semibold'
                    : 'text-[#F5F0E8]/75 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                      active ? 'bg-[#0A0E1A] text-[#C9A84C]' : 'bg-[#C9A84C]/20 text-[#C9A84C]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl">
          {/* TAB 1: OVERVIEW & LEADS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#C9A84C]/20 pb-4">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">
                    Prospect Activity & Leads Ledger
                  </h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Free chapter downloads and enrollment inquiries captured in persistent Firestore storage.
                  </p>
                </div>
                <button
                  onClick={handleExportLeadsCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border border-[#C9A84C]/25 bg-[#0A0E1A] p-6">
                  <span className="font-mono text-[10px] uppercase text-[#C9A84C] tracking-widest block mb-1">
                    Total Leads Captured
                  </span>
                  <div className="text-3xl font-serif text-[#F5F0E8] font-medium">
                    {leads.length}
                  </div>
                </div>
                <div className="border border-[#C9A84C]/25 bg-[#0A0E1A] p-6">
                  <span className="font-mono text-[10px] uppercase text-[#C9A84C] tracking-widest block mb-1">
                    System Security Mode
                  </span>
                  <div className="text-base font-mono text-emerald-400 mt-2">
                    ✓ Firestore Hardened Rules
                  </div>
                </div>
                <div className="border border-[#C9A84C]/25 bg-[#0A0E1A] p-6">
                  <span className="font-mono text-[10px] uppercase text-[#C9A84C] tracking-widest block mb-1">
                    Active Offering
                  </span>
                  <div className="text-xl font-serif text-[#C9A84C] mt-1">
                    {pricing.price} Master License
                  </div>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-[#C9A84C]/20 bg-[#0A0E1A] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#C9A84C]/15 flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#F5F0E8]">
                    Recorded Submissions
                  </h3>
                  <span className="font-mono text-xs text-[#C9A84C]">
                    Showing {leads.length} Records
                  </span>
                </div>

                {leads.length === 0 ? (
                  <div className="p-8 text-center text-sm font-serif text-[#F5F0E8]/50">
                    No leads registered yet. Form submissions on the free chapter section will record here.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#0e1627] text-[#C9A84C] border-b border-[#C9A84C]/20">
                        <tr>
                          <th className="px-6 py-3">Email Address</th>
                          <th className="px-6 py-3">Timestamp</th>
                          <th className="px-6 py-3">Source Channel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#C9A84C]/10 text-[#F5F0E8]/80">
                        {leads.map((lead, i) => (
                          <tr key={i} className="hover:bg-[#C9A84C]/5">
                            <td className="px-6 py-3 text-[#F5F0E8] font-medium">{lead.email}</td>
                            <td className="px-6 py-3 text-[#F5F0E8]/60">
                              {new Date(lead.submittedAt).toLocaleString()}
                            </td>
                            <td className="px-6 py-3 text-[#C9A84C]">{lead.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Site Settings</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Global identity, contact channels, and legal compliance disclaimers.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      Primary CTA Label
                    </label>
                    <input
                      type="text"
                      value={siteSettings.primaryCTA}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryCTA: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      Primary CTA Target URL
                    </label>
                    <input
                      type="text"
                      value={siteSettings.ctaURL}
                      onChange={(e) => setSiteSettings({ ...siteSettings, ctaURL: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Inquiry Contact Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    CFTC / Regulatory Disclaimer Text
                  </label>
                  <textarea
                    rows={4}
                    value={siteSettings.disclaimer}
                    onChange={(e) => setSiteSettings({ ...siteSettings, disclaimer: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Hero Section</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Control primary hero headline, philosophical subtitle, and entrance CTA.
                  </p>
                </div>
                <button
                  onClick={handleSaveHero}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Hero'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    H1 Headline
                  </label>
                  <input
                    type="text"
                    value={hero.heading}
                    onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Subheading / Axiom
                  </label>
                  <input
                    type="text"
                    value={hero.subheading}
                    onChange={(e) => setHero({ ...hero, subheading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={hero.ctaText}
                      onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      CTA Anchor Target
                    </label>
                    <input
                      type="text"
                      value={hero.ctaURL}
                      onChange={(e) => setHero({ ...hero, ctaURL: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: METHODOLOGY PILLARS */}
          {activeTab === 'methodology' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Methodology Pillars</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Manage the 4 core architectural bento cards.
                  </p>
                </div>
                <button
                  onClick={handleAddMethodology}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Pillar</span>
                </button>
              </div>

              <div className="space-y-4">
                {methodology.map((card, idx) => (
                  <div key={card.id} className="border border-[#C9A84C]/30 bg-[#0A0E1A] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2">
                      <span className="font-mono text-xs text-[#C9A84C]">Pillar 0{idx + 1}</span>
                      <button
                        onClick={() => handleDeleteMethodology(card.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Pillar Title
                        </label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => {
                            const updated = { ...card, title: e.target.value };
                            setMethodology((prev) => prev.map((m) => (m.id === card.id ? updated : m)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Icon Symbol Type
                        </label>
                        <select
                          value={card.iconType}
                          onChange={(e) => {
                            const updated = { ...card, iconType: e.target.value as any };
                            setMethodology((prev) => prev.map((m) => (m.id === card.id ? updated : m)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-mono text-xs"
                        >
                          <option value="cycle">Cycle Wave</option>
                          <option value="squaring">Squaring Angle</option>
                          <option value="keys">Key Matrix</option>
                          <option value="timing">Equilibrium Triangle</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Pillar Description
                      </label>
                      <textarea
                        rows={2}
                        value={card.body}
                        onChange={(e) => {
                          const updated = { ...card, body: e.target.value };
                          setMethodology((prev) => prev.map((m) => (m.id === card.id ? updated : m)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateMethodology(card)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update Pillar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHART EVIDENCE */}
          {activeTab === 'charts' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Chart Evidence Folios</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Manage historical applications of the Keys and squaring annotations.
                  </p>
                </div>
                <button
                  onClick={handleAddChart}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Folio</span>
                </button>
              </div>

              <div className="space-y-4">
                {charts.map((chart) => (
                  <div key={chart.id} className="border border-[#C9A84C]/30 bg-[#0A0E1A] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2">
                      <span className="font-mono text-xs text-[#C9A84C]">{chart.market}</span>
                      <button
                        onClick={() => handleDeleteChart(chart.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Folio Title
                        </label>
                        <input
                          type="text"
                          value={chart.title}
                          onChange={(e) => {
                            const updated = { ...chart, title: e.target.value };
                            setCharts((prev) => prev.map((c) => (c.id === chart.id ? updated : c)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Market / Ticker
                        </label>
                        <input
                          type="text"
                          value={chart.market}
                          onChange={(e) => {
                            const updated = { ...chart, market: e.target.value };
                            setCharts((prev) => prev.map((c) => (c.id === chart.id ? updated : c)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Year / Era
                        </label>
                        <input
                          type="text"
                          value={chart.year}
                          onChange={(e) => {
                            const updated = { ...chart, year: e.target.value };
                            setCharts((prev) => prev.map((c) => (c.id === chart.id ? updated : c)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Caption & Analysis
                      </label>
                      <textarea
                        rows={2}
                        value={chart.caption}
                        onChange={(e) => {
                          const updated = { ...chart, caption: e.target.value };
                          setCharts((prev) => prev.map((c) => (c.id === chart.id ? updated : c)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Technical Annotation Text
                      </label>
                      <input
                        type="text"
                        value={chart.annotationText}
                        onChange={(e) => {
                          const updated = { ...chart, annotationText: e.target.value };
                          setCharts((prev) => prev.map((c) => (c.id === chart.id ? updated : c)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-mono text-xs"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateChart(chart)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update Folio</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ABOUT SECTION */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">About Daniel Ferrera</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Editorial biography, CosmoEconomics fellowship, and published works.
                  </p>
                </div>
                <button
                  onClick={handleSaveAbout}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save About'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={about.heading}
                    onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Biographical Narrative
                  </label>
                  <textarea
                    rows={6}
                    value={about.body}
                    onChange={(e) => setAbout({ ...about, body: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm leading-relaxed focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Author Credentials & Fellowships
                  </label>
                  <textarea
                    rows={3}
                    value={about.credentials}
                    onChange={(e) => setAbout({ ...about, credentials: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Official Author Biography & Publications URL (CosmoEconomics)
                  </label>
                  <input
                    type="url"
                    value={about.bioURL || ''}
                    placeholder="https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php"
                    onChange={(e) => setAbout({ ...about, bioURL: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-mono text-xs focus:outline-none focus:border-[#C9A84C]"
                  />
                  <p className="text-[11px] font-mono text-[#F5F0E8]/50 mt-1">
                    Links to Daniel Ferrera's author profile and complete bibliography on CosmoEconomics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Curriculum Modules</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Manage the 5 core course syllabus modules.
                  </p>
                </div>
                <button
                  onClick={handleAddCurriculum}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Module</span>
                </button>
              </div>

              <div className="space-y-4">
                {curriculum.map((mod, idx) => (
                  <div key={mod.id} className="border border-[#C9A84C]/30 bg-[#0A0E1A] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2">
                      <span className="font-mono text-xs text-[#C9A84C]">Module 0{mod.moduleNumber || idx + 1}</span>
                      <button
                        onClick={() => handleDeleteCurriculum(mod.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Module Title
                      </label>
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) => {
                          const updated = { ...mod, title: e.target.value };
                          setCurriculum((prev) => prev.map((m) => (m.id === mod.id ? updated : m)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Description & Key Proofs
                      </label>
                      <textarea
                        rows={2}
                        value={mod.description}
                        onChange={(e) => {
                          const updated = { ...mod, description: e.target.value };
                          setCurriculum((prev) => prev.map((m) => (m.id === mod.id ? updated : m)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateCurriculum(mod)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update Module</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PRICING & GUARANTEE */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Pricing & Guarantee</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Edit master license fee, guarantee terms, and package deliverables.
                  </p>
                </div>
                <button
                  onClick={handleSavePricing}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Pricing'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={pricing.heading}
                      onChange={(e) => setPricing({ ...pricing, heading: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      Current Discount Price
                    </label>
                    <input
                      type="text"
                      value={pricing.discountPrice || pricing.price}
                      onChange={(e) =>
                        setPricing({
                          ...pricing,
                          discountPrice: e.target.value,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif"
                      placeholder="$595.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                      Regular / Original Price
                    </label>
                    <input
                      type="text"
                      value={pricing.originalPrice || '$2,850'}
                      onChange={(e) => setPricing({ ...pricing, originalPrice: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif"
                      placeholder="$2,850"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Methodology Framing Copy
                  </label>
                  <textarea
                    rows={2}
                    value={pricing.body}
                    onChange={(e) => setPricing({ ...pricing, body: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    30-Day Guarantee Description
                  </label>
                  <textarea
                    rows={3}
                    value={pricing.guarantee}
                    onChange={(e) => setPricing({ ...pricing, guarantee: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={5}
                    value={pricing.includes.join('\n')}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        includes: e.target.value.split('\n').filter((l) => l.trim()),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#0A0E1A] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Trader Testimonials</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Manage practitioner verification reviews and publication toggles.
                  </p>
                </div>
                <button
                  onClick={handleAddTestimonial}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Quote</span>
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="border border-[#C9A84C]/30 bg-[#0A0E1A] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2">
                      <span className="font-mono text-xs text-[#C9A84C]">{test.author}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
                          <input
                            type="checkbox"
                            checked={test.isPublished}
                            onChange={(e) => {
                              const updated = { ...test, isPublished: e.target.checked };
                              setTestimonials((prev) => prev.map((t) => (t.id === test.id ? updated : t)));
                            }}
                          />
                          <span>Published</span>
                        </label>
                        <button
                          onClick={() => handleDeleteTestimonial(test.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={test.author}
                          onChange={(e) => {
                            const updated = { ...test, author: e.target.value };
                            setTestimonials((prev) => prev.map((t) => (t.id === test.id ? updated : t)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                          Professional Title / City
                        </label>
                        <input
                          type="text"
                          value={test.title}
                          onChange={(e) => {
                            const updated = { ...test, title: e.target.value };
                            setTestimonials((prev) => prev.map((t) => (t.id === test.id ? updated : t)));
                          }}
                          className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Quote Body
                      </label>
                      <textarea
                        rows={2}
                        value={test.quote}
                        onChange={(e) => {
                          const updated = { ...test, quote: e.target.value };
                          setTestimonials((prev) => prev.map((t) => (t.id === test.id ? updated : t)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm italic"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateTestimonial(test)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update Quote</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#C9A84C]/20 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-[#F5F0E8]">Frequently Asked Questions</h2>
                  <p className="text-sm font-serif text-[#F5F0E8]/60 mt-1">
                    Manage accordion questions, syllabus clarifications, and answers.
                  </p>
                </div>
                <button
                  onClick={handleAddFAQ}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs uppercase tracking-wider hover:bg-[#d8b85c] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-[#C9A84C]/30 bg-[#0A0E1A] p-6 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#C9A84C]/15 pb-2">
                      <span className="font-mono text-xs text-[#C9A84C]">{faq.question}</span>
                      <button
                        onClick={() => handleDeleteFAQ(faq.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = { ...faq, question: e.target.value };
                          setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updated : f)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#C9A84C]/80 mb-1">
                        Answer
                      </label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = { ...faq, answer: e.target.value };
                          setFaqs((prev) => prev.map((f) => (f.id === faq.id ? updated : f)));
                        }}
                        className="w-full px-3 py-2 bg-[#060a14] border border-[#C9A84C]/30 text-[#F5F0E8] font-serif text-sm"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateFAQ(faq)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update FAQ</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'indexing' && (
            <div className="space-y-6">
              <IndexingManager />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
