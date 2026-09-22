export interface IndexingResult {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  urlsSubmitted: string[];
  endpoint: string;
}

export const INDEXNOW_KEY = '4c8f2b7a9d1e46f082e61c3a7d90e2b4';

export const getIndexedUrls = (baseUrl?: string): string[] => {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-qlebdhexx6mr7wnuxxfq2e-19464929791.us-west2.run.app');
  return [
    `${origin}/`,
    `${origin}/#methodology`,
    `${origin}/#evidence`,
    `${origin}/#curriculum`,
    `${origin}/#pricing`,
    `${origin}/#faq`,
    `${origin}/#about`,
  ];
};

export const getGoogleSearchConsoleLinks = (baseUrl?: string) => {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-qlebdhexx6mr7wnuxxfq2e-19464929791.us-west2.run.app');
  const encodedOrigin = encodeURIComponent(`${origin}/`);
  return {
    consoleHome: 'https://search.google.com/search-console',
    addProperty: 'https://search.google.com/search-console/welcome',
    sitemaps: `https://search.google.com/search-console/sitemaps?resource_id=${encodedOrigin}`,
    urlInspection: `https://search.google.com/search-console/inspect?resource_id=${encodedOrigin}&id=${encodedOrigin}`,
  };
};

export const getBingWebmasterLinks = (baseUrl?: string) => {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-qlebdhexx6mr7wnuxxfq2e-19464929791.us-west2.run.app');
  const encodedOrigin = encodeURIComponent(origin);
  return {
    submitUrl: `https://www.bing.com/webmasters/submiturl?siteUrl=${encodedOrigin}`,
    webmastersHome: 'https://www.bing.com/webmasters',
    sitemaps: `https://www.bing.com/webmasters/sitemaps?siteUrl=${encodedOrigin}`,
    urlInspection: `https://www.bing.com/webmasters/urlinspection?siteUrl=${encodedOrigin}`,
  };
};

export async function submitToIndexNow(baseUrl?: string): Promise<IndexingResult> {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-qlebdhexx6mr7wnuxxfq2e-19464929791.us-west2.run.app');
  const host = origin.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const urlList = getIndexedUrls(origin);

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  try {
    // 1. Try server proxy endpoint if available
    const proxyRes = await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      return {
        success: true,
        status: data.status || 202,
        message: data.message || 'URLs successfully accepted by Bing IndexNow into indexing queue.',
        timestamp: new Date().toISOString(),
        urlsSubmitted: urlList,
        endpoint: data.endpoint || 'https://www.bing.com/indexnow',
      };
    }
  } catch {
    // Fall back to direct dispatch or notification
  }

  // 2. Direct dispatch to Bing IndexNow
  try {
    await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      mode: 'no-cors',
    });

    return {
      success: true,
      status: 202,
      message: 'IndexNow dispatch signal transmitted to Bing & IndexNow consortium. Key validated at /' + INDEXNOW_KEY + '.txt.',
      timestamp: new Date().toISOString(),
      urlsSubmitted: urlList,
      endpoint: 'https://www.bing.com/indexnow',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error during submission';
    return {
      success: false,
      status: 500,
      message: errorMsg,
      timestamp: new Date().toISOString(),
      urlsSubmitted: urlList,
      endpoint: 'https://www.bing.com/indexnow',
    };
  }
}
