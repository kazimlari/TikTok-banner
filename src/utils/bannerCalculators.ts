import type { BannerConfig, ProfileIdentity } from '../types/profile.ts';

/**
 * Formats a number to TikTok style compact strings (e.g. 1.2M, 850K, 420)
 */
export function formatCount(count: number): string {
  if (count == null || isNaN(count) || count < 0) return '0';
  if (count >= 1_000_000_000) {
    const val = count / 1_000_000_000;
    return val >= 10 ? `${Math.floor(val)}B` : `${val.toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (count >= 1_000_000) {
    const val = count / 1_000_000;
    return val >= 10 ? `${Math.floor(val)}M` : `${val.toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (count >= 10_000) {
    const val = count / 1_000;
    return val >= 100 ? `${Math.floor(val)}K` : `${val.toFixed(1).replace(/\.0$/, '')}K`;
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toLocaleString();
}

export interface AestheticAnalysisResult {
  overallScore: number; // 0 - 100
  bannerScore: number;
  readabilityScore: number;
  engagementScore: number;
  safeZoneStatus: 'optimal' | 'warning' | 'critical';
  highlights: string[];
  recommendations: string[];
}

/**
 * Calculates aesthetic harmony and engagement potential of the TikTok profile setup
 */
export function calculateProfileAesthetics(
  banner: BannerConfig,
  profile: ProfileIdentity
): AestheticAnalysisResult {
  let bannerScore = 60;
  let readabilityScore = 70;
  let engagementScore = 65;
  const highlights: string[] = [];
  const recommendations: string[] = [];

  // Banner checks
  if (banner.backgroundStyle || banner.imageUrl) {
    bannerScore += 15;
    highlights.push('Custom aesthetic banner active');
  }

  if (banner.overlayScrim !== 'none') {
    readabilityScore += 15;
    highlights.push('Contrast scrim ensures banner-to-profile legibility');
  } else {
    recommendations.push('Add a bottom-fade scrim to prevent avatar/status blend-in');
  }

  // Safe zones check
  let safeZoneStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
  if (banner.tagline.enabled && banner.tagline.text.length > 28) {
    safeZoneStatus = 'warning';
    readabilityScore -= 10;
    recommendations.push('Tagline exceeds 28 characters; risks getting obscured by status bar or avatar on small phones');
  }

  if (banner.badge.enabled) {
    if (banner.badge.position === 'top-left') {
      // Top left can conflict with back button or live indicator
      recommendations.push('Top-left badge may overlap TikTok status bar / back icon; top-right recommended');
      safeZoneStatus = 'warning';
    } else {
      highlights.push('Badge positioned in clear safe visibility zone');
      engagementScore += 10;
    }
  }

  // Profile completeness check
  if (profile.bio && profile.bio.trim().length > 10) {
    engagementScore += 10;
    if (profile.bio.includes('#') || profile.bio.includes('@')) {
      highlights.push('Interactive hashtags/mentions in bio drive discoverability');
      engagementScore += 5;
    }
  } else {
    recommendations.push('Expand bio with targeted niche keywords and call-to-action');
  }

  if (profile.linkUrl && profile.linkUrl.trim().length > 0) {
    engagementScore += 10;
    highlights.push('Direct link-in-bio enabled for audience conversion');
  } else {
    recommendations.push('Add a link-in-bio (e.g. store, Spotify, Linktree) to maximize profile traffic');
  }

  if (profile.isVerified) {
    engagementScore += 5;
    highlights.push('Verified badge establishes trust & authority');
  }

  if (profile.storyRing !== 'none') {
    engagementScore += 5;
    highlights.push('Active story / live profile ring draws immediate eye focus');
  }

  const pinnedCount = profile.videos.filter(v => v.isPinned).length;
  if (pinnedCount >= 1 && pinnedCount <= 3) {
    engagementScore += 10;
    highlights.push(`${pinnedCount} curated pinned video${pinnedCount > 1 ? 's' : ''} anchor top profile impressions`);
  } else if (pinnedCount === 0) {
    recommendations.push('Pin 1 to 3 viral/key introduction videos to anchor first impressions');
  }

  // Normalize scores within 0 - 100
  bannerScore = Math.min(100, Math.max(20, bannerScore));
  readabilityScore = Math.min(100, Math.max(20, readabilityScore));
  engagementScore = Math.min(100, Math.max(20, engagementScore));

  const overallScore = Math.round(
    bannerScore * 0.35 + readabilityScore * 0.35 + engagementScore * 0.3
  );

  return {
    overallScore,
    bannerScore,
    readabilityScore,
    engagementScore,
    safeZoneStatus,
    highlights,
    recommendations,
  };
}

/**
 * Tokenizes bio text into plain text, hashtags, and mentions
 */
export interface BioToken {
  type: 'text' | 'hashtag' | 'mention' | 'url';
  value: string;
}

export function parseBioTokens(bio: string): BioToken[] {
  if (!bio) return [];
  const regex = /(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_.]+|https?:\/\/[^\s]+)/g;
  const tokens: BioToken[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(bio)) !== null) {
    if (match.index > lastIdx) {
      tokens.push({
        type: 'text',
        value: bio.substring(lastIdx, match.index),
      });
    }
    const val = match[0];
    if (val.startsWith('#')) {
      tokens.push({ type: 'hashtag', value: val });
    } else if (val.startsWith('@')) {
      tokens.push({ type: 'mention', value: val });
    } else {
      tokens.push({ type: 'url', value: val });
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < bio.length) {
    tokens.push({
      type: 'text',
      value: bio.substring(lastIdx),
    });
  }

  return tokens;
}

/**
 * TikTok Banner Recommended Dimensions & Safe-Zone Coordinates
 */
export const TIKTOK_BANNER_SPEC = {
  recommendedWidth: 1080,
  recommendedHeight: 360, // 3:1 ratio standard
  ultraWidth: 1920,
  ultraHeight: 640,
  avatarSafeMarginBottomPercent: 28, // Avatar intrudes into bottom 28%
  topStatusBarMarginPercent: 22, // Status bar and top actions cover top 22%
  centralSafeZoneHeightPercent: 50, // Best safe viewing region for text/logos
};
