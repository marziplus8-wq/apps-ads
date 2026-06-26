import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Trophy, ListFilter, ArrowRight, Download, Calendar, HelpCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';
import appsData from '../data/apps.json';
import { AppItem, Category } from '../types';
import AppCard, { formatDownloads } from '../components/AppCard';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<AppItem[]>([]);

  const searchQuery = searchParams.get('q') || '';
  const categoryQuery = searchParams.get('category') || 'All';

  // Load apps and trigger a beautiful mock loading state
  useEffect(() => {
    // Synchronize SEO Title
    document.title = "Ethio App Hub | Discover and Download Ethiopian Android Apps";
    
    setLoading(true);
    const timer = setTimeout(() => {
      setApps(appsData as AppItem[]);
      setLoading(false);
    }, 600); // 600ms responsive skeleton load animation

    return () => clearTimeout(timer);
  }, []);

  // Filter categorization list
  const categories: Category[] = [
    'All',
    'Finance',
    'Transport',
    'Delivery',
    'Education',
    'Communication',
    'Utilities'
  ];

  // Logic to process Apps
  // Top Downloaded (Sorted by downloads count)
  const topDownloadedApps = [...apps]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 4);

  // Recently Added (Sorted by updatedAt date, newest first)
  const recentlyAddedApps = [...apps]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  // All Apps list with active Search and Category filters
  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryQuery === 'All' || app.category === categoryQuery;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (cat: Category) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-12 pb-16" id="home-page-root">
      
      {/* HERO HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-slate-50 to-transparent dark:from-emerald-950/20 dark:via-[#0F172A]/10 dark:to-transparent py-12 md:py-16 text-center border-b border-slate-100/60 dark:border-slate-800/40" id="hero-banner">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Discover local, high-quality Ethiopian Android apps</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight"
          >
            The Premier Ethiopian <br />
            <span className="text-emerald-600 dark:text-emerald-400 bg-gradient-to-r from-emerald-600 to-yellow-500 bg-clip-text text-transparent">Android App Directory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans"
          >
            Explore, analyze, and safely download genuine Ethiopian Android applications. Access direct paths containing verified security links.
          </motion.p>

          {/* Inline Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </motion.div>
        </div>
      </section>

      {/* RHYTHMIC CATEGORIES FILTER TRACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="category-selector-section">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-2 border-b border-slate-100 dark:border-slate-800" style={{ scrollbarWidth: 'none' }}>
          <ListFilter className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mr-2" />
          {categories.map((cat) => {
            const isActive = categoryQuery === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                id={`cat-filter-${cat}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15'
                    : 'bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'All' ? '📌 All' : cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* MAIN DYNAMIC CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {loading ? (
          <div className="space-y-12">
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 w-48 rounded mb-4 animate-pulse" />
              <LoadingSkeleton count={3} />
            </div>
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 w-48 rounded mb-4 animate-pulse" />
              <LoadingSkeleton count={6} />
            </div>
          </div>
        ) : (
          <>
            {/* 1. TOP DOWNLOADED APPS BLOCK (Only shown when not deeply searching) */}
            {!searchQuery && categoryQuery === 'All' && (
              <section className="space-y-6" id="top-downloaded-section">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-sans font-bold text-slate-900 dark:text-slate-100">
                      Top Downloaded Apps
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Featured Leaders</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topDownloadedApps.map((app) => (
                    <motion.div
                      key={`top-${app.id}`}
                      id={`top-card-${app.id}`}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-b from-white to-slate-20/50 dark:from-[#1E293B] dark:to-[#1E293B]/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-lg transition-transform flex flex-col justify-between"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={app.icon}
                          alt={app.name}
                          referrerPolicy="no-referrer"
                          className="w-13 h-13 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <Link to={`/${app.id}`} className="hover:text-emerald-600 transition-colors">
                            <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100 truncate mt-0.5">
                              {app.name}
                            </h3>
                          </Link>
                          <p className="text-3xs text-slate-400 font-mono tracking-wide truncate mt-0.5 uppercase">{app.category}</p>
                          <div className="flex items-center text-amber-500 text-3xs mt-1">
                            <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                            <span className="font-bold text-slate-700 dark:text-slate-300">{app.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center text-xs text-slate-500">
                          <Download className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDownloads(app.downloads)}</span>
                        </div>
                        <Link
                          to={`/${app.id}`}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                        >
                          View App
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. RECENTLY ADDED APPS (Only shown when not actively searching) */}
            {!searchQuery && categoryQuery === 'All' && (
              <section className="space-y-6" id="recently-added-section">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-xl font-sans font-bold text-slate-900 dark:text-slate-100">
                      Recently Added Apps
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Recently Updated</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentlyAddedApps.map((app) => (
                    <div
                      key={`recent-${app.id}`}
                      id={`recent-app-${app.id}`}
                      className="flex items-center space-x-4 bg-white dark:bg-[#1E293B] p-4 rounded-2xl border border-slate-100 dark:border-slate-800"
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-contain border border-slate-50 dark:border-slate-700"
                      />
                      <div className="min-w-0 flex-grow">
                        <Link to={`/${app.id}`} className="hover:text-emerald-600 transition-colors">
                          <h4 className="font-sans font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                            {app.name}
                          </h4>
                        </Link>
                        <p className="text-2xs text-slate-500 dark:text-slate-400 truncate">{app.developer}</p>
                        <p className="text-3xs text-slate-400 font-mono mt-1">Updated {app.updatedAt}</p>
                      </div>
                      <Link
                        to={`/${app.id}`}
                        className="px-2.5 py-1 text-2xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-705 transition"
                      >
                        Details
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. ALL APPS BLOCK (Primary search/filtering grid) */}
            <section className="space-y-6" id="all-apps-section">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-sans font-bold text-slate-900 dark:text-slate-100">
                    {searchQuery || categoryQuery !== 'All' ? 'Search Results' : 'All Android Apps'}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} {categoryQuery !== 'All' && `in ${categoryQuery}`} {searchQuery && `matching "${searchQuery}"`}
                  </p>
                </div>
              </div>

              {filteredApps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="apps-filtered-grid">
                  {filteredApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              ) : (
                /* EMPTY STATE */
                <div className="text-center py-20 px-4 bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-100 dark:border-slate-800 max-w-xl mx-auto space-y-5" id="search-empty-state">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full flex items-center justify-center mx-auto">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-slate-100">No apps found</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      We couldn't find any app names, description details, or developer records matching your search queries.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchParams({});
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
