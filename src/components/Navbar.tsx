import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sun, Moon, Search, Layers, Compass, Menu, X, ChevronDown } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

export default function Navbar({ darkMode, onThemeToggle }: NavbarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Sync search input value with URL parameter ?q=
  useEffect(() => {
    setLocalSearch(searchParams.get('q') || '');
  }, [searchParams]);

  const categories: Category[] = [
    'Finance',
    'Transport',
    'Delivery',
    'Education',
    'Communication',
    'Utilities'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/?q=${encodeURIComponent(localSearch)}`);
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    
    // Dynamically update query if we are on the homepage, or wait for submit if on another page
    if (window.location.pathname === '/') {
      const newParams = new URLSearchParams(searchParams);
      if (val) {
        newParams.set('q', val);
      } else {
        newParams.delete('q');
      }
      setSearchParams(newParams);
    }
  };

  const handleCategorySelect = (cat: string) => {
    navigate(`/?category=${encodeURIComponent(cat)}`);
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors shadow-sm" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div className="flex items-center space-x-2 flex-shrink-0" id="navbar-logo-section">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-yellow-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-[#1E293B] rounded-[10px] flex items-center justify-center">
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans font-bold text-xl tracking-tight">E</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-slate-900 dark:text-slate-100 text-lg leading-none tracking-tight">
                  Ethio <span className="text-emerald-600 dark:text-emerald-400">App Hub</span>
                </span>
                <span className="text-4xs font-mono tracking-widest text-slate-400 uppercase mt-0.5">Ethiopia's App Hub</span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV ITEMS */}
          <div className="hidden md:flex items-center space-x-6" id="navbar-desktop-nav">
            <Link
              id="desktop-nav-home"
              to="/"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>

            {/* CATEGORIES DROPDOWN */}
            <div className="relative">
              <button
                id="desktop-categories-btn"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
              >
                Categories
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden py-1.5 z-50">
                  <button
                    onClick={() => handleCategorySelect('All')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600"
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* NAVBAR SEARCH */}
          <div className="hidden sm:block flex-1 max-w-sm mx-6" id="navbar-desktop-search">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="navbar-search-input"
                type="text"
                placeholder="Search premium apps..."
                value={localSearch}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0F172A] transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
            </form>
          </div>

          {/* THEME TOGGLE & MOBILE TRIGGER */}
          <div className="flex items-center space-x-3" id="navbar-actions">
            <button
              id="dark-mode-toggle"
              onClick={onThemeToggle}
              className="p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              aria-label="Open mobile navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0F172A] transition-colors px-4 py-4 space-y-4" id="navbar-mobile-drawer">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative sm:hidden">
            <input
              id="navbar-mobile-search-input"
              type="text"
              placeholder="Search apps..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800/60 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
          </form>

          <div className="flex flex-col space-y-3 font-semibold text-sm">
            <Link
              id="mobile-nav-home"
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1.5 transition-colors"
            >
              Home
            </Link>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Categories</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCategorySelect('All')}
                  className="text-left py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 font-medium"
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="text-left py-1 text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 font-medium"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
