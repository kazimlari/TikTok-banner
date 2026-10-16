import React from 'react';
import type { AestheticAnalysisResult } from '../utils/bannerCalculators.ts';
import { X, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

interface AestheticScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AestheticAnalysisResult;
  onApplyRecommended: () => void;
}

export const AestheticScoreModal: React.FC<AestheticScoreModalProps> = ({
  isOpen,
  onClose,
  analysis,
  onApplyRecommended,
}) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-400';
    if (score >= 60) return 'text-cyan-400 border-cyan-400';
    return 'text-amber-400 border-amber-400';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Profile Aesthetics & Engagement Audit</h3>
              <p className="text-xs text-slate-400">Analysis for TikTok's 2026 Profile Layout</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
          {/* Main Score Ring & Subscores */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-6">
            <div
              className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center shrink-0 ${getScoreColor(
                analysis.overallScore
              )}`}
            >
              <span className="text-3xl font-extrabold tabular-nums">
                {analysis.overallScore}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Score
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Banner Visual Impact</span>
                  <span className="font-mono text-cyan-300">{analysis.bannerScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.bannerScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Readability & Safe Zones</span>
                  <span className="font-mono text-cyan-300">{analysis.readabilityScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.readabilityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Conversion & Engagement</span>
                  <span className="font-mono text-cyan-300">{analysis.engagementScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full transition-all duration-500"
                    style={{ width: `${analysis.engagementScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Strengths */}
          {analysis.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Visual Strengths</span>
              </h4>
              <div className="space-y-1.5">
                {analysis.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/40 p-2 rounded-lg border border-slate-800"
                  >
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Strategic Improvements</span>
              </h4>
              <div className="space-y-1.5">
                {analysis.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 bg-amber-950/20 p-2 rounded-lg border border-amber-900/40"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onApplyRecommended();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Apply Optimal Scrim & Badges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
