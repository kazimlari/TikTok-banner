import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  HeartHandshake,
  ExternalLink,
  Flame,
} from 'lucide-react';
import {
  ACTIVATION_STEPS,
  validateTikTokLink,
  getStepDuration,
  STEP_TELEMETRY_LOGS,
} from '../utils/activatorLogic.ts';

interface BannerActivatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActivatorPhase = 'input' | 'sequencing' | 'success' | 'reveal';

export const BannerActivator: React.FC<BannerActivatorProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<ActivatorPhase>('input');
  const [profileLink, setProfileLink] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Fake sequence progression
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state when modal is closed
  const handleModalClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('input');
    setProfileLink('');
    setValidationError(null);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    onClose();
  };

  // Phase 1 -> Phase 2: Start Activation
  const handleStartActivation = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateTikTokLink(profileLink);
    if (!result.isValid) {
      setValidationError(result.error || 'Please enter a valid link');
      return;
    }
    setValidationError(null);
    setPhase('sequencing');
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  // Phase 2 Step Progression (realistic server delays per step)
  useEffect(() => {
    if (phase !== 'sequencing') return;

    if (currentStepIndex < ACTIVATION_STEPS.length) {
      const stepDuration = getStepDuration(currentStepIndex);
      timerRef.current = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStepIndex]);
        if (currentStepIndex + 1 < ACTIVATION_STEPS.length) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          // All 5 steps completed! Realistic pause before displaying Success State
          setTimeout(() => {
            setPhase('success');
          }, 1200);
        }
      }, stepDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, currentStepIndex]);

  // Phase 3 -> Phase 4: Run to activate in the account
  const handleRunActivation = () => {
    setPhase('reveal');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      >
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={handleModalClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* ========================================================================= */}
          {/* PHASE 1: THE INPUT MODAL                                                  */}
          {/* ========================================================================= */}
          {phase === 'input' && (
            <div className="flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        Add TikTok Banner to Your Profile
                      </h3>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        BETA
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Simulate direct banner feature provisioning on your live account
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleModalClose}
                  aria-label="Close activator modal"
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleStartActivation} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    TikTok Profile Share Link or Video Link
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      autoFocus
                      value={profileLink}
                      onChange={(e) => {
                        setProfileLink(e.target.value);
                        if (validationError) setValidationError(null);
                      }}
                      placeholder="e.g. https://www.tiktok.com/@yourhandle or https://vt.tiktok.com/..."
                      className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        validationError
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                  </div>

                  {validationError && (
                    <p className="text-[11px] text-rose-400 mt-1">
                      {validationError}
                    </p>
                  )}

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Paste your TikTok profile share link, video link, or @username to begin automated server verification and banner injection.
                  </p>
                </div>

                {/* Feature highlight badge strip */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Automated Profile Compatibility Check</span>
                  </div>
                  <div className="flex items-center gap-2 text-rose-300 font-medium">
                    <Zap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Banner Beta Layout Bypass Protocol</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-md shadow-rose-500/25 active:scale-95"
                  >
                    <span>Start Activation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PHASE 2: THE FAKE GENERATION SEQUENCE                                    */}
          {/* ========================================================================= */}
          {phase === 'sequencing' && (
            <div className="flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Terminal className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <span>TIKTOK_BANNER_INJECTOR v2.6</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                      Target: {profileLink}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-cyan-400 font-bold">
                  {Math.round(((completedSteps.length) / ACTIVATION_STEPS.length) * 100)}%
                </div>
              </div>

              {/* Progress line */}
              <div className="w-full h-1 bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-rose-500 to-emerald-400"
                  animate={{
                    width: `${((completedSteps.length + 0.5) / ACTIVATION_STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Terminal Sequence Steps */}
              <div className="p-6 space-y-3.5 bg-slate-950 font-mono text-xs">
                {ACTIVATION_STEPS.map((step, idx) => {
                  const isDone = completedSteps.includes(idx);
                  const isCurrent = currentStepIndex === idx && !isDone;
                  const isPending = idx > currentStepIndex;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: isPending ? 0.3 : 1,
                        x: 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isDone
                          ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                          : isCurrent
                          ? 'border-cyan-500/40 bg-cyan-950/25 text-cyan-100 shadow-sm shadow-cyan-950'
                          : 'border-slate-800/60 bg-slate-900/40 text-slate-500'
                      }`}
                    >
                      {/* Step Indicator Icon */}
                      <div className="shrink-0 flex items-center justify-center w-5 h-5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-700" />
                        )}
                      </div>

                      {/* Step Text & Live Server Telemetry */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] sm:text-xs font-semibold truncate">
                          {step}
                        </div>
                        {isCurrent && (
                          <motion.div
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] text-cyan-400 font-mono mt-0.5 truncate flex items-center gap-1"
                          >
                            <span className="text-cyan-500">&gt;</span>
                            <span>{STEP_TELEMETRY_LOGS[idx]}</span>
                          </motion.div>
                        )}
                        {isDone && (
                          <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5 truncate flex items-center gap-1">
                            <span className="text-emerald-500">✓</span>
                            <span>{STEP_TELEMETRY_LOGS[idx]}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Tag */}
                      <span className="text-[10px] uppercase font-bold shrink-0">
                        {isDone ? (
                          <span className="text-emerald-400">DONE</span>
                        ) : isCurrent ? (
                          <span className="text-cyan-400 animate-pulse">PROCESSING...</span>
                        ) : (
                          <span className="text-slate-600">QUEUED</span>
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Terminal Footer */}
              <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Latency: ~34ms · Server: TikTok CDN</span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Connecting...</span>
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PHASE 3: THE SUCCESS MESSAGE                                              */}
          {/* ========================================================================= */}
          {phase === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 text-center flex flex-col items-center space-y-6"
            >
              {/* Animated Celebration Icon */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow">
                  ✓
                </span>
              </div>

              {/* Main Heading & Subheading */}
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Update Found for Your TikTok Banner!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Note: It will take 24-48 hours to see the changes reflect on your live profile.
                </p>
              </div>

              {/* Account summary pill */}
              <div className="w-full max-w-sm p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400">Target Profile:</span>
                <span className="font-mono text-cyan-300 font-semibold truncate max-w-[200px]">
                  {profileLink}
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleRunActivation}
                className="w-full max-w-sm py-3 px-6 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-xl hover:from-emerald-600 hover:to-cyan-700 active:scale-95 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Run to activate in the account</span>
              </button>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* PHASE 4: THE DEVELOPER NOTE (PRANK REVEAL)                                */}
          {/* ========================================================================= */}
          {phase === 'reveal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Developer Note</span>
                      <span className="text-xs">✅</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Behind the scenes of the TikTok Banner Studio
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleModalClose}
                  aria-label="Close developer note modal"
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 text-xs leading-relaxed">
                {/* ================================================================= */}
                {/* 📝 DEVELOPER NOTE PLACEHOLDER BLOCK                               */}
                {/* You can easily paste your custom developer note or prank message  */}
                {/* right inside this container:                                      */}
                {/* ================================================================= */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Please Read Before Continuing</span>
                  </div>

                  <p className="text-slate-300">
                    TikTok’s new banner feature hasn’t been released to all users yet and is still in its testing phase. Until it rolls out widely, this simulation lets you inject the banner update into your TikTok profile. The tool is completely free to use, but keeping it running costs us real money.
                  </p>

                  <p className="text-slate-400">
                    In order to cover our running costs, please complete sponsored partner Deals, such as mobile games, apps, free trials and many more! Complete the required number of Deals and start the API banner injection
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-400 font-mono">
                    // Tip: Complete more Deals to prioritize your process and get it within minutes.
                  </div>
                </div>
                {/* ================================================================= */}
              </div>

              {/* Footer with single Continue button */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
                <button
  onClick={(e) => {
    handleModalClose(e);
    window.location.href = "https://apptrck.net/cl/i/m5nd3m";
  }}
  className="px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:from-rose-600 hover:to-pink-700 active:scale-95 transition-all shadow-md shadow-rose-500/25"
>
  Continue
</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
