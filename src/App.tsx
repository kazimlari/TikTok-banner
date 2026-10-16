import React, { useState, useMemo } from 'react';
import type { BannerConfig, ProfileIdentity, VideoClip, PresetCreator } from './types/profile.ts';
import { PRESET_CREATORS } from './data/presets.ts';
import { calculateProfileAesthetics } from './utils/bannerCalculators.ts';
import { TopNav } from './components/TopNav.tsx';
import { TikTokPhoneFrame } from './components/TikTokPhoneFrame.tsx';
import { BannerEditor } from './components/BannerEditor.tsx';
import { ProfileEditor } from './components/ProfileEditor.tsx';
import { GridEditor } from './components/GridEditor.tsx';
import { AestheticScoreModal } from './components/AestheticScoreModal.tsx';
import { SafeZonesGuideModal } from './components/SafeZonesGuideModal.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { VideoPreviewModal } from './components/VideoPreviewModal.tsx';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { FeatureHighlightModal } from './components/FeatureHighlightModal.tsx';
import { BannerActivator } from './components/BannerActivator.tsx';
import {
  getInitialAnnouncementState,
  saveTopBannerDismissed,
} from './utils/featureHighlights.ts';
import {
  Sparkles,
  Sliders,
  User,
  Grid,
  ShieldCheck,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Flame,
  Layers,
  Info,
  Zap,
} from 'lucide-react';

