/**
 * Helper utilities for TikTok Banner Feature announcements and onboarding state
 */

export interface FeatureAnnouncementState {
  isTopBannerDismissed: boolean;
  isModalDismissed: boolean;
  neverShowModalAgain: boolean;
}

export const STORAGE_KEYS = {
  TOP_BANNER_DISMISSED: 'tt_banner_top_announcement_dismissed',
  MODAL_DISMISSED: 'tt_banner_modal_dismissed',
  NEVER_SHOW_MODAL: 'tt_banner_never_show_modal',
};

export function getInitialAnnouncementState(): FeatureAnnouncementState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      isTopBannerDismissed: false,
      isModalDismissed: false,
      neverShowModalAgain: false,
    };
  }

  try {
    const topDismissed = window.localStorage.getItem(STORAGE_KEYS.TOP_BANNER_DISMISSED) === 'true';
    const neverShow = window.localStorage.getItem(STORAGE_KEYS.NEVER_SHOW_MODAL) === 'true';
    const modalDismissed = neverShow || window.sessionStorage.getItem(STORAGE_KEYS.MODAL_DISMISSED) === 'true';

    return {
      isTopBannerDismissed: topDismissed,
      isModalDismissed: modalDismissed,
      neverShowModalAgain: neverShow,
    };
  } catch {
    return {
      isTopBannerDismissed: false,
      isModalDismissed: false,
      neverShowModalAgain: false,
    };
  }
}

export function saveTopBannerDismissed(dismissed: boolean): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEYS.TOP_BANNER_DISMISSED, dismissed ? 'true' : 'false');
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
}

export function saveModalDismissed(neverShowAgain: boolean): void {
  try {
    if (typeof window !== 'undefined') {
      if (neverShowAgain && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEYS.NEVER_SHOW_MODAL, 'true');
      }
      if (window.sessionStorage) {
        window.sessionStorage.setItem(STORAGE_KEYS.MODAL_DISMISSED, 'true');
      }
    }
  } catch {
    // Ignore storage errors
  }
}

export const FEATURE_HIGHLIGHTS = [
  {
    id: 'visual_aesthetics',
    title: 'Visual Identity & Header Aesthetics',
    description: 'Transform your TikTok profile from standard grid to high-impact visual branding with customizable gradients, custom photo uploads, and photo filters.',
    tag: '3:1 & 16:9 Ratios',
  },
  {
    id: 'safe_zones',
    title: 'Safe-Zone Layout Protection',
    description: 'Guarantees text, logos, and critical announcements never get hidden behind device notches, status bars, or circular avatar cutouts.',
    tag: '100% Mobile Safe',
  },
  {
    id: 'conversion_badges',
    title: 'Announcement Badges & Taglines',
    description: 'Add interactive callouts like "LIVE 7PM EST", "NEW SINGLE", or "LIMITED DROP" to drive viewers directly into your bio links and live streams.',
    tag: 'Engagement Booster',
  },
];
