import React from 'react';

export function AppCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 shadow-sm space-y-4 animate-pulse">
      <div className="flex items-start space-x-4">
        {/* App Icon skeleton */}
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-2xl flex-shrink-0" />
        
        {/* App Title & Category skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      </div>
      
      {/* Footer info & button skeleton */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-24" />
      </div>
    </div>
  );
}

export function AppDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 text-center md:text-left space-y-4 md:space-y-0">
        {/* App Icon */}
        <div className="w-28 h-28 md:w-36 md:h-36 bg-slate-200 dark:bg-slate-700 rounded-3xl flex-shrink-0" />
        
        {/* Basic Details */}
        <div className="flex-1 space-y-3 w-full">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto md:mx-0" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto md:mx-0" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mx-auto md:mx-0" />
          <div className="flex items-center justify-center md:justify-start space-x-3 pt-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20" />
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20" />
          </div>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-y border-slate-100 dark:border-slate-700/50 py-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto" />
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
        </div>
      </div>

      {/* Screenshots Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40" />
        <div className="flex space-x-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-60 h-[400px] bg-slate-200 dark:bg-slate-700 rounded-2xl flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="loading-skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <AppCardSkeleton key={index} />
      ))}
    </div>
  );
}
