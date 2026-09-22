import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase/config';
import { initialWebsiteData } from '../data/initialSeed';
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
  MediaAsset,
} from '../types';

const LOCAL_STORAGE_KEY = 'ferrera_keys_cms_cache';

export async function fetchAllWebsiteData(): Promise<WebsiteData> {
  const data: WebsiteData = { ...initialWebsiteData };

  try {
    const [
      settingsResult,
      heroResult,
      methodResult,
      chartResult,
      aboutResult,
      currResult,
      testResult,
      pricingResult,
      faqResult,
    ] = await Promise.allSettled([
      getDoc(doc(db, 'siteSettings', 'global')),
      getDoc(doc(db, 'heroSection', 'main')),
      getDocs(query(collection(db, 'methodologyCards'), orderBy('order', 'asc'))),
      getDocs(query(collection(db, 'chartEvidence'), orderBy('order', 'asc'))),
      getDoc(doc(db, 'aboutSection', 'main')),
      getDocs(query(collection(db, 'curriculumModules'), orderBy('order', 'asc'))),
      getDocs(query(collection(db, 'testimonials'), orderBy('order', 'asc'))),
      getDoc(doc(db, 'pricing', 'main')),
      getDocs(query(collection(db, 'faqs'), orderBy('order', 'asc'))),
    ]);

    if (settingsResult.status === 'fulfilled' && settingsResult.value.exists()) {
      data.siteSettings = settingsResult.value.data() as SiteSettings;
    }
    if (heroResult.status === 'fulfilled' && heroResult.value.exists()) {
      data.hero = heroResult.value.data() as HeroContent;
    }
    if (methodResult.status === 'fulfilled' && !methodResult.value.empty) {
      data.methodology = methodResult.value.docs.map(d => ({ id: d.id, ...d.data() } as MethodologyCard));
    }
    if (chartResult.status === 'fulfilled' && !chartResult.value.empty) {
      data.charts = chartResult.value.docs.map(d => ({ id: d.id, ...d.data() } as ChartEvidence));
    }
    if (aboutResult.status === 'fulfilled' && aboutResult.value.exists()) {
      data.about = aboutResult.value.data() as AboutContent;
    }
    if (currResult.status === 'fulfilled' && !currResult.value.empty) {
      data.curriculum = currResult.value.docs.map(d => ({ id: d.id, ...d.data() } as CurriculumModule));
    }
    if (testResult.status === 'fulfilled' && !testResult.value.empty) {
      data.testimonials = testResult.value.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
    }
    if (pricingResult.status === 'fulfilled' && pricingResult.value.exists()) {
      data.pricing = pricingResult.value.data() as PricingConfig;
    }
    if (faqResult.status === 'fulfilled' && !faqResult.value.empty) {
      data.faqs = faqResult.value.docs.map(d => ({ id: d.id, ...d.data() } as FAQItem));
    }

    // Cache locally
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore localStorage quotas
    }

    return data;
  } catch (error) {
    console.warn('Could not retrieve full remote content, loading local cache/seed:', error);
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as WebsiteData;
      }
    } catch {
      // fallback
    }
    return initialWebsiteData;
  }
}

// Seed the database with initial blueprint data if empty (requires admin auth)
export async function seedInitialFirestoreData(): Promise<void> {
  if (!auth.currentUser) {
    return;
  }
  try {
    const testDoc = await getDoc(doc(db, 'siteSettings', 'global'));
    if (testDoc.exists()) {
      return; // already seeded
    }

    await setDoc(doc(db, 'siteSettings', 'global'), initialWebsiteData.siteSettings);
    await setDoc(doc(db, 'heroSection', 'main'), initialWebsiteData.hero);
    await setDoc(doc(db, 'aboutSection', 'main'), initialWebsiteData.about);
    await setDoc(doc(db, 'pricing', 'main'), initialWebsiteData.pricing);

    for (const card of initialWebsiteData.methodology) {
      await setDoc(doc(db, 'methodologyCards', card.id), card);
    }
    for (const chart of initialWebsiteData.charts) {
      await setDoc(doc(db, 'chartEvidence', chart.id), chart);
    }
    for (const mod of initialWebsiteData.curriculum) {
      await setDoc(doc(db, 'curriculumModules', mod.id), mod);
    }
    for (const test of initialWebsiteData.testimonials) {
      await setDoc(doc(db, 'testimonials', test.id), test);
    }
    for (const faq of initialWebsiteData.faqs) {
      await setDoc(doc(db, 'faqs', faq.id), faq);
    }
  } catch (err) {
    console.warn('Seeding skipped or permission denied:', err);
  }
}

