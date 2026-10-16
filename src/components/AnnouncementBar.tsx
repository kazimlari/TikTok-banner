import React from 'react';
import { Sparkles, ArrowRight, X, Layers, Info } from 'lucide-react';

interface AnnouncementBarProps {
  isVisible: boolean;
  onDismiss: () => void;
  onOpenBannerStudio: () => void;
  onOpenFeatureModal: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  isVisible,
  onDismiss,
  onOpenBannerStudio,
  onOpenFeatureModal,
}) => {
  if (!isVisible) return null;

  return (
    <aside
      aria-label="New feature announcement"
      className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-rose-500/30 text-white transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs">
        {/* Left: Glowing badge & announcement message */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          {/* Glowing NEW badge */}
          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.45)]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>NEW</span>
          </span>

          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-white truncate">
              TikTok Profile Banner Feature
            </span>
            <span className="hidden md:inline text-slate-400">
              — Personalize your header aesthetics, align safe zones & boost bio engagement
            </span>
          </div>
        </div>

        {/* Right: CTA Actions & Dismiss Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenFeatureModal}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white rounded-md hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            <Info className="w-3 h-3 text-cyan-400" />
            <span>Overview</span>
          </button>

          <button
            onClick={onOpenBannerStudio}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-sm shadow-rose-500/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>Customize Banner</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={onDismiss}
            aria-label="Dismiss announcement banner"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 transition-colors ml-1"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
