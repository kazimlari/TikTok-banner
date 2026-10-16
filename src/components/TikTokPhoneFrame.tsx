import React, { useState } from 'react';
import type { BannerConfig, ProfileIdentity, VideoClip } from '../types/profile.ts';
import { TikTokBanner } from './TikTokBanner.tsx';
import { formatCount, parseBioTokens } from '../utils/bannerCalculators.ts';
import {
  CheckCircle2,
  Link as LinkIcon,
  Grid,
  ShoppingBag,
  Bookmark,
  Heart,
  Share2,
  ChevronDown,
  Bell,
  Search,
  Plus,
  Play,
  Flame,
  Home,
  Users,
  MessageSquare,
  User,
  SlidersHorizontal,
  MapPin,
  Lock,
  Volume2,
} from 'lucide-react';

interface TikTokPhoneFrameProps {
  banner: BannerConfig;
  profile: ProfileIdentity;
  previewDevice: 'iphone' | 'android' | 'tablet' | 'frameless';
  previewTheme: 'dark' | 'light';
  onBannerClick?: () => void;
  onAvatarClick?: () => void;
  onEditProfileClick?: () => void;
  onSelectVideo?: (video: VideoClip) => void;
  isInspectingSafeZones?: boolean;
}

export const TikTokPhoneFrame: React.FC<TikTokPhoneFrameProps> = ({
  banner,
  profile,
  previewDevice,
  previewTheme,
  onBannerClick,
  onAvatarClick,
  onEditProfileClick,
  onSelectVideo,
  isInspectingSafeZones = false,
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'shop' | 'favorites' | 'likes'>('videos');
  const [isFollowing, setIsFollowing] = useState(false);
  const isDark = previewTheme === 'dark';

  // Story ring visual logic
  const getStoryRingStyle = () => {
    switch (profile.storyRing) {
      case 'rainbow':
        return 'p-[3px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600';
      case 'live':
        return 'p-[3px] bg-gradient-to-tr from-rose-500 via-red-600 to-pink-500 animate-pulse';
      case 'gold':
        return 'p-[3px] bg-gradient-to-tr from-amber-300 via-yellow-500 to-amber-600 shadow-md shadow-yellow-500/20';
      case 'neon':
        return 'p-[3px] bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 shadow-md shadow-cyan-400/20';
      case 'none':
      default:
        return 'p-[3px] bg-transparent';
    }
  };

  // Device outer frame style
  const getDeviceFrameClass = () => {
    switch (previewDevice) {
      case 'iphone':
        return 'w-full max-w-[400px] rounded-[48px] border-[10px] border-slate-800 shadow-2xl ring-1 ring-white/10';
      case 'android':
        return 'w-full max-w-[400px] rounded-[38px] border-[8px] border-slate-700 shadow-2xl';
      case 'tablet':
        return 'w-full max-w-[540px] rounded-[36px] border-[12px] border-slate-800 shadow-2xl';
      case 'frameless':
      default:
        return 'w-full max-w-[420px] rounded-2xl border border-slate-800 shadow-xl';
    }
  };

  return (
    <div className={`relative mx-auto transition-all duration-300 overflow-hidden flex flex-col ${getDeviceFrameClass()} ${
      isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
    }`}>
      {/* Phone Hardware Notch / Dynamic Island */}
      {previewDevice === 'iphone' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full flex items-center justify-end px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>
      )}

      {/* Android Punch Hole Camera */}
      {previewDevice === 'android' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 w-3.5 h-3.5 bg-black rounded-full border border-slate-800" />
      )}

      {/* Mobile OS Status Bar */}
      <div className={`h-11 px-6 flex items-center justify-between text-xs font-semibold z-40 select-none ${
        isDark ? 'text-white' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
      }`}>
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>5G</span>
          <div className="w-4 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
            <div className="h-full w-full bg-current rounded-2xs" />
          </div>
        </div>
      </div>

      {/* TikTok App Top Header */}
      <div className="relative -mt-11 z-30 px-4 pt-11 pb-2 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="font-bold text-base tracking-tight truncate max-w-[140px]">
            {profile.displayName || profile.username}
          </span>
          <ChevronDown className="w-3.5 h-3.5 opacity-80" />
        </div>

        <div className="flex items-center gap-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <button
            aria-label="Search"
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            aria-label="Notifications"
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </button>
          <button
            aria-label="Share profile"
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* THE TIKTOK BANNER FEATURE */}
      <div className="relative">
        <TikTokBanner
          banner={banner}
          onBannerClick={onBannerClick}
          isInspectingSafeZones={isInspectingSafeZones}
        />
      </div>

      {/* Scrollable Profile Body Content */}
      <div className="flex-1 overflow-y-auto max-h-[640px] px-4 pb-20 select-none scrollbar-thin">
        {/* Avatar & Story Ring (Realistic Overlap) */}
        <div className="relative -mt-10 sm:-mt-12 flex flex-col items-center z-20">
          <div
            onClick={onAvatarClick}
            className={`cursor-pointer rounded-full transition-transform active:scale-95 ${getStoryRingStyle()}`}
          >
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 ${
                isDark ? 'border-black bg-slate-900' : 'border-white bg-slate-100'
              } overflow-hidden flex items-center justify-center relative shadow-lg`}
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-cyan-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.displayName ? profile.displayName.charAt(0).toUpperCase() : 'T'}
                </div>
              )}

              {/* Plus add story button if creator view */}
              {profile.storyRing === 'none' && (
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center border-2 border-white font-bold text-sm shadow">
                  +
                </div>
              )}
            </div>
          </div>

          {/* LIVE pulsing badge if storyRing is live */}
          {profile.storyRing === 'live' && (
            <div className="mt-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm shadow-rose-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>LIVE</span>
            </div>
          )}

          {/* Username & Verified Badge */}
          <div className="mt-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-bold tracking-tight">
                @{profile.username || 'username'}
              </span>
              {profile.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400 text-black" />
              )}
            </div>

            {/* Pronouns & Category */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-0.5">
              {profile.category && <span>{profile.category}</span>}
              {profile.category && profile.showPronouns && profile.pronouns && <span>·</span>}
              {profile.showPronouns && profile.pronouns && <span>{profile.pronouns}</span>}
            </div>
          </div>

          {/* Stats Bar (Following / Followers / Likes) */}
          <div className="mt-3.5 flex items-center justify-center gap-6 sm:gap-8 w-full max-w-xs text-center">
            <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-base sm:text-lg font-bold tabular-nums">
                {formatCount(profile.followingCount)}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Following</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-base sm:text-lg font-bold tabular-nums">
                {formatCount(profile.followersCount)}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Followers</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-base sm:text-lg font-bold tabular-nums">
                {formatCount(profile.likesCount)}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Likes</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-3.5 flex items-center justify-center gap-2 w-full max-w-sm">
            {profile.activeRole === 'owner' ? (
              <>
                <button
                  onClick={onEditProfileClick}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Edit profile</span>
                </button>
                <button
                  className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                    isFollowing
                      ? isDark
                        ? 'bg-slate-800 text-slate-200'
                        : 'bg-slate-100 text-slate-900'
                      : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Message
                </button>
                <button
                  className={`p-2.5 rounded-lg transition-all ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Bio text */}
          <div className="mt-3 text-center px-4 w-full">
            <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line text-slate-300">
              {parseBioTokens(profile.bio).map((token, i) => {
                if (token.type === 'hashtag' || token.type === 'mention') {
                  return (
                    <span key={i} className="font-semibold text-cyan-400 hover:underline cursor-pointer">
                      {token.value}
                    </span>
                  );
                }
                return <span key={i}>{token.value}</span>;
              })}
            </p>

            {/* Location */}
            {profile.showLocation && profile.location && (
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{profile.location}</span>
              </div>
            )}

            {/* Link in bio */}
            {profile.linkUrl && (
              <a
                href={profile.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <LinkIcon className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[240px]">
                  {profile.linkTitle || profile.linkUrl}
                </span>
              </a>
            )}
          </div>

          {/* Creator Playlists / Series Pills */}
          {profile.playlists && profile.playlists.length > 0 && (
            <div className="mt-3 w-full overflow-x-auto scrollbar-none flex items-center gap-2 px-1">
              {profile.playlists.map((playlist, idx) => (
                <button
                  key={idx}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                    isDark
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current text-cyan-400" />
                  <span>{playlist}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Grid Tabs */}
        <div className={`mt-4 border-b flex items-center justify-around text-xs font-medium ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('videos')}
            aria-label="Videos tab"
            className={`py-2.5 flex-1 flex justify-center relative transition-colors ${
              activeTab === 'videos'
                ? isDark ? 'text-white' : 'text-slate-900'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            {activeTab === 'videos' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-current rounded-full" />
            )}
          </button>

          {profile.shopActive && (
            <button
              onClick={() => setActiveTab('shop')}
              aria-label="Shop tab"
              className={`py-2.5 flex-1 flex justify-center relative transition-colors ${
                activeTab === 'shop'
                  ? isDark ? 'text-white' : 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {activeTab === 'shop' && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-current rounded-full" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab('favorites')}
            aria-label="Favorites tab"
            className={`py-2.5 flex-1 flex justify-center relative transition-colors ${
              activeTab === 'favorites'
                ? isDark ? 'text-white' : 'text-slate-900'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {activeTab === 'favorites' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-current rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('likes')}
            aria-label="Liked videos tab"
            className={`py-2.5 flex-1 flex justify-center relative transition-colors ${
              activeTab === 'likes'
                ? isDark ? 'text-white' : 'text-slate-900'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            {activeTab === 'likes' && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-current rounded-full" />
            )}
          </button>
        </div>

        {/* Video Grid Feed */}
        {activeTab === 'videos' && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            {profile.videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onSelectVideo && onSelectVideo(vid)}
                className={`relative aspect-[9/16] rounded-sm overflow-hidden cursor-pointer group bg-gradient-to-br ${vid.bgGradient} transition-transform active:scale-95`}
              >
                {/* Visual subtle texture */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Pinned Badge */}
                {vid.isPinned && (
                  <div className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {vid.pinLabel || 'PINNED'}
                  </div>
                )}

                {/* Bottom play count */}
                <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between text-white text-[10px] font-semibold drop-shadow">
                  <div className="flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span className="tabular-nums">{formatCount(vid.views)}</span>
                  </div>
                  <Volume2 className="w-2.5 h-2.5 opacity-70" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TikTok Shop Tab content */}
        {activeTab === 'shop' && (
          <div className="mt-3 p-4 text-center rounded-xl bg-slate-900/50 border border-slate-800">
            <ShoppingBag className="w-8 h-8 mx-auto text-rose-500 mb-2" />
            <h4 className="text-sm font-bold">TikTok Shop Showcase</h4>
            <p className="text-xs text-slate-400 mt-1">
              Merch and affiliate products linked directly to this creator profile.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-left">
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                <div className="aspect-square rounded bg-slate-700 mb-1.5 flex items-center justify-center text-xs text-slate-400">
                  Product 1
                </div>
                <div className="text-xs font-semibold truncate">Official Hoodie</div>
                <div className="text-xs text-rose-400 font-bold">$49.99</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                <div className="aspect-square rounded bg-slate-700 mb-1.5 flex items-center justify-center text-xs text-slate-400">
                  Product 2
                </div>
                <div className="text-xs font-semibold truncate">Preset Pack</div>
                <div className="text-xs text-rose-400 font-bold">$19.99</div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="mt-8 text-center text-xs text-slate-400">
            <Bookmark className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p>Favorite sounds, collections and effects are private</p>
          </div>
        )}

        {/* Likes Tab */}
        {activeTab === 'likes' && (
          <div className="mt-8 text-center text-xs text-slate-400">
            <Lock className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p>This user's liked videos are private</p>
          </div>
        )}
      </div>

      {/* Realistic TikTok Bottom Navigation Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-14 border-t z-40 px-3 flex items-center justify-between text-[10px] font-medium backdrop-blur-md ${
        isDark
          ? 'bg-black/95 border-slate-800 text-slate-400'
          : 'bg-white/95 border-slate-200 text-slate-600'
      }`}>
        <button className="flex flex-col items-center gap-1">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Users className="w-4 h-4" />
          <span>Friends</span>
        </button>
        {/* TikTok Plus button */}
        <div className="relative -mt-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform">
          <div className="w-10 h-7 rounded-lg bg-gradient-to-r from-cyan-400 via-white to-rose-500 p-0.5 flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-slate-950 rounded-md flex items-center justify-center text-white font-bold">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <button className="flex flex-col items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span>Inbox</span>
        </button>
        <button className={`flex flex-col items-center gap-1 ${isDark ? 'text-white font-bold' : 'text-slate-900 font-bold'}`}>
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};
