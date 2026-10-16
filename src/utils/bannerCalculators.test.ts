import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCount,
  parseBioTokens,
  calculateProfileAesthetics,
} from './bannerCalculators.ts';
import type { BannerConfig, ProfileIdentity } from '../types/profile.ts';

test('formatCount formats standard number ranges correctly', () => {
  assert.equal(formatCount(0), '0');
  assert.equal(formatCount(350), '350');
  assert.equal(formatCount(1200), '1.2K');
  assert.equal(formatCount(45000), '45K');
  assert.equal(formatCount(1200000), '1.2M');
  assert.equal(formatCount(10500000), '10M');
  assert.equal(formatCount(1500000000), '1.5B');
});

test('parseBioTokens splits text, hashtags, and mentions correctly', () => {
  const bio = 'Digital artist 🎨 collab @studio_tok #creative #vibes';
  const tokens = parseBioTokens(bio);

  assert.equal(tokens.length, 6);
  assert.equal(tokens[0].type, 'text');
  assert.equal(tokens[1].type, 'mention');
  assert.equal(tokens[1].value, '@studio_tok');
  assert.equal(tokens[3].type, 'hashtag');
  assert.equal(tokens[3].value, '#creative');
  assert.equal(tokens[5].type, 'hashtag');
  assert.equal(tokens[5].value, '#vibes');
});

test('calculateProfileAesthetics returns accurate score and recommendations', () => {
  const dummyBanner: BannerConfig = {
    id: 'test',
    type: 'preset',
    name: 'Cyber Wave',
    backgroundStyle: 'linear-gradient(135deg, #0f172a, #06b6d4)',
    aspectRatio: '3:1',
    blur: 0,
    brightness: 100,
    contrast: 100,
    overlayScrim: 'bottom-fade',
    badge: {
      enabled: true,
      text: 'NEW DROP',
      icon: 'sparkles',
      theme: 'neon',
      position: 'top-right',
    },
    tagline: {
      enabled: true,
      text: 'Streams every Friday!',
      fontStyle: 'sans',
    },
    showSafeZones: false,
  };

  const dummyProfile: ProfileIdentity = {
    displayName: 'Alex Cyber',
    username: 'alex.cyber',
    isVerified: true,
    category: 'Gaming Creator',
    avatarUrl: '',
    avatarShape: 'circle',
    storyRing: 'live',
    bio: 'Playing neon racers & chill beats 🎮 #gaming',
    linkUrl: 'https://twitch.tv/alexcyber',
    linkTitle: 'twitch.tv/alexcyber',
    pronouns: 'they/them',
    showPronouns: true,
    location: 'Tokyo, Japan',
    showLocation: true,
    followingCount: 320,
    followersCount: 840000,
    likesCount: 14200000,
    activeRole: 'owner',
    shopActive: true,
    playlists: ['Highlights', 'Setup Tour'],
    videos: [
      {
        id: '1',
        title: 'New setup reveal!',
        views: 1200000,
        isPinned: true,
        bgGradient: 'from-cyan-500 to-blue-600',
        category: 'Gaming',
      },
    ],
  };

  const result = calculateProfileAesthetics(dummyBanner, dummyProfile);

  assert.ok(result.overallScore >= 70, 'Overall score should be high for complete profile');
  assert.equal(result.safeZoneStatus, 'optimal');
  assert.ok(result.highlights.length > 0);
});
