import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Compass, Smartphone, Heart, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AppDetails from './pages/AppDetails';
import NotFound from './pages/NotFound';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Access local storage or match media query
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Synchronize CSS Dark Mode class on target root document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Scroll to Top action helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div 
        id="app-theme-container" 
        className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300"
      >
        {/* STICKY NAVBAR */}
        <Navbar darkMode={darkMode} onThemeToggle={handleThemeToggle} />

        {/* MAIN BODY WRAPPER */}
        <main className="flex-grow w-full" id="main-content-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<AppDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* ETHIOPIAN PREMIUM BRANDED FOOTER */}
        <footer className="bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-800 py-12 transition-colors" id="hub-footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Branding and Description */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-sans font-bold text-sm">
                    E
                  </div>
                  <span className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">
                    Ethio <span className="text-emerald-600 dark:text-emerald-400">App Hub</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm">
                  The curated, high-speed, and secure Android application marketplace dedicated to indexing top-tier software in Ethiopia.
                </p>
              </div>

              {/* Navigation Quicklinks */}
              <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <Link to="/?category=Finance" className="hover:text-emerald-600 transition-colors">Finance</Link>
                <Link to="/?category=Transport" className="hover:text-emerald-600 transition-colors">Transport</Link>
                <Link to="/?category=Utilities" className="hover:text-emerald-600 transition-colors">Utilities</Link>
              </div>

              {/* Back to Top */}
              <button
                id="footer-back-to-top"
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:text-emerald-600 transition"
              >
                <span>Scroll to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Credit Area */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 text-3s font-mono text-slate-400 dark:text-slate-550 gap-4">
              <div className="flex items-center space-x-2 text-center sm:text-left">
                <span>© {new Date().getFullYear()} Ethio App Hub. Verified Play Store redirection directory.</span>
              </div>
              <div className="inline-flex items-center bg-slate-50 dark:bg-slate-800/60 px-3 py-1 rounded-full text-[10px] border border-slate-100 dark:border-slate-800">
                <span>Made in Ethiopia</span>
                <Heart className="w-3 h-3 text-red-500 mx-1 fill-red-500" />
                <span>for the local developer community.</span>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </Router>
  );
}
