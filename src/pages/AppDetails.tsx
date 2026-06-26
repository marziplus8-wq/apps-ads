import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Copy, Check, Download, Star, ArrowLeft, ShieldCheck, Database, Calendar, Smartphone, Globe, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import appsData from '../data/apps.json';
import { AppItem } from '../types';
import ScreenshotCarousel from '../components/ScreenshotCarousel';
import AppCard, { formatDownloads } from '../components/AppCard';

export default function AppDetails() {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shared, setShared] = useState(false);

  // Inline countdown states
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [initialTimer, setInitialTimer] = useState<number>(5);
  const [countdownActive, setCountdownActive] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    // Find the app by ID
    const foundApp = (appsData as AppItem[]).find((a) => a.id === Number(id));
    
    if (foundApp) {
      setApp(foundApp);
      document.title = `${foundApp.name} | Download APK - Ethio App Hub`;
      const timerVal = foundApp.timer || 5;
      setInitialTimer(timerVal);
      setTimeLeft(timerVal);
      setCountdownActive(true);
    } else {
      setApp(null);
      document.title = "App Not Found | Ethio App Hub";
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450); // elegant transition time

    return () => clearTimeout(timer);
  }, [id]);

  // Automatic redirection countdown loop
  useEffect(() => {
    if (!app || !countdownActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Redirect immediately to the play store url
          window.location.href = app.playStoreUrl;
          setCountdownActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [app, countdownActive, timeLeft]);

  const handleCopyLink = () => {
    if (!app) return;
    navigator.clipboard.writeText(app.playStoreUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareApp = () => {
    if (!app) return;
    const shareUrl = window.location.href;
    const shareTitle = `${app.name} on Ethio App Hub`;
    const shareText = `Check out ${app.name} from ${app.developer} on Ethio App Hub directory!`;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-8" id="details-loading-skeleton">
        <div className="flex space-x-6 items-center">
          <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700/60 rounded-3xl" />
          <div className="space-y-3 flex-1">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 w-1/3 rounded" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/4 rounded" />
          </div>
        </div>
        <div className="h-40 bg-slate-200 dark:bg-slate-705/60 rounded-2xl" />
      </div>
    );
  }

  // Not Found State
  if (!app) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6" id="app-not-found-view">
        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-sans font-bold text-slate-900 dark:text-slate-100">
            Application Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            The app ID you provided does not match any items in our store curation database.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory Home
          </Link>
        </div>
      </div>
    );
  }

  // Related apps logic: category match, exclude self, max 6
  const relatedApps = (appsData as AppItem[])
    .filter((a) => a.category === app.category && a.id !== app.id)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="app-details-root">
      
      {/* QUICK BREADCRUMB */}
      <Link
        id="breadcrumb-back-home"
        to="/"
        className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Directory
      </Link>

      {/* HEADER CARD BLOCK: Icon, name, download, triggers */}
      <section className="bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6" id="app-profile-header">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
          
          {/* Main App Large Icon */}
          <img
            src={app.icon}
            alt={`${app.name} icon logo`}
            referrerPolicy="no-referrer"
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover hover:scale-102 transition-transform shadow-md border border-slate-50 dark:border-slate-800"
            id="details-large-icon"
          />

          {/* App Info Metadata */}
          <div className="flex-1 space-y-3 min-w-0" id="details-profile-metadata">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 dark:text-slate-100 tracking-tight truncate">
                {app.name}
              </h1>
              <span className="inline-flex max-w-fit items-center px-2.5 py-1 rounded-full text-2xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 md:self-center mt-2 sm:mt-0 mx-auto sm:mx-0">
                {app.category}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Developed by <span className="font-semibold text-slate-700 dark:text-slate-300">{app.developer}</span>
            </p>

            {/* Quick Micro rating counters */}
            <div className="flex items-center justify-center md:justify-start space-x-4 text-xs font-medium pt-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-500 mr-1" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{app.rating.toFixed(1)}</span>
                <span className="text-slate-400 ml-1">Stars</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <div className="text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200">{formatDownloads(app.downloads)}+</span> downloads
              </div>
            </div>

            {/* CTA action cluster */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3" id="details-header-ctas">
              {/* PRIMARY DOWNLOAD BUTTON */}
              <button
                id="main-download-trigger-btn"
                onClick={() => {
                  window.location.href = app.playStoreUrl;
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:scale-[1.01] transition-all"
              >
                <Download className="w-4.5 h-4.5 mr-2" />
                Download App
              </button>

              {/* COPY LINK */}
              <button
                id="copy-playstore-link-btn"
                onClick={handleCopyLink}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-805 hover:text-emerald-600 transition"
                title="Copy legacy Play Store link"
                aria-label="Copy Play Store Link"
              >
                {copiedLink ? <Check className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
              </button>

              {/* SHARE TRIGGER */}
              <button
                id="share-app-link-btn"
                onClick={handleShareApp}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-805 hover:text-emerald-600 transition"
                title="Share this application page"
                aria-label="Share App"
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Custom toast indicators */}
            <AnimatePresence>
              {(copiedLink || shared) && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="p-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg inline-block text-center shadow-inner"
                  id="action-toast-alert"
                >
                  {copiedLink ? "✓ Google Play Store Link Copied to clipboard!" : "✓ Page Share Link Copied to clipboard!"}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* SPEC GRID OVERLAY - File Size, rating, updated timestamp, security */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-center" id="specs-comparison-grid">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A]/80">
            <span className="text-3xs font-mono uppercase tracking-widest text-slate-400">File Size</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{app.size || "Varies"}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A]/80">
            <span className="text-3xs font-mono uppercase tracking-widest text-slate-400">Android Target</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">v6.0 or Up</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A]/80">
            <span className="text-3xs font-mono uppercase tracking-widest text-slate-400">Last Updated</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{app.updatedAt}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0F172A]/80">
            <span className="text-3xs font-mono uppercase tracking-widest text-slate-400">License check</span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 inline-flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" />
              Verified APK
            </p>
          </div>
        </div>
      </section>

      {/* INLINE INTELLIGENT COUNTDOWN */}
     

      {/* FULL DESCRIPTION STATEMENT */}
      <section className="space-y-4" id="details-description-block center">
        <h2 className="text-lg font-sans font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
          About this app
        </h2>
        <div className="border border-slate-50 dark:border-slate-800 rounded-2xl p-5 md:p-6 bg-white dark:bg-[#1E293B] font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line" id="full-description-text">
          {app.description}
        </div>
      </section>

      {/* DYNAMIC SCREENSHOTS LAYOUT CAROUSEL */}
      {app.images && app.images.length > 0 && (
        <section className="space-y-4" id="details-screenshots-block">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-sans font-bold text-slate-900 dark:text-slate-100">
              Interactive Screenshots
            </h2>
            <span className="text-3xs font-mono text-slate-400">Tap to expand and view slideshow</span>
          </div>
          <ScreenshotCarousel screenshots={app.images} appName={app.name} />
        </section>
      )}

      {/* RELATED DIRECTORY APPS GRID */}
      <section className="space-y-6 pt-6" id="related-directory-block">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
            <h2 className="text-lg font-sans font-bold text-slate-900 dark:text-slate-100">
              More apps in {app.category}
            </h2>
            <p className="text-xs text-slate-400">Similar tools curated by local specialists</p>
          </div>
          <Link
            to={`/?category=${encodeURIComponent(app.category)}`}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:translate-x-0.5 transition-transform"
          >
            See All Category Apps →
          </Link>
        </div>

        {relatedApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="related-apps-grid">
            {relatedApps.map((relatedApp) => (
              <AppCard key={relatedApp.id} app={relatedApp} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            This is currently the sole app representing the {app.category} category in our hub. Stay tuned as we index more soon!
          </div>
        )}
      </section>

    </div>
  );
}
