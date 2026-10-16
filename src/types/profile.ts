export interface BannerConfig {
  id: string;
  type: 'preset' | 'gradient' | 'custom' | 'pattern';
  name: string;
  backgroundStyle: string; // CSS background or linear-gradient or url(...)
  imageUrl?: string;
  aspectRatio: '3:1' | '16:9' | '4:1' | '2.5:1';
  blur: number; // 0 to 20 px
  brightness: number; // 50 to 150 %
  contrast: number; // 50 to 150 %
  overlayScrim: 'none' | 'bottom-fade' | 'dark-vignette' | 'cyber-tint' | 'glow-soft';
  badge: {
    enabled: boolean;
    text: string;
    icon: string;
    theme: 'glass' | 'accent' | 'dark' | 'neon';
    position: 'top-left' | 'top-right' | 'bottom-right';
  };
  tagline: {
    enabled: boolean;
    text: string;
    fontStyle: 'sans' | 'display' | 'mono';
  };
  showSafeZones: boolean;
}

export interface VideoClip {
  id: string;
  title: string;
  views: number;
  isPinned: boolean;
  pinLabel?: string;
  bgGradient: string;
  category: string;
  likesCount?: number;
}

export interface ProfileIdentity {
  displayName: string;
  username: string;
  isVerified: boolean;
  category: string;
  avatarUrl: string;
  avatarShape: 'circle' | 'rounded';
  storyRing: 'none' | 'rainbow' | 'live' | 'gold' | 'neon';
  bio: string;
  linkUrl: string;
  linkTitle: string;
  pronouns: string;
  showPronouns: boolean;
  location: string;
  showLocation: boolean;
  followingCount: number;
  followersCount: number;
  likesCount: number;
  activeRole: 'owner' | 'visitor';
  shopActive: boolean;
  playlists: string[];
  videos: VideoClip[];
}

export interface PresetCreator {
  id: string;
  name: string;
  niche: string;
  banner: BannerConfig;
  profile: ProfileIdentity;
}