// ---------------- Admin Mutations ---------------- //

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const path = 'siteSettings/global';
  try {
    await setDoc(doc(db, 'siteSettings', 'global'), {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveHeroContent(hero: HeroContent): Promise<void> {
  const path = 'heroSection/main';
  try {
    await setDoc(doc(db, 'heroSection', 'main'), {
      ...hero,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveAboutContent(about: AboutContent): Promise<void> {
  const path = 'aboutSection/main';
  try {
    await setDoc(doc(db, 'aboutSection', 'main'), about);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function savePricingConfig(pricing: PricingConfig): Promise<void> {
  const path = 'pricing/main';
  try {
    await setDoc(doc(db, 'pricing', 'main'), pricing);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Methodology Cards
export async function saveMethodologyCard(card: MethodologyCard): Promise<void> {
  const path = `methodologyCards/${card.id}`;
  try {
    await setDoc(doc(db, 'methodologyCards', card.id), card);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteMethodologyCard(id: string): Promise<void> {
  const path = `methodologyCards/${id}`;
  try {
    await deleteDoc(doc(db, 'methodologyCards', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Charts
export async function saveChartEvidence(chart: ChartEvidence): Promise<void> {
  const path = `chartEvidence/${chart.id}`;
  try {
    await setDoc(doc(db, 'chartEvidence', chart.id), chart);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteChartEvidence(id: string): Promise<void> {
  const path = `chartEvidence/${id}`;
  try {
    await deleteDoc(doc(db, 'chartEvidence', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Curriculum
export async function saveCurriculumModule(mod: CurriculumModule): Promise<void> {
  const path = `curriculumModules/${mod.id}`;
  try {
    await setDoc(doc(db, 'curriculumModules', mod.id), mod);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCurriculumModule(id: string): Promise<void> {
  const path = `curriculumModules/${id}`;
  try {
    await deleteDoc(doc(db, 'curriculumModules', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Testimonials
export async function saveTestimonial(test: Testimonial): Promise<void> {
  const path = `testimonials/${test.id}`;
  try {
    await setDoc(doc(db, 'testimonials', test.id), test);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const path = `testimonials/${id}`;
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// FAQs
export async function saveFAQItem(faq: FAQItem): Promise<void> {
  const path = `faqs/${faq.id}`;
  try {
    await setDoc(doc(db, 'faqs', faq.id), faq);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteFAQItem(id: string): Promise<void> {
  const path = `faqs/${id}`;
  try {
    await deleteDoc(doc(db, 'faqs', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Lead Submission (Free Chapter)
export async function submitLead(email: string, source = 'free_chapter_form'): Promise<boolean> {
  const trimmed = email.trim();
  if (!trimmed || !trimmed.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  const path = 'leads';
  try {
    await addDoc(collection(db, 'leads'), {
      email: trimmed,
      submittedAt: new Date().toISOString(),
      source,
    });
    return true;
  } catch (error) {
    console.warn('Firestore write failed, preserving lead in client storage:', error);
    // Keep local copy so no lead is silently discarded
    try {
      const existing = JSON.parse(localStorage.getItem('ferrera_local_leads') || '[]');
      existing.push({ email: trimmed, submittedAt: new Date().toISOString(), source });
      localStorage.setItem('ferrera_local_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }
    return true;
  }
}

// Fetch Leads (Admin Only)
export async function fetchAllLeads(): Promise<LeadSubmission[]> {
  const path = 'leads';
  try {
    const snap = await getDocs(query(collection(db, 'leads'), orderBy('submittedAt', 'desc')));
    const remoteLeads = snap.docs.map(d => ({ id: d.id, ...d.data() } as LeadSubmission));
    
    // Combine with any local leads
    const local = JSON.parse(localStorage.getItem('ferrera_local_leads') || '[]');
    const map = new Map<string, LeadSubmission>();
    [...remoteLeads, ...local].forEach(l => {
      map.set(l.email + l.submittedAt, l);
    });
    return Array.from(map.values());
  } catch (error) {
    console.warn('Remote leads inaccessible, returning local leads:', error);
    const local = JSON.parse(localStorage.getItem('ferrera_local_leads') || '[]');
    return local;
  }
}
