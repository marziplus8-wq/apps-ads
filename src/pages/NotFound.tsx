import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Page Not Found | Ethio App Hub";
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-8" id="notfound-root">
      {/* Visual illustration containing Ethiopia context flags colors */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-slate-50 dark:bg-[#1E293B] rounded-full border border-slate-100 dark:border-slate-800 shadow-inner">
        <ShieldAlert className="w-14 h-14 text-emerald-600 dark:text-emerald-400" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
      </div>

      <div className="space-y-3">
        <h1 className="text-5xl font-sans font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          404
        </h1>
        <h2 className="text-xl font-sans font-bold text-slate-900 dark:text-slate-200">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
          We couldn't locate the directory profile page or URL you requested. It might have been updated, moved, or misspelled.
        </p>
      </div>

      {/* Primary paths */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          id="notfound-back-home"
          to="/"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition"
        >
          <Home className="w-4 h-4 mr-2" />
          Home Directory
        </Link>
        <Link
          id="notfound-categories"
          to="/?category=All"
          className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs rounded-xl transition"
        >
          <Compass className="w-4 h-4 mr-2" />
          Explore Categories
        </Link>
      </div>
    </div>
  );
}
