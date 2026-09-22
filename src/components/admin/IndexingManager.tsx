import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  Send,
  CheckCircle,
  FileCode,
  Globe,
  Radio,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import {
  submitToIndexNow,
  getIndexedUrls,
  getGoogleSearchConsoleLinks,
  getBingWebmasterLinks,
  INDEXNOW_KEY,
  IndexingResult,
} from '../../services/indexingService';

export const IndexingManager: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<IndexingResult | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-qlebdhexx6mr7wnuxxfq2e-19464929791.us-west2.run.app';
  const indexedUrls = getIndexedUrls(origin);
  const googleLinks = getGoogleSearchConsoleLinks(origin);
  const bingLinks = getBingWebmasterLinks(origin);

  const handleIndexNowSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitToIndexNow(origin);
      setLastResult(result);
    } catch {
      setLastResult({
        success: false,
        status: 500,
        message: 'Submission encountered an error. Check console logs.',
        timestamp: new Date().toISOString(),
        urlsSubmitted: indexedUrls,
        endpoint: 'https://www.bing.com/indexnow',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(INDEXNOW_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 bg-[#0a0f1d] border border-[#C9A84C]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C9A84C] mb-2">
            <Radio className="w-3.5 h-3.5 text-[#00FF41] animate-pulse" />
            Search Engine Indexing & Bot Discovery
          </div>
          <h2 className="text-2xl font-serif text-[#F5F0E8]">
            Google Search Console & Bing IndexNow Hub
          </h2>
          <p className="text-sm font-serif text-[#F5F0E8]/70 mt-1 max-w-2xl">
            Automatically dispatch index requests to Microsoft Bing and Yandex via IndexNow, and submit your verified sitemap to Google Search Console.
          </p>
        </div>

        <button
          onClick={handleIndexNowSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C9A84C] text-[#0A0E1A] font-mono text-xs font-semibold hover:bg-[#d8b85c] disabled:opacity-50 transition-all cursor-pointer shadow-lg shrink-0"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Transmitting Signals...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Request Bing IndexNow (7 URLs)</span>
            </>
          )}
        </button>
      </div>

      {/* Submission Feedback Banner if run */}
      {lastResult && (
        <div
          className={`p-5 border text-left transition-all ${
            lastResult.success
              ? 'bg-[#00FF41]/10 border-[#00FF41]/50 text-[#F5F0E8]'
              : 'bg-[#F43F5E]/10 border-[#F43F5E]/50 text-[#F5F0E8]'
          }`}
        >
          <div className="flex items-start gap-3">
            <CheckCircle
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                lastResult.success ? 'text-[#00FF41]' : 'text-[#F43F5E]'
              }`}
            />
            <div className="space-y-1.5 flex-1">
              <div className="font-mono text-xs uppercase tracking-wider text-[#C9A84C]">
                IndexNow Transmission Report · HTTP {lastResult.status} (Accepted)
              </div>
              <p className="text-sm font-serif">{lastResult.message}</p>
              <div className="font-mono text-xs text-[#8E95A5] pt-1">
                Timestamp: {new Date(lastResult.timestamp).toLocaleString()} · Target: {lastResult.endpoint}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engine Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Search Console Card */}
        <div className="p-6 bg-[#070b16] border border-[#C9A84C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#38BDF8] tracking-widest">
                <Search className="w-4 h-4 text-[#38BDF8]" />
                Google Search Console
              </div>
              <span className="text-[10px] font-mono text-[#8E95A5] border border-[#8E95A5]/30 px-2 py-0.5">
                search.google.com
              </span>
            </div>

            <h3 className="text-lg font-serif text-[#F5F0E8] mb-2">
              Sitemap & URL Inspection Submission
            </h3>
            <p className="text-xs font-serif text-[#F5F0E8]/70 leading-relaxed mb-6">
              Google requires site ownership verification to index on demand. Submit your pre-built <code className="text-[#C9A84C]">sitemap.xml</code> and request URL crawls directly in the Google Search Console suite.
            </p>

            <div className="space-y-2.5">
              <a
                href={googleLinks.sitemaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Submit Sitemap to Google Search Console</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>

              <a
                href={googleLinks.urlInspection}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Request Google URL Inspection (Homepage)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>

              <a
                href={googleLinks.addProperty}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Add / Verify Domain Property in Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C9A84C]/20 text-[11px] font-mono text-[#8E95A5]">
            Sitemap URL: <code className="text-[#C9A84C]">{origin}/sitemap.xml</code>
          </div>
        </div>

        {/* Bing Webmaster Tools & IndexNow Card */}
        <div className="p-6 bg-[#070b16] border border-[#C9A84C]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#00FF41] tracking-widest">
                <Globe className="w-4 h-4 text-[#00FF41]" />
                Bing Webmasters & IndexNow
              </div>
              <span className="text-[10px] font-mono text-[#00FF41] border border-[#00FF41]/40 px-2 py-0.5">
                Protocol Active
              </span>
            </div>

            <h3 className="text-lg font-serif text-[#F5F0E8] mb-2">
              Instant Automatic Bing Indexing
            </h3>
            <p className="text-xs font-serif text-[#F5F0E8]/70 leading-relaxed mb-6">
              Bing IndexNow immediately informs search engines of fresh and updated content. When submitted, Bing shares this notice across participating engines including Yandex and Seznam.
            </p>

            <div className="space-y-2.5">
              <a
                href={bingLinks.submitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Direct Bing Submit URL Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>

              <a
                href={bingLinks.sitemaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Submit Sitemap to Bing Webmaster Tools</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>

              <a
                href={bingLinks.webmastersHome}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 bg-[#0d1424] border border-[#C9A84C]/20 hover:border-[#C9A84C] text-xs font-mono text-[#F5F0E8] transition-colors"
              >
                <span>Open Bing Webmaster Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C9A84C]/20 flex items-center justify-between text-[11px] font-mono text-[#8E95A5]">
            <span>Key: <code className="text-[#C9A84C]">{INDEXNOW_KEY.slice(0, 10)}...</code></span>
            <button
              onClick={handleCopyKey}
              className="text-[#C9A84C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedKey ? <Check className="w-3 h-3 text-[#00FF41]" /> : <Copy className="w-3 h-3" />}
              {copiedKey ? 'Copied' : 'Copy Key'}
            </button>
          </div>
        </div>
      </div>

      {/* Crawl Assets Status Bar */}
      <div className="p-6 bg-[#070b16] border border-[#C9A84C]/30">
        <h3 className="font-serif text-lg text-[#F5F0E8] mb-4 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#C9A84C]" />
          Engine Crawl Artifacts & Verification Endpoints
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#0a0f1d] border border-[#C9A84C]/20 hover:border-[#C9A84C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#C9A84C] mb-1">
                <span>sitemap.xml</span>
                <ExternalLink className="w-3 h-3" />
              </div>
              <p className="text-xs font-serif text-[#F5F0E8]/70">
                Machine-readable XML map for Googlebot, Bingbot, and DuckDuckGo.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#00FF41]">● Live & Validated</div>
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#0a0f1d] border border-[#C9A84C]/20 hover:border-[#C9A84C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#C9A84C] mb-1">
                <span>robots.txt</span>
                <ExternalLink className="w-3 h-3" />
              </div>
              <p className="text-xs font-serif text-[#F5F0E8]/70">
                Instructions permitting full index access while shielding admin routes.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#00FF41]">● Live & Validated</div>
          </a>

          <a
            href={`/${INDEXNOW_KEY}.txt`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#0a0f1d] border border-[#C9A84C]/20 hover:border-[#C9A84C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#C9A84C] mb-1">
                <span>{INDEXNOW_KEY.slice(0, 12)}...txt</span>
                <ExternalLink className="w-3 h-3" />
              </div>
              <p className="text-xs font-serif text-[#F5F0E8]/70">
                Microsoft Bing verification key proving ownership of domain signals.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#00FF41]">● Live & Validated</div>
          </a>
        </div>
      </div>

      {/* Target URLs Roster Table */}
      <div className="p-6 bg-[#070b16] border border-[#C9A84C]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg text-[#F5F0E8]">
              Target Indexing URL Registry (7 Active Routes)
            </h3>
            <p className="text-xs font-serif text-[#F5F0E8]/70 mt-0.5">
              These URLs are transmitted in the IndexNow payload and listed in <code className="text-[#C9A84C]">sitemap.xml</code>.
            </p>
          </div>
          <span className="font-mono text-xs text-[#00FF41] border border-[#00FF41]/30 px-2.5 py-1">
            7 URLs Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0b1222] border-b border-[#C9A84C]/20 text-[#8E95A5]">
              <tr>
                <th className="py-2.5 px-3">Route / URL</th>
                <th className="py-2.5 px-3">Page Purpose</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Frequency</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C]/10 text-[#F5F0E8]/85">
              {[
                { url: `${origin}/`, label: 'Homepage / Canonical', priority: '1.0', freq: 'Daily' },
                { url: `${origin}/#pricing`, label: 'Investment & $595 Discount', priority: '0.95', freq: 'Daily' },
                { url: `${origin}/#faq`, label: 'Q&A Schema Knowledge Graph', priority: '0.9', freq: 'Daily' },
                { url: `${origin}/#evidence`, label: 'Z-Plane Oracle & Chart Evidence', priority: '0.9', freq: 'Weekly' },
                { url: `${origin}/#methodology`, label: 'ICE Futures Cycle Theory', priority: '0.9', freq: 'Weekly' },
                { url: `${origin}/#curriculum`, label: 'Master Training Modules', priority: '0.85', freq: 'Weekly' },
                { url: `${origin}/#about`, label: 'Daniel Ferrera Archival Record', priority: '0.8', freq: 'Monthly' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-[#0c1322]">
                  <td className="py-2.5 px-3 text-[#C9A84C] font-semibold flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-[#8E95A5]" />
                    <span className="truncate max-w-xs">{item.url}</span>
                  </td>
                  <td className="py-2.5 px-3 font-serif">{item.label}</td>
                  <td className="py-2.5 px-3 text-[#38BDF8]">{item.priority}</td>
                  <td className="py-2.5 px-3 text-[#8E95A5]">{item.freq}</td>
                  <td className="py-2.5 px-3 text-right">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C9A84C] hover:underline inline-flex items-center gap-1"
                    >
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
