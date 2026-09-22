import React, { useEffect } from 'react';
import { WebsiteData } from '../../types';

interface SeoStructuredDataProps {
  data: WebsiteData;
}

export const SeoStructuredData: React.FC<SeoStructuredDataProps> = ({ data }) => {
  useEffect(() => {
    // Generate the comprehensive Schema.org JSON-LD graph
    const publishedFaqs = (data.faqs || [])
      .filter((f) => f.isPublished)
      .sort((a, b) => a.order - b.order);

    const discountPriceClean = data.pricing?.discountPrice?.replace(/[^0-9.]/g, '') || '595.00';
    const regularPriceClean = data.pricing?.originalPrice?.replace(/[^0-9.]/g, '') || '2850.00';
    const currentPriceClean = data.pricing?.price?.replace(/[^0-9.]/g, '') || discountPriceClean;

    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        // 1. FAQPage Schema for Search Engines and LLMs (AEO / GEO / Search AI Overviews)
        {
          '@type': 'FAQPage',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#faq',
          'name': 'Frequently Asked Questions: Daniel Ferrera — Keys to Successful Speculation',
          'description': 'Direct answers to questions regarding Daniel Ferrera\'s proprietary ICE futures cycle methodology, course curriculum, prerequisites, and enrollment terms.',
          'mainEntity': publishedFaqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        },

        // 2. Course / Educational Program Schema
        {
          '@type': 'Course',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#course',
          'name': 'The Keys to Successful Speculation — Institutional Master Program',
          'alternateName': 'Daniel Ferrera ICE Futures Cycle Methodology',
          'description': data.hero?.subheading || 'Proprietary ICE futures trading methodology by Daniel Ferrera featuring cycle research, price-time squaring, and planetary geometry.',
          'provider': {
            '@type': 'Organization',
            '@id': 'https://www.cosmoeconomics.com/#organization',
            'name': 'CosmoEconomics',
            'url': 'https://www.cosmoeconomics.com',
          },
          'instructor': {
            '@type': 'Person',
            '@id': 'https://keys-to-speculation.cosmoeconomics.com/#author',
            'name': 'Daniel T. Ferrera',
            'jobTitle': 'Senior Financial Market Cycle Analyst & Author',
          },
          'hasCourseInstance': {
            '@type': 'CourseInstance',
            'courseMode': ['online', 'blended'],
            'courseWorkload': 'Self-paced comprehensive monograph curriculum with historical data verification spreadsheets and chart folios.',
          },
          'offers': {
            '@type': 'Offer',
            'price': currentPriceClean,
            'priceCurrency': 'USD',
            'priceValidUntil': '2027-12-31',
            'availability': 'https://schema.org/InStock',
            'url': data.pricing?.ctaURL || 'https://www.cosmoeconomics.com',
            'category': 'Financial Market Education',
            'description': `Current Discount Price: $${currentPriceClean} (Standard Institutional Fee: $${regularPriceClean}). One-time investment with 30-Day Systematic Verification Guarantee.`,
          },
        },

        // 3. Product Schema for E-Commerce & Merchant Search Snippets
        {
          '@type': 'Product',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#product',
          'name': 'The Keys to Successful Speculation by Daniel Ferrera',
          'image': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
          'description': 'The definitive treatise on Gann cycles, mathematical coordinate price-time squaring, and proprietary timing matrices for ICE futures contracts.',
          'brand': {
            '@type': 'Brand',
            'name': 'Daniel Ferrera / CosmoEconomics',
          },
          'offers': {
            '@type': 'Offer',
            'price': currentPriceClean,
            'priceCurrency': 'USD',
            'priceValidUntil': '2027-12-31',
            'availability': 'https://schema.org/InStock',
            'url': data.pricing?.ctaURL || 'https://www.cosmoeconomics.com',
            'seller': {
              '@type': 'Organization',
              'name': 'CosmoEconomics',
            },
          },
        },

        // 4. Author / Person Schema
        {
          '@type': 'Person',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#author',
          'name': 'Daniel T. Ferrera',
          'jobTitle': 'Market Forecaster, Gann Cycle Researcher, and Author',
          'worksFor': {
            '@type': 'Organization',
            'name': 'CosmoEconomics',
          },
          'knowsAbout': [
            'W.D. Gann Mathematical Methodology',
            'Intercontinental Exchange (ICE) Futures Contracts',
            'Price-Time Squaring and Geometric Angle Overlays',
            'Planetary Cycle Forecasting',
            'Quantitative Technical Analysis',
          ],
          'sameAs': [
            'https://www.cosmoeconomics.com',
            'https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php',
          ],
        },

        // 5. WebSite & Speakable Schema for Voice Assistants & AEO
        {
          '@type': 'WebSite',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#website',
          'name': 'Daniel Ferrera — Keys to Speculation',
          'url': typeof window !== 'undefined' ? window.location.origin : 'https://keys-to-speculation.cosmoeconomics.com',
          'description': 'Authoritative portal for Daniel Ferrera\'s Keys to Successful Speculation curriculum, research manuscripts, and mathematical trading models.',
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['#hero h1', '#hero p', '#faq h2', '#faq p', '#squaring-treatise h2', '#squaring-treatise h3'],
          },
        },

        // 6. Master Treatise Schema for AEO / GEO Research Citations
        {
          '@type': 'TechArticle',
          '@id': 'https://keys-to-speculation.cosmoeconomics.com/#squaring-treatise',
          'headline': 'The Missing Dimension: Squaring Price and Time in Modern Markets',
          'alternativeHeadline': 'Squaring Price with Time — For Square Heads, no pun intended',
          'author': {
            '@type': 'Person',
            'name': 'Daniel T. Ferrera',
            'url': 'https://www.cosmoeconomics.com/EZ/ice/ice/daniel-ferrera.php',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'CosmoEconomics',
            'url': 'https://www.cosmoeconomics.com',
          },
          'description': 'Daniel T. Ferrera\'s definitive monograph resolving the geometric scaling dilemma in modern financial charting, establishing true 1x1 slope vectors, Zero-Squares, 50% Epicenter X-crosses, Natural Squares, Root-2 and Phi orbital expansions, and KAMA wave mechanics.',
          'about': [
            'W.D. Gann Price-Time Squaring',
            '1954 Grains Scale of Prices Secret',
            '1x1 Axis Slope Calculation',
            'Square Root Increment Formula',
            'Kaufman Adaptive Moving Average Wave Filtering',
            'Richard Wyckoff Spring and UTAD Confluence',
          ],
        },
      ],
    };

    // Inject or update the dynamic JSON-LD tag in head
    const existingScript = document.getElementById('dynamic-seo-jsonld');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(schemaGraph);
    } else {
      const script = document.createElement('script');
      script.id = 'dynamic-seo-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaGraph);
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById('dynamic-seo-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
};
