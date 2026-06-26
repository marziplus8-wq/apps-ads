import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  key?: React.Key;
}

export function formatDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return (downloads / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (downloads >= 1000) {
    return (downloads / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return downloads.toString();
}

export default function AppCard({ app }: AppCardProps) {
  const { id, name, shortDescription, downloads, icon, category, developer, rating } = app;

  return (
    <motion.div
      id={`app-card-${id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.15, ease: 'easeOut' } }}
      className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start space-x-4" id={`app-card-header-${id}`}>
          {/* App Icon */}
          <Link to={`/${id}`} className="block flex-shrink-0" id={`app-icon-link-${id}`}>
            <img
              src={icon}
              alt={`${name} icon`}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Title & Developer & Star rating */}
          <div className="flex-1 min-w-0" id={`app-card-meta-${id}`}>
            <Link to={`/${id}`} className="block group">
              <h3 className="font-sans font-semibold text-slate-900 dark:text-slate-100 text-base leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                {name}
              </h3>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{developer}</p>
            
            <div className="flex items-center space-x-2 mt-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                {category}
              </span>
              <div className="flex items-center text-amber-500 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 line-clamp-2" id={`app-desc-${id}`}>
          {shortDescription}
        </p>
      </div>

      {/* Footer Info & View Details Button */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-50 dark:border-slate-800" id={`app-card-footer-${id}`}>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <Download className="w-3.5 h-3.5 mr-1 text-slate-400" />
          <span className="font-medium mr-1 text-slate-700 dark:text-slate-300">{formatDownloads(downloads)}</span>
          <span>downloads</span>
        </div>

        <Link
          id={`view-details-${id}`}
          to={`/${id}`}
          className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors py-1.5 pl-2.5 pr-1 hover:translate-x-0.5 transition-transform"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}
