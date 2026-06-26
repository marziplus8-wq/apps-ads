import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenshotCarouselProps {
  screenshots: string[];
  appName: string;
}

export default function ScreenshotCarousel({ screenshots, appName }: ScreenshotCarouselProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <div className="relative group/carousel py-4" id="screenshot-carousel-root">
      {/* Scroll controls */}
      <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => scroll('left')}
          className="p-2 rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          aria-label="Scroll left"
          id="scroll-left-btn"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => scroll('right')}
          className="p-2 rounded-full bg-white dark:bg-[#1E293B] shadow-md border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          aria-label="Scroll right"
          id="scroll-right-btn"
        >
          <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      {/* Screenshot scroll wrapper */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        id="screenshot-scroll-viewport"
      >
        {screenshots.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-center relative group/img cursor-zoom-in rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => setLightboxIndex(index)}
            id={`screenshot-item-${index}`}
          >
            <img
              src={img}
              alt={`${appName} screenshot ${index + 1}`}
              referrerPolicy="no-referrer"
              className="h-[360px] md:h-[420px] w-auto max-w-[280px] object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
            />
            {/* Zoom Icon Overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
            id="lightbox-overlay"
          >
            {/* Close button */}
            <button
              id="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev item button */}
            {lightboxIndex > 0 && (
              <button
                id="lightbox-prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next item button */}
            {lightboxIndex < screenshots.length - 1 && (
              <button
                id="lightbox-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Large screenshot image */}
            <motion.div
              layoutId={`lightbox-image-${lightboxIndex}`}
              className="relative max-w-full max-h-[85vh] select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[lightboxIndex]}
                alt={`${appName} screenshot enlarged`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-mono text-sm">
                {lightboxIndex + 1} / {screenshots.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
