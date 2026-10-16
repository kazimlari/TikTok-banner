import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FEATURE_HIGHLIGHTS,
  getInitialAnnouncementState,
  saveTopBannerDismissed,
} from './featureHighlights.ts';

test('FEATURE_HIGHLIGHTS array contains all required highlight definitions', () => {
  assert.equal(FEATURE_HIGHLIGHTS.length, 3);
  assert.equal(FEATURE_HIGHLIGHTS[0].id, 'visual_aesthetics');
  assert.equal(FEATURE_HIGHLIGHTS[1].id, 'safe_zones');
  assert.equal(FEATURE_HIGHLIGHTS[2].id, 'conversion_badges');
});

test('getInitialAnnouncementState defaults safely without throwing in node environment', () => {
  const state = getInitialAnnouncementState();
  assert.equal(typeof state.isTopBannerDismissed, 'boolean');
  assert.equal(typeof state.isModalDismissed, 'boolean');
  assert.equal(typeof state.neverShowModalAgain, 'boolean');
});

test('saveTopBannerDismissed handles node environment gracefully without throwing', () => {
  assert.doesNotThrow(() => {
    saveTopBannerDismissed(true);
  });
});
