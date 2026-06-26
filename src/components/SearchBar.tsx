import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  id?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search apps...", id = "search-input" }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto" id="search-bar-container">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" id="search-icon-wrapper">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
      </div>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-11 py-3 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-sans text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm focus:shadow-md"
      />
      {value && (
        <button
          id="search-clear-button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
