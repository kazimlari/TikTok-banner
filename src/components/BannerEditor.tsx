import React, { useRef } from 'react';
import type { BannerConfig } from '../types/profile.ts';
import { BANNER_COLOR_PRESETS } from '../data/presets.ts';
import {
  Sparkles,
  Sliders,
  Upload,
  Image as ImageIcon,
  ShieldAlert,
  Type,
  Tag,
  Eye,
  RotateCcw,
} from 'lucide-react';

interface BannerEditorProps {
  banner: BannerConfig;
  setBanner: React.Dispatch<React.SetStateAction<BannerConfig>>;
}

export const BannerEditor: React.FC<BannerEditorProps> = ({ banner, setBanner }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setBanner((prev) => ({
          ...prev,
          type: 'custom',
          imageUrl: url,
          backgroundStyle: '',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetFilters = () => {
    setBanner((prev) => ({
      ...prev,
      blur: 0,
      brightness: 100,
      contrast: 100,
    }));
  };

  return (
    <div className="space-y-6 text-sm text-slate-200">
      {/* 1. Aspect Ratio & Dimensions */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Banner Aspect Ratio</span>
          </label>
          <span className="text-xs text-slate-400 font-mono">
            {banner.aspectRatio === '3:1' ? '1080 x 360 (Official)' : banner.aspectRatio}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: '3:1', label: '3:1 Standard', desc: 'TikTok Official' },
              { id: '16:9', label: '16:9 Deep', desc: 'Cinematic' },
              { id: '4:1', label: '4:1 Slim', desc: 'Header Strip' },
              { id: '2.5:1', label: '2.5:1 Tall', desc: 'Bold Cover' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setBanner((prev) => ({ ...prev, aspectRatio: item.id }))}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                banner.aspectRatio === item.id
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="font-semibold text-xs text-white">{item.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Banner Style & Gradient Presets */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Curated Aesthetic Palettes</span>
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
          {BANNER_COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() =>
                setBanner((prev) => ({
                  ...prev,
                  id: preset.id,
                  type: 'preset',
                  backgroundStyle: preset.gradient,
                  imageUrl: undefined,
                }))
              }
              className={`p-2 rounded-lg border flex flex-col items-start gap-1.5 text-left transition-all group ${
                banner.backgroundStyle === preset.gradient && !banner.imageUrl
                  ? 'border-rose-400 ring-1 ring-rose-400/50 bg-slate-800'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950'
              }`}
            >
              <div
                className="w-full h-8 rounded-md shadow-inner"
                style={{ background: preset.gradient }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white group-hover:text-rose-300 truncate w-full">
                  {preset.name}
                </span>
                <span className="text-[10px] text-slate-400">{preset.category}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Image URL fallback option */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Or paste direct image URL (e.g. https://...)"
            value={banner.imageUrl || ''}
            onChange={(e) =>
              setBanner((prev) => ({
                ...prev,
                imageUrl: e.target.value,
                backgroundStyle: '',
                type: 'custom',
              }))
            }
            className="flex-1 bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          {banner.imageUrl && (
            <button
              onClick={() =>
                setBanner((prev) => ({
                  ...prev,
                  imageUrl: undefined,
                  backgroundStyle: BANNER_COLOR_PRESETS[0].gradient,
                }))
              }
              className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. Image Adjustments & Scrims */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Visual Adjustments & Overlay Scrim</span>
          </label>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Blur Effect</span>
            <span className="font-mono text-cyan-300">{banner.blur}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="16"
            value={banner.blur}
            onChange={(e) =>
              setBanner((prev) => ({ ...prev, blur: Number(e.target.value) }))
            }
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Brightness</span>
            <span className="font-mono text-cyan-300">{banner.brightness}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="140"
            value={banner.brightness}
            onChange={(e) =>
              setBanner((prev) => ({ ...prev, brightness: Number(e.target.value) }))
            }
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Contrast</span>
            <span className="font-mono text-cyan-300">{banner.contrast}%</span>
          </div>
          <input
            type="range"
            min="70"
            max="140"
            value={banner.contrast}
            onChange={(e) =>
              setBanner((prev) => ({ ...prev, contrast: Number(e.target.value) }))
            }
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Overlay Scrim Options */}
        <div className="pt-2">
          <div className="text-xs text-slate-400 mb-2">Contrast Scrim Gradient</div>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: 'bottom-fade', label: 'Bottom Fade', desc: 'Legibility' },
                { id: 'dark-vignette', label: 'Vignette', desc: 'Center Focus' },
                { id: 'cyber-tint', label: 'Cyber Tint', desc: 'Color Pop' },
                { id: 'glow-soft', label: 'Soft Glow', desc: 'Dreamy' },
                { id: 'none', label: 'None', desc: 'Pure Image' },
              ] as const
            ).map((scrim) => (
              <button
                key={scrim.id}
                onClick={() => setBanner((prev) => ({ ...prev, overlayScrim: scrim.id }))}
                className={`p-2 rounded-lg border text-left transition-all ${
                  banner.overlayScrim === scrim.id
                    ? 'border-amber-400 bg-amber-950/30 text-amber-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-semibold">{scrim.label}</div>
                <div className="text-[10px] text-slate-500">{scrim.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Banner Callout Badge & Tagline */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive Overlay Badge & Announcement</span>
        </label>

        {/* Badge Toggle & Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Callout Pill Badge</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={banner.badge.enabled}
                onChange={(e) =>
                  setBanner((prev) => ({
                    ...prev,
                    badge: { ...prev.badge, enabled: e.target.checked },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500" />
            </label>
          </div>

          {banner.badge.enabled && (
            <div className="space-y-3 pt-1 border-t border-slate-800">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Badge Text</label>
                <input
                  type="text"
                  value={banner.badge.text}
                  onChange={(e) =>
                    setBanner((prev) => ({
                      ...prev,
                      badge: { ...prev.badge, text: e.target.value },
                    }))
                  }
                  placeholder="e.g. LIVE 7PM EST, NEW DROP"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Icon</label>
                  <select
                    value={banner.badge.icon}
                    onChange={(e) =>
                      setBanner((prev) => ({
                        ...prev,
                        badge: { ...prev.badge, icon: e.target.value },
                      }))
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="sparkles">✨ Sparkles</option>
                    <option value="radio">📡 Radio / Live</option>
                    <option value="zap">⚡ Lightning Zap</option>
                    <option value="music">🎵 Music Wave</option>
                    <option value="flame">🔥 Flame</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Theme</label>
                  <select
                    value={banner.badge.theme}
                    onChange={(e) =>
                      setBanner((prev) => ({
                        ...prev,
                        badge: {
                          ...prev.badge,
                          theme: e.target.value as BannerConfig['badge']['theme'],
                        },
                      }))
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="neon">Neon Cyber</option>
                    <option value="glass">Glass Frosted</option>
                    <option value="accent">Bold Rose</option>
                    <option value="dark">Dark Slate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Position</label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'top-right', label: 'Top-Right' },
                      { id: 'bottom-right', label: 'Bottom-Right' },
                      { id: 'top-left', label: 'Top-Left' },
                    ] as const
                  ).map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() =>
                        setBanner((prev) => ({
                          ...prev,
                          badge: { ...prev.badge, position: pos.id },
                        }))
                      }
                      className={`py-1.5 px-2 text-xs rounded-lg border text-center transition-all ${
                        banner.badge.position === pos.id
                          ? 'border-pink-400 bg-pink-950/40 text-pink-200 font-semibold'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tagline Toggle & Input */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Banner Tagline / Subtitle</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={banner.tagline.enabled}
                onChange={(e) =>
                  setBanner((prev) => ({
                    ...prev,
                    tagline: { ...prev.tagline, enabled: e.target.checked },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500" />
            </label>
          </div>

          {banner.tagline.enabled && (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                value={banner.tagline.text}
                onChange={(e) =>
                  setBanner((prev) => ({
                    ...prev,
                    tagline: { ...prev.tagline, text: e.target.value },
                  }))
                }
                placeholder="e.g. Streams every Friday · Tokyo sourcing"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="flex items-center gap-2">
                {(['sans', 'display', 'mono'] as const).map((font) => (
                  <button
                    key={font}
                    onClick={() =>
                      setBanner((prev) => ({
                        ...prev,
                        tagline: { ...prev.tagline, fontStyle: font },
                      }))
                    }
                    className={`flex-1 py-1 text-xs rounded-md border capitalize ${
                      banner.tagline.fontStyle === font
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Safe Zones Inspector Toggle */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-xs font-semibold text-white">Safe Zone Visualizer</div>
            <div className="text-[11px] text-slate-400">
              Inspect notch cutoff & avatar obstruction zones
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            setBanner((prev) => ({
              ...prev,
              showSafeZones: !prev.showSafeZones,
            }))
          }
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            banner.showSafeZones
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{banner.showSafeZones ? 'Hide Guides' : 'Show Guides'}</span>
        </button>
      </div>
    </div>
  );
};
