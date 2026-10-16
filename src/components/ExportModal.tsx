import React, { useRef, useState } from 'react';
import type { BannerConfig, ProfileIdentity } from '../types/profile.ts';
import { X, Download, Copy, Check, Shield, Image, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: BannerConfig;
  profile: ProfileIdentity;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  banner,
  profile,
}) => {
  const [copied, setCopied] = useState(false);
  const [includeSafeZonesInExport, setIncludeSafeZonesInExport] = useState(false);
  const [exportResolution, setExportResolution] = useState<'1080x360' | '1920x640'>('1080x360');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!isOpen) return null;

  const handleDownloadBanner = () => {
    const width = exportResolution === '1080x360' ? 1080 : 1920;
    const height = exportResolution === '1080x360' ? 360 : 640;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Render gradient or image
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (banner.backgroundStyle.includes('#ec4899')) {
      grad.addColorStop(0, '#050505');
      grad.addColorStop(0.5, '#3b0764');
      grad.addColorStop(1, '#ec4899');
    } else if (banner.backgroundStyle.includes('#06b6d4')) {
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.4, '#1e1b4b');
      grad.addColorStop(0.8, '#06b6d4');
      grad.addColorStop(1, '#a855f7');
    } else if (banner.backgroundStyle.includes('#f5f0eb')) {
      grad.addColorStop(0, '#f5f0eb');
      grad.addColorStop(0.5, '#e6ded3');
      grad.addColorStop(1, '#d8cbbe');
    } else if (banner.backgroundStyle.includes('#84cc16')) {
      grad.addColorStop(0, '#18181b');
      grad.addColorStop(0.5, '#27272a');
      grad.addColorStop(1, '#84cc16');
    } else {
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#06b6d4');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Scrim overlay
    if (banner.overlayScrim === 'bottom-fade') {
      const scrim = ctx.createLinearGradient(0, height * 0.4, 0, height);
      scrim.addColorStop(0, 'rgba(0,0,0,0)');
      scrim.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = scrim;
      ctx.fillRect(0, 0, width, height);
    }

    // Tagline text
    if (banner.tagline.enabled && banner.tagline.text) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${width > 1200 ? 36 : 24}px sans-serif`;
      ctx.fillText(banner.tagline.text, 40, height - 50);
    }

    // Badge
    if (banner.badge.enabled && banner.badge.text) {
      const badgeText = banner.badge.text.toUpperCase();
      ctx.font = `bold ${width > 1200 ? 22 : 16}px sans-serif`;
      const textWidth = ctx.measureText(badgeText).width;
      const bX = width - textWidth - 60;
      const bY = 40;
      const bH = 36;
      const bW = textWidth + 30;

      ctx.fillStyle = 'rgba(244, 63, 94, 0.9)';
      ctx.beginPath();
      ctx.roundRect(bX, bY, bW, bH, 18);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(badgeText, bX + 15, bY + 24);
    }

    // Optional safe zone guide lines
    if (includeSafeZonesInExport) {
      // Top status bar limit
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(0, 0, width, height * 0.22);

      // Safe sweet spot
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 6]);
      ctx.strokeRect(40, height * 0.24, width - 80, height * 0.48);

      // Avatar circle cutout
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.9)';
      ctx.beginPath();
      ctx.arc(width / 2, height, width > 1200 ? 140 : 90, 0, Math.PI, true);
      ctx.stroke();
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `tiktok-banner-${banner.name.toLowerCase().replace(/\s+/g, '-')}-${exportResolution}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyConfig = () => {
    const config = {
      app: 'TikTok Profile Banner Studio',
      banner,
      profile: {
        displayName: profile.displayName,
        username: profile.username,
        bio: profile.bio,
        category: profile.category,
        followersCount: profile.followersCount,
      },
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-950 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Export TikTok Profile Banner</h3>
              <p className="text-xs text-slate-400">Production dimensions & template assets</p>
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
        <div className="p-6 space-y-5">
          {/* Resolution Options */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Dimensions & Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setExportResolution('1080x360')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  exportResolution === '1080x360'
                    ? 'border-pink-400 bg-pink-950/30 text-pink-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <div className="font-bold text-xs text-white">1080 x 360 px (3:1)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  TikTok Official Recommended Spec
                </div>
              </button>

              <button
                onClick={() => setExportResolution('1920x640')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  exportResolution === '1920x640'
                    ? 'border-pink-400 bg-pink-950/30 text-pink-200'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <div className="font-bold text-xs text-white">1920 x 640 px (Ultra HD)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  High-DPI Retina Screen Quality
                </div>
              </button>
            </div>
          </div>

          {/* Safe Zone Guide Lines In Export */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-white">
                  Burn Safe Zone Lines into Export
                </div>
                <div className="text-[11px] text-slate-400">
                  Useful as a Photoshop / Canva template guide
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeSafeZonesInExport}
                onChange={(e) => setIncludeSafeZonesInExport(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" />
            </label>
          </div>

          {/* Banner Summary Pill */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Banner Name:</span>
              <span className="font-semibold text-white">{banner.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Callout Badge:</span>
              <span className="text-cyan-300">
                {banner.badge.enabled ? banner.badge.text : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target Profile:</span>
              <span className="text-rose-300">@{profile.username}</span>
            </div>
          </div>
        </div>

        {/* Hidden Canvas for High-DPI Render */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={handleCopyConfig}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Config Copied!' : 'Copy Config JSON'}</span>
          </button>

          <button
            onClick={handleDownloadBanner}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all shadow-md shadow-pink-500/25"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG ({exportResolution})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
