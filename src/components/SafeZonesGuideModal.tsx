import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import { TIKTOK_BANNER_SPEC } from '../utils/bannerCalculators.ts';

interface SafeZonesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafeZonesGuideModal: React.FC<SafeZonesGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">TikTok Banner Safe-Zone Blueprint</h3>
              <p className="text-xs text-slate-400">Dimensions, notch margins & avatar cutout rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin text-xs text-slate-300">
          {/* Interactive Visual Blueprint Graphic */}
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 space-y-2">
            <div className="text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Aspect Ratio: 3:1 Standard (1080 x 360 px)</span>
              <span className="text-emerald-400">Official Spec</span>
            </div>

            <div className="relative aspect-[3/1] w-full rounded-lg border border-slate-600 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 overflow-hidden flex flex-col justify-between">
              {/* Top Danger Zone */}
              <div className="h-[24%] bg-red-500/30 border-b border-red-400/80 border-dashed px-3 flex items-center justify-between text-[10px] text-red-200 font-mono">
                <span>Top 22%: System Status Bar & TikTok Top Navigation (Icons & Search)</span>
                <span className="bg-red-900/80 px-1 py-0.5 rounded text-[9px] font-bold">DANGER ZONE</span>
              </div>

              {/* Central Safe Zone */}
              <div className="flex-1 border-y border-emerald-400/80 bg-emerald-500/15 flex items-center justify-between px-3 text-[10px] text-emerald-300 font-mono">
                <span>Central 50%: 100% Guaranteed Safe Zone across all phones</span>
                <span className="bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                  PLACE TEXT HERE
                </span>
              </div>

              {/* Bottom Avatar Cutout Zone */}
              <div className="relative h-[28%] bg-amber-500/25 border-t border-amber-400/80 border-dashed flex items-end justify-center pb-1 text-[10px] text-amber-200 font-mono">
                <span className="z-10 bg-amber-950/80 px-2 py-0.5 rounded">Bottom 28%: Avatar Intrusion</span>
                {/* Silhouette circle */}
                <div className="absolute -bottom-10 w-24 h-24 rounded-full border-2 border-dashed border-amber-300 bg-amber-900/60 flex items-center justify-center text-[10px] text-amber-100 font-bold" />
              </div>
            </div>
          </div>

          {/* 3 Key Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-red-400 font-bold">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                <span>Avoid Top 22%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                iPhone Dynamic Island, clock, 5G icons, and TikTok's share button will cover any text placed here.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                <span>Avoid Bottom Center</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Your profile picture overlaps the bottom 28% of the banner. Keep logos away from the lower center.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Center or Top-Right</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Keep slogans, release dates, and stream announcements in the middle third or top-right safe zone.
              </p>
            </div>
          </div>

          {/* Recommended Specs Table */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recommended Asset Specs</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Dimensions</div>
                <div className="font-mono font-bold text-white mt-0.5">1080 x 360 px</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Aspect Ratio</div>
                <div className="font-mono font-bold text-white mt-0.5">3:1 Standard</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Max File Size</div>
                <div className="font-mono font-bold text-white mt-0.5">&lt; 5 MB</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Best Formats</div>
                <div className="font-mono font-bold text-white mt-0.5">PNG / JPG / WebP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
