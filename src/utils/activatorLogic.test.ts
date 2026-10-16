import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ACTIVATION_STEPS,
  STEP_DURATIONS_MS,
  getStepDuration,
  validateTikTokLink,
  getNextStepIndex,
} from './activatorLogic.ts';

test('ACTIVATION_STEPS contains the exact 5 specified prank simulation steps', () => {
  assert.equal(ACTIVATION_STEPS.length, 5);
  assert.equal(ACTIVATION_STEPS[0], 'Searching account in the TikTok server...');
  assert.equal(ACTIVATION_STEPS[1], 'Validating profile compatibility...');
  assert.equal(ACTIVATION_STEPS[2], 'Bypassing standard layout restrictions...');
  assert.equal(ACTIVATION_STEPS[3], 'Injecting Banner Beta access code...');
  assert.equal(ACTIVATION_STEPS[4], 'Finalizing profile synchronization...');
});

test('STEP_DURATIONS_MS has realistic non-trivial loading times for all 5 steps', () => {
  assert.equal(STEP_DURATIONS_MS.length, 5);
  // All steps should be between 1200ms and 2500ms to feel authentic and real
  for (const duration of STEP_DURATIONS_MS) {
    assert.ok(duration >= 1200 && duration <= 2500, `Expected duration ${duration} to be realistic`);
  }
  assert.equal(getStepDuration(0), 1800);
  assert.equal(getStepDuration(3), 2100);
  assert.equal(getStepDuration(99), 1500); // Fallback
});

test('validateTikTokLink validates inputs appropriately', () => {
  assert.equal(validateTikTokLink('').isValid, false);
  assert.equal(validateTikTokLink('   ').isValid, false);
  assert.equal(validateTikTokLink('https://www.tiktok.com/@creator').isValid, true);
  assert.equal(validateTikTokLink('https://vt.tiktok.com/ZS2345/').isValid, true);
  assert.equal(validateTikTokLink('@alexrivers').isValid, true);
});

test('getNextStepIndex increments step sequentially up to total count', () => {
  assert.equal(getNextStepIndex(0), 1);
  assert.equal(getNextStepIndex(3), 4);
  assert.equal(getNextStepIndex(4), 5);
});
