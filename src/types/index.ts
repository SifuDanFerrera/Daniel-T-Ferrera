export interface SiteSettings {
  siteName: string;
  tagline: string;
  primaryCTA: string;
  ctaURL: string;
  contactEmail: string;
  disclaimer: string;
  updatedAt?: string;
}

export interface NavigationItem {
  id?: string;
  label: string;
  url: string;
  order: number;
  isVisible: boolean;
}

export interface HeroContent {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaURL: string;
  updatedAt?: string;
}

export interface MethodologyCard {
  id: string;
  title: string;
  body: string;
  order: number;
  iconType: 'cycle' | 'squaring' | 'keys' | 'timing';
}

export interface ChartEvidence {
  id: string;
  title: string;
  caption: string;
  annotationText: string;
  imageURL?: string;
  order: number;
  market: string;
  year: string;
}

export interface AboutContent {
  heading: string;
  body: string;
  credentials: string;
  bioURL?: string;
  portraitURL?: string;
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  order: number;
  isPublished: boolean;
}

export interface PricingConfig {
  heading: string;
  body: string;
  price: string;
  originalPrice?: string;
  discountPrice?: string;
  guarantee: string;
  includes: string[];
  ctaText: string;
  ctaURL: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
}

export interface LeadSubmission {
  id?: string;
  email: string;
  name?: string;
  submittedAt: string;
  source: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'pdf' | 'chart';
  size?: string;
  createdAt: string;
}

export interface WebsiteData {
  siteSettings: SiteSettings;
  navigation: NavigationItem[];
  hero: HeroContent;
  methodology: MethodologyCard[];
  charts: ChartEvidence[];
  about: AboutContent;
  curriculum: CurriculumModule[];
  testimonials: Testimonial[];
  pricing: PricingConfig;
  faqs: FAQItem[];
}
