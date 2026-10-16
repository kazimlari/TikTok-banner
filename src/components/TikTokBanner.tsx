import React from 'react';
import type { BannerConfig } from '../types/profile.ts';
import { Sparkles, Radio, Zap, Music, Flame, Info } from 'lucide-react';

interface TikTokBannerProps {
  banner: BannerConfig;
  onBannerClick?: () => void;
  isInspectingSafeZones?: boolean;
}

export const TikTokBanner: React.FC<TikTokBannerProps> = ({
  banner,
  onBannerClick,
  isInspectingSafeZones = false,
}) => {
  // Map aspect ratio
  const getAspectRatioClass = () => {
    switch (banner.aspectRatio) {
      case '16:9':
        return 'aspect-[16/9] min-h-[140px]';
      case '4:1':
        return 'aspect-[4/1] min-h-[90px]';
      case '2.5:1':
        return 'aspect-[5/2] min-h-[120px]';
      case '3:1':
      default:
        return 'aspect-[3/1] min-h-[105px]';
    }
  };

  // Overlay scrim classes
  const getScrimClass = () => {
    switch (banner.overlayScrim) {
      case 'bottom-fade':
        return 'bg-gradient-to-b from-transparent via-black/20 to-black/75';
      case 'dark-vignette':
        return 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/80';
      case 'cyber-tint':
        return 'bg-gradient-to-r from-cyan-900/40 via-purple-900/30 to-pink-900/40 mix-blend-overlay';
      case 'glow-soft':
        return 'bg-gradient-to-t from-black/60 via-indigo-950/20 to-transparent';
      case 'none':
      default:
        return '';
    }
  };

  // Badge icon selector
  const renderBadgeIcon = () => {
    switch (banner.badge.icon) {
      case 'radio':
        return <Radio className="w-3 h-3 text-red-400 animate-pulse" />;
      case 'zap':
        return <Zap className="w-3 h-3 text-lime-400" />;
      case 'music':
        return <Music className="w-3 h-3 text-purple-400" />;
      case 'flame':
        return <Flame className="w-3 h-3 text-orange-400" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-3 h-3 text-amber-300" />;
    }
  };

  // Badge styling
  const getBadgeStyle = () => {
    switch (banner.badge.theme) {
      case 'neon':
        return 'bg-black/70 border border-cyan-400/60 text-cyan-200 shadow-sm shadow-cyan-500/20';
      case 'accent':
        return 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/30';
      case 'dark':
        return 'bg-slate-900/90 text-white border border-slate-700/80';
      case 'glass':
      default:
        return 'bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm';
    }
  };

  const getBadgePosition = () => {
    switch (banner.badge.position) {
      case 'top-left':
        return 'top-8 left-3';
      case 'bottom-right':
        return 'bottom-3 right-3';
      case 'top-right':
      default:
        return 'top-8 right-3';
    }
  };

  const getTaglineFontStyle = () => {
    switch (banner.tagline.fontStyle) {
      case 'display':
        return 'font-extrabold tracking-tight uppercase text-white';
      case 'mono':
        return 'font-mono tracking-wider text-slate-100';
      case 'sans':
      default:
        return 'font-medium tracking-normal text-white';
    }
  };

  const filterStyle = {
    filter: `blur(${banner.blur}px) brightness(${banner.brightness}%) contrast(${banner.contrast}%)`,
  };

  return (
    <div
      onClick={onBannerClick}
      className={`relative w-full overflow-hidden transition-all duration-300 cursor-pointer group ${getAspectRatioClass()}`}
      style={{
        backgroundImage: banner.imageUrl
          ? `url("${banner.imageUrl}")`
          : (banner.backgroundStyle || 'none'),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...filterStyle,
      }}
    >
      {/* Fallback CSS pattern if image is missing */}
      {!banner.backgroundStyle && !banner.imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center text-xs text-slate-400">
          No Banner Set
        </div>
      )}

      {/* Decorative subtle texture lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Scrim overlay */}
      <div className={`absolute inset-0 ${getScrimClass()} pointer-events-none`} />

      {/* Tagline overlay */}
      {banner.tagline.enabled && banner.tagline.text && (
        <div className="absolute bottom-3 left-4 right-20 pointer-events-none z-10">
          <p
            className={`text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate ${getTaglineFontStyle()}`}
          >
            {banner.tagline.text}
          </p>
        </div>
      )}

      {/* Banner Callout Badge */}
      {banner.badge.enabled && banner.badge.text && (
        <div
          className={`absolute z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md transition-transform group-hover:scale-105 ${getBadgePosition()} ${getBadgeStyle()}`}
        >
          {renderBadgeIcon()}
          <span>{banner.badge.text}</span>
        </div>
      )}

      {/* Interactive Safe Zone Visual Overlay */}
      {(banner.showSafeZones || isInspectingSafeZones) && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between">
          {/* Top Status Bar Zone (22%) */}
          <div className="h-[26%] bg-red-500/25 border-b border-dashed border-red-400 flex items-center justify-between px-3 text-[10px] text-red-200 font-mono">
            <span>TikTok Header & Status Bar Area (Hidden / Obscured)</span>
            <span className="bg-red-950/80 px-1 rounded">DO NOT PUT TEXT</span>
          </div>

          {/* Central Safe Viewing Sweet Spot */}
          <div className="flex-1 flex items-center justify-between px-3 border-y border-emerald-400/60 bg-emerald-500/10 text-[10px] text-emerald-200 font-mono">
            <span>SAFE BRANDING SWEET SPOT (Recommended 1080x360)</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded font-bold">100% VISIBLE</span>
          </div>

          {/* Bottom Avatar Encroachment Zone */}
          <div className="relative h-[30%] bg-amber-500/20 border-t border-dashed border-amber-400 flex items-end justify-center pb-1 text-[10px] text-amber-200 font-mono">
            <span className="z-10 bg-amber-950/80 px-1.5 rounded">Avatar Cutout Zone</span>
            {/* Cutout circle silhouette */}
            <div className="absolute bottom-[-28px] w-20 h-20 rounded-full border-2 border-dashed border-amber-300 bg-amber-900/40 pointer-events-none flex items-center justify-center text-[9px] text-amber-100 font-bold" />
          </div>
        </div>
      )}
    </div>
  );
};
