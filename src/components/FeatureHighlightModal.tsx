import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sliders,
  Check,
} from 'lucide-react';
import { FEATURE_HIGHLIGHTS } from '../utils/featureHighlights.ts';

interface FeatureHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBannerStudio: () => void;
  onOpenSafeZones: () => void;
}

export const FeatureHighlightModal: React.FC<FeatureHighlightModalProps> = ({
  isOpen,
  onClose,
  onOpenBannerStudio,
  onOpenSafeZones,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleStartCustomizing = () => {
    if (dontShowAgain && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('tt_banner_never_show_modal', 'true');
      } catch {
        // Ignore
      }
    }
    onOpenBannerStudio();
    onClose();
  };

  const getFeatureIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Layers className="w-4 h-4 text-rose-400" />;
      case 1:
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 2:
      default:
        return <Zap className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with glowing badge */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="modal-headline" className="text-base font-bold text-white tracking-tight">
                  New Feature: TikTok Profile Banner
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                  NEW
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Elevate visual aesthetics & follower engagement on your profile
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close feature highlight modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin text-xs">
          {/* Mini Interactive Visual Preview Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Simulated Profile Banner Experience</span>
              </span>
              <span className="font-mono text-cyan-300">1080 x 360 px (3:1)</span>
            </div>

            {/* Visual banner simulation preview bar */}
            <div className="relative aspect-[3/1] w-full rounded-lg overflow-hidden border border-slate-700 bg-gradient-to-r from-slate-950 via-purple-950/60 to-cyan-950 shadow-inner flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20">
                  @creator · Official Profile
                </span>
                <span className="text-[10px] font-bold text-cyan-200 bg-cyan-950/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-cyan-400/50 shadow-sm shadow-cyan-400/20 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                  <span>NEW DROP LIVE</span>
                </span>
              </div>

              {/* Tagline & Avatar outline indicator */}
              <div className="flex items-end justify-between">
                <div className="text-[11px] font-semibold text-white drop-shadow">
                  Custom Aesthetic Taglines & Safe Zones
                </div>
                {/* Silhouette avatar circle */}
                <div className="w-10 h-10 rounded-full border-2 border-white/80 bg-slate-900/80 -mb-4 mr-4 flex items-center justify-center text-[10px] text-white font-bold">
                  PFP
                </div>
              </div>
            </div>
          </div>

          {/* 3 Capabilities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              What You Can Try In This Studio
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {FEATURE_HIGHLIGHTS.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                    {getFeatureIcon(idx)}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox: Don't show again */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-rose-500 focus:ring-0 accent-rose-500"
              />
              <span>Don't show this announcement modal automatically again</span>
            </label>

            <button
              onClick={onOpenSafeZones}
              className="text-cyan-400 hover:text-cyan-300 underline font-medium"
            >
              Safe Zone Blueprint
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Dismiss
          </button>

          <button
            onClick={handleStartCustomizing}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/25 active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Banner Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