export default function App() {
  // Initial state loaded from default preset
  const defaultCreator = PRESET_CREATORS[0];
  const [banner, setBanner] = useState<BannerConfig>(defaultCreator.banner);
  const [profile, setProfile] = useState<ProfileIdentity>(defaultCreator.profile);
  const [videos, setVideos] = useState<VideoClip[]>(defaultCreator.profile.videos);

  // Sync profile videos
  const activeProfile = useMemo(() => {
    return { ...profile, videos };
  }, [profile, videos]);

  // Viewport & Studio settings
  const [previewDevice, setPreviewDevice] = useState<'iphone' | 'android' | 'tablet' | 'frameless'>('iphone');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [activeEditorTab, setActiveEditorTab] = useState<'banner' | 'profile' | 'grid' | 'presets'>('banner');
  const [activeNavSection, setActiveNavSection] = useState<string>('editor');

  // Modals state
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [isSafeZonesGuideOpen, setIsSafeZonesGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoClip | null>(null);

  // New Feature Announcement Bar & Spotlight Modal State
  const [isTopAnnouncementVisible, setIsTopAnnouncementVisible] = useState(() => {
    return !getInitialAnnouncementState().isTopBannerDismissed;
  });
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isActivatorOpen, setIsActivatorOpen] = useState(false);

  const handleDismissTopAnnouncement = () => {
    setIsTopAnnouncementVisible(false);
    saveTopBannerDismissed(true);
  };

  const handleOpenBannerStudio = () => {
    setActiveEditorTab('banner');
    setMobileViewMode('editor');
    // Smooth scroll to studio editor
    const el = document.getElementById('studio-tabs-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Dynamic analysis score
  const aestheticAnalysis = useMemo(() => {
    return calculateProfileAesthetics(banner, activeProfile);
  }, [banner, activeProfile]);

  // Load a complete preset
  const handleLoadPreset = (preset: PresetCreator) => {
    setBanner(preset.banner);
    setProfile(preset.profile);
    setVideos(preset.profile.videos);
  };

  // One-click apply optimal fixes
  const handleApplyOptimalEnhancements = () => {
    setBanner((prev) => ({
      ...prev,
      overlayScrim: 'bottom-fade',
      badge: {
        ...prev.badge,
        enabled: true,
        position: 'top-right',
        text: prev.badge.text || 'NEW DROP',
        theme: 'neon',
      },
      tagline: {
        ...prev.tagline,
        enabled: true,
        text: prev.tagline.text.slice(0, 26) || 'Creator · Daily Content',
      },
    }));
  };

  // Mobile view mode switcher ('editor' vs 'preview')
  const [mobileViewMode, setMobileViewMode] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      {/* Top Sticky Announcement Banner for the New Feature */}
      <AnnouncementBar
        isVisible={isTopAnnouncementVisible}
        onDismiss={handleDismissTopAnnouncement}
        onOpenBannerStudio={handleOpenBannerStudio}
        onOpenFeatureModal={() => setIsFeatureModalOpen(true)}
      />

      {/* 1. Header Navigation Bar adhering to Top Bar Contract */}
      <TopNav
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        previewTheme={previewTheme}
        setPreviewTheme={setPreviewTheme}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        onOpenFeatureModal={() => setIsFeatureModalOpen(true)}
        onOpenActivator={() => setIsActivatorOpen(true)}
        aestheticScore={aestheticAnalysis.overallScore}
        activeSection={activeNavSection}
        setActiveSection={(sec) => {
          setActiveNavSection(sec);
          if (sec === 'presets') {
            setActiveEditorTab('presets');
            setMobileViewMode('editor');
          }
          if (sec === 'safezones') setIsSafeZonesGuideOpen(true);
        }}
      />

      {/* 2. Main Studio Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile View Switcher (visible on < lg screens) */}
        <div className="lg:hidden mb-4 p-1 bg-slate-900 rounded-xl border border-slate-800 flex items-center">
          <button
            onClick={() => setMobileViewMode('editor')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileViewMode === 'editor'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio Controls</span>
          </button>
          <button
            onClick={() => setMobileViewMode('preview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mobileViewMode === 'preview'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Live TikTok Preview</span>
          </button>
        </div>

        {/* Feature Hero Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-rose-500 p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-rose-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>TikTok Profile Banner Feature Simulator</span>
                <span className="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                  New 2026 Layout
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Preview how the new banner transforms creator profile branding, visual contrast & audience follow rates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            {/* Highly visible Prank Activator Button */}
            <button
              onClick={() => setIsActivatorOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-rose-500 to-pink-500 hover:from-cyan-400 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>Add TikTok Banner to Your Profile</span>
            </button>

            <button
              onClick={() => setIsSafeZonesGuideOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700/80 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Zones Spec</span>
            </button>
            <button
              onClick={() => setIsAnalyzerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-semibold text-cyan-300 border border-cyan-800/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aesthetics: {aestheticAnalysis.overallScore}/100</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (7 Cols): Editor Studio Controls */}
          <div className={`lg:col-span-7 space-y-5 ${mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {/* Control Tabs (Segmented Buttons) */}
            <div id="studio-tabs-container" className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveEditorTab('banner')}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeEditorTab === 'banner'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Banner Studio</span>
                <span className="ml-0.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.7)] animate-pulse flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                  <span>NEW</span>
                </span>
              </button>

              <button
                onClick={() => setActiveEditorTab('profile')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeEditorTab === 'profile'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile Identity</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('grid')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeEditorTab === 'grid'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Video Highlights & Pins</span>
              </button>

              <button
                onClick={() => setActiveEditorTab('presets')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeEditorTab === 'presets'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creator Presets</span>
              </button>
            </div>

            {/* TAB CONTENT: Banner Studio */}
            {activeEditorTab === 'banner' && (
              <BannerEditor banner={banner} setBanner={setBanner} />
            )}

            {/* TAB CONTENT: Profile Identity */}
            {activeEditorTab === 'profile' && (
              <ProfileEditor profile={profile} setProfile={setProfile} />
            )}

            {/* TAB CONTENT: Grid Highlights */}
            {activeEditorTab === 'grid' && (
              <GridEditor videos={videos} setVideos={setVideos} />
            )}

            {/* TAB CONTENT: Creator Presets */}
            {activeEditorTab === 'presets' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>One-Click Creator Aesthetic Presets</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Switch between distinct creator niches to test how TikTok banners look for different content styles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_CREATORS.map((p) => {
                    const isSelected = profile.username === p.profile.username;
                    return (
                      <div
                        key={p.id}
                        className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'border-cyan-400 bg-slate-900/90 ring-1 ring-cyan-400/50'
                            : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          {/* Banner mini preview */}
                          <div
                            className="w-full h-14 rounded-lg mb-2.5 relative overflow-hidden flex items-center justify-between px-3"
                            style={{ background: p.banner.backgroundStyle }}
                          >
                            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                              {p.banner.badge.text || p.niche}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                              {p.banner.aspectRatio}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{p.name}</span>
                            <span className="text-[11px] text-cyan-400 font-medium">{p.niche}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {p.profile.bio}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 font-mono">
                            @{p.profile.username}
                          </span>
                          <button
                            onClick={() => handleLoadPreset(p)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                            <span>{isSelected ? 'Active Preset' : 'Apply Preset'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (5 Cols): Realistic Sticky TikTok Phone Preview */}
          <div className={`lg:col-span-5 lg:sticky lg:top-20 flex flex-col items-center ${mobileViewMode === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>Live Interactive TikTok Preview</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Tap banner or avatar to edit
              </span>
            </div>

            {/* Feature Highlight Callout on Live Preview */}
            <div className="w-full max-w-[400px] mb-2.5 px-0.5">
              <button
                onClick={handleOpenBannerStudio}
                className="w-full py-2 px-3.5 rounded-xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/70 border border-rose-500/40 hover:border-rose-400 text-xs text-white flex items-center justify-between transition-all group shadow-md shadow-rose-950/40 cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="font-semibold text-rose-200 truncate">
                    ✨ Add TikTok Banner Feature
                  </span>
                  <span className="hidden sm:inline text-[11px] text-slate-400">
                    — Visual profile header
                  </span>
                </div>
                <span className="text-[11px] text-cyan-300 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                  <span>Customize</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* The Realistic TikTok Mobile Shell */}
            <TikTokPhoneFrame
              banner={banner}
              profile={activeProfile}
              previewDevice={previewDevice}
              previewTheme={previewTheme}
              onBannerClick={() => setActiveEditorTab('banner')}
              onAvatarClick={() => setActiveEditorTab('profile')}
              onEditProfileClick={() => setActiveEditorTab('profile')}
              onSelectVideo={(vid) => setSelectedVideo(vid)}
              isInspectingSafeZones={banner.showSafeZones}
            />

            {/* Quick action bar beneath preview */}
            <div className="mt-4 flex items-center gap-2 w-full max-w-[400px] justify-center">
              <button
                onClick={() =>
                  setBanner((prev) => ({
                    ...prev,
                    showSafeZones: !prev.showSafeZones,
                  }))
                }
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                  banner.showSafeZones
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{banner.showSafeZones ? 'Hide Safe Zones' : 'Show Safe Zones'}</span>
              </button>

              <button
                onClick={() => setIsExportOpen(true)}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Export Banner</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">TikTok Profile Banner Studio</span>
            <span>·</span>
            <span>Simulating the TikTok 2026 Profile Banner release</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Recommended Spec: 1080x360 px (3:1)</span>
            <span>·</span>
            <button
              onClick={() => setIsSafeZonesGuideOpen(true)}
              className="hover:text-white underline cursor-pointer"
            >
              Safe Zone Blueprint
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AestheticScoreModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        analysis={aestheticAnalysis}
        onApplyRecommended={handleApplyOptimalEnhancements}
      />

      <SafeZonesGuideModal
        isOpen={isSafeZonesGuideOpen}
        onClose={() => setIsSafeZonesGuideOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        banner={banner}
        profile={activeProfile}
      />

      <VideoPreviewModal
        video={selectedVideo}
        profile={activeProfile}
        onClose={() => setSelectedVideo(null)}
      />

      <FeatureHighlightModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        onOpenBannerStudio={handleOpenBannerStudio}
        onOpenSafeZones={() => {
          setIsFeatureModalOpen(false);
          setIsSafeZonesGuideOpen(true);
        }}
      />

      {/* Prank Banner Activator Modal Flow */}
      <BannerActivator
        isOpen={isActivatorOpen}
        onClose={() => setIsActivatorOpen(false)}
      />
    </div>
  );
}
