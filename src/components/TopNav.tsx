import React from 'react';
import { Smartphone, Monitor, Sun, Moon, Download, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface TopNavProps {
  previewDevice: 'iphone' | 'android' | 'tablet' | 'frameless';
  setPreviewDevice: (device: 'iphone' | 'android' | 'tablet' | 'frameless') => void;
  previewTheme: 'dark' | 'light';
  setPreviewTheme: (theme: 'dark' | 'light') => void;
  onOpenExport: () => void;
  onOpenAnalyzer: () => void;
  onOpenFeatureModal: () => void;
  onOpenActivator?: () => void;
  aestheticScore: number;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  previewDevice,
  setPreviewDevice,
  previewTheme,
  setPreviewTheme,
  onOpenExport,
  onOpenAnalyzer,
  onOpenFeatureModal,
  onOpenActivator,
  aestheticScore,
  activeSection,
  setActiveSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20 font-black text-white text-base sm:text-lg">
            TT
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
              <span className="sm:hidden">TikTok Banner Studio</span>
              <span className="hidden sm:inline">TikTok Profile Banner Studio</span>
            </span>
            <span className="hidden sm:block text-[11px] text-slate-400 font-medium">
              Profile Aesthetics & Engagement Preview
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveSection('editor')}
            className={`transition-colors whitespace-nowrap ${
              activeSection === 'editor' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            Studio Editor
          </button>
          <button
            onClick={onOpenFeatureModal}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white text-slate-400 group"
          >
            <span>Banner Feature</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_8px_rgba(244,63,94,0.4)] group-hover:bg-rose-500 group-hover:text-white transition-all">
              NEW
            </span>
          </button>
          <button
            onClick={() => setActiveSection('presets')}
            className={`transition-colors whitespace-nowrap ${
              activeSection === 'presets' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            Creator Presets
          </button>
          <button
            onClick={() => setActiveSection('safezones')}
            className={`transition-colors whitespace-nowrap ${
              activeSection === 'safezones' ? 'text-white font-semibold' : 'hover:text-white text-slate-400'
            }`}
          >
            Safe Zone Guidelines
          </button>
          <button
            onClick={onOpenAnalyzer}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Score: {aestheticScore}%</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Device toggle */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700/60">
            <button
              onClick={() => setPreviewDevice('iphone')}
              aria-label="iPhone preview"
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                previewDevice === 'iphone'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              iPhone
            </button>
            <button
              onClick={() => setPreviewDevice('android')}
              aria-label="Android preview"
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                previewDevice === 'android'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Galaxy
            </button>
            <button
              onClick={() => setPreviewDevice('frameless')}
              aria-label="Frameless preview"
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                previewDevice === 'frameless'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Fit
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle TikTok app theme"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
            title={`Switch to ${previewTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {previewTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Add TikTok Banner to Your Profile Button */}
          {onOpenActivator && (
            <button
              onClick={onOpenActivator}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-rose-500 to-pink-500 rounded-lg hover:from-cyan-400 hover:to-pink-600 active:scale-95 transition-all shadow-md shadow-rose-500/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>Add TikTok Banner to Your Profile</span>
            </button>
          )}

          {/* Export action */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Banner</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
