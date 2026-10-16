/**
 * Logic and definitions for the TikTok Banner Activation simulation flow
 */

export const ACTIVATION_STEPS = [
  'Searching account in the TikTok server...',
  'Validating profile compatibility...',
  'Bypassing standard layout restrictions...',
  'Injecting Banner Beta access code...',
  'Finalizing profile synchronization...',
] as const;

export type ActivationStep = typeof ACTIVATION_STEPS[number];

/**
 * Realistic loading durations per step to make the server verification feel authentic
 */
export const STEP_DURATIONS_MS = [
  1800, // Step 0: Searching account in the TikTok server & SSL handshake
  1500, // Step 1: Validating profile compatibility & layout schema
  1700, // Step 2: Bypassing standard layout restrictions & flag override
  2100, // Step 3: Injecting Banner Beta access code & token generation
  1600, // Step 4: Finalizing profile synchronization & CDN cache flush
] as const;

/**
 * Simulated realistic terminal telemetry logs that appear as each step processes
 */
export const STEP_TELEMETRY_LOGS = [
  'Resolving DNS edge node... Handshake 104.244.42.1 [ACK]... Account located',
  'Querying profile metadata & schema... HTTP 200 OK (v26.4.1 Compatible)',
  'Applying bypass header (X-TikTok-Beta-Banner: 1)... Layout restrictions cleared',
  'Generating cryptographic token... Injecting SHA-256 payload [0x8F4A...B902]',
  'Flushing edge cache... Syncing cluster nodes... Synchronization verified',
] as const;

export function getStepDuration(index: number): number {
  if (index >= 0 && index < STEP_DURATIONS_MS.length) {
    return STEP_DURATIONS_MS[index];
  }
  return 1500;
}

export function validateTikTokLink(input: string): { isValid: boolean; error?: string } {
  if (!input || !input.trim()) {
    return { isValid: false, error: 'Please enter your TikTok profile link or username' };
  }
  const trimmed = input.trim();
  // Accepts standard tiktok.com/@username, vt.tiktok.com, or simply @username
  const isUrl = trimmed.includes('tiktok.com') || trimmed.startsWith('@') || trimmed.length >= 3;
  if (!isUrl) {
    return { isValid: false, error: 'Please enter a valid TikTok link or @username' };
  }
  return { isValid: true };
}

export function getNextStepIndex(currentStep: number, totalSteps: number = ACTIVATION_STEPS.length): number {
  if (currentStep < totalSteps - 1) {
    return currentStep + 1;
  }
  return totalSteps; // Finished
}
