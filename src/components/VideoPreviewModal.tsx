import React, { useState } from 'react';
import type { VideoClip, ProfileIdentity } from '../types/profile.ts';
import { X, Heart, MessageSquare, Bookmark, Share2, Music, Volume2, Play } from 'lucide-react';
import { formatCount } from '../utils/bannerCalculators.ts';

interface VideoPreviewModalProps {
  video: VideoClip | null;
  profile: ProfileIdentity;
  onClose: () => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  video,
  profile,
  onClose,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesDelta, setLikesDelta] = useState(0);

  if (!video) return null;

  const baseLikes = Math.round(video.views * 0.12);

  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesDelta((d) => d - 1);
    } else {
      setIsLiked(true);
      setLikesDelta((d) => d + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between p-4 bg-black text-white">
        {/* Background visual */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${video.bgGradient} opacity-90`}
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between text-xs pt-2">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
            <Play className="w-3 h-3 fill-current text-cyan-400" />
            <span className="font-mono">{formatCount(video.views)} views</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close video preview"
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Icons Column */}
        <div className="relative z-10 self-end flex flex-col items-center gap-4 pb-14 text-center">
          {/* Avatar button */}
          <div className="relative mb-1">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-xs font-bold">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                profile.displayName.charAt(0) || 'T'
              )}
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[11px] font-bold shadow">
              +
            </div>
          </div>

          {/* Like */}
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-0.5 group active:scale-90 transition-transform"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isLiked ? 'bg-rose-500/20 text-rose-500' : 'bg-black/40 text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-rose-500' : ''}`} />
            </div>
            <span className="text-[11px] font-bold tabular-nums">
              {formatCount(baseLikes + likesDelta)}
            </span>
          </button>

          {/* Comments */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold tabular-nums">
              {formatCount(Math.round(video.views * 0.015))}
            </span>
          </div>

          {/* Bookmark */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold tabular-nums">
              {formatCount(Math.round(video.views * 0.008))}
            </span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold">Share</span>
          </div>

          {/* Spinning music disc */}
          <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center animate-spin [animation-duration:4s]">
            <Music className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Bottom Metadata & Sound */}
        <div className="relative z-10 space-y-1.5 pb-2">
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>@{profile.username}</span>
            {video.isPinned && (
              <span className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black">
                {video.pinLabel || 'PINNED'}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
            {video.title}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-300">
            <Music className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">original sound - @{profile.username} · Tokyo Beats</span>
          </div>
        </div>
      </div>
    </div>
  );
};
