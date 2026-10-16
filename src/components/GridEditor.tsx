import React from 'react';
import type { VideoClip } from '../types/profile.ts';
import { Grid, Pin, Play, Plus, Trash2 } from 'lucide-react';
import { formatCount } from '../utils/bannerCalculators.ts';

interface GridEditorProps {
  videos: VideoClip[];
  setVideos: React.Dispatch<React.SetStateAction<VideoClip[]>>;
}

const GRADIENT_OPTIONS = [
  { id: 'cyan_slate', name: 'Cyber Blue', class: 'from-cyan-900 to-slate-900' },
  { id: 'purple_indigo', name: 'Deep Purple', class: 'from-purple-900 to-indigo-950' },
  { id: 'rose_stone', name: 'Rose Dark', class: 'from-rose-950 to-stone-900' },
  { id: 'lime_zinc', name: 'Acid Lime', class: 'from-lime-950 to-zinc-900' },
  { id: 'amber_stone', name: 'Amber Glow', class: 'from-amber-950 to-stone-900' },
  { id: 'slate_black', name: 'Midnight', class: 'from-slate-900 to-black' },
];

export const GridEditor: React.FC<GridEditorProps> = ({ videos, setVideos }) => {
  const pinnedCount = videos.filter((v) => v.isPinned).length;

  const handleTogglePin = (id: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          if (!v.isPinned && pinnedCount >= 3) {
            alert('TikTok limits pinned videos to a maximum of 3 on your profile.');
            return v;
          }
          return { ...v, isPinned: !v.isPinned };
        }
        return v;
      })
    );
  };

  const handleUpdateTitle = (id: string, title: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, title } : v)));
  };

  const handleUpdatePinLabel = (id: string, pinLabel: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, pinLabel } : v)));
  };

  const handleUpdateViews = (id: string, views: number) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, views: Math.max(0, views) } : v)));
  };

  const handleChangeGradient = (id: string, bgGradient: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, bgGradient } : v)));
  };

  const handleAddVideo = () => {
    const newVid: VideoClip = {
      id: `v_${Date.now()}`,
      title: 'New video clip',
      views: 125000,
      isPinned: false,
      pinLabel: 'NEW',
      bgGradient: 'from-cyan-900 to-slate-900',
      category: 'General',
    };
    setVideos((prev) => [newVid, ...prev]);
  };

  const handleDeleteVideo = (id: string) => {
    if (videos.length <= 1) return;
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4 text-sm text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profile Video Grid & Pinned Highlights</span>
          </label>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {pinnedCount}/3 videos pinned to top of profile
          </div>
        </div>

        <button
          onClick={handleAddVideo}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg border border-slate-700/80 transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>Add Video</span>
        </button>
      </div>

      <div className="space-y-3">
        {videos.map((vid, idx) => (
          <div
            key={vid.id}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3"
          >
            {/* Visual Thumbnail Mini Preview */}
            <div
              className={`w-14 h-20 rounded-md bg-gradient-to-br ${vid.bgGradient} relative shrink-0 overflow-hidden flex flex-col justify-between p-1 shadow-inner`}
            >
              {vid.isPinned && (
                <div className="text-[8px] bg-rose-600 text-white font-black px-1 rounded self-start">
                  {vid.pinLabel || 'PIN'}
                </div>
              )}
              <div className="text-[9px] text-white font-mono flex items-center gap-0.5 mt-auto">
                <Play className="w-2 h-2 fill-current" />
                <span>{formatCount(vid.views)}</span>
              </div>
            </div>

            {/* Video Details Form */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={vid.title}
                  onChange={(e) => handleUpdateTitle(vid.id, e.target.value)}
                  placeholder="Video caption or title..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                />

                <button
                  onClick={() => handleTogglePin(vid.id)}
                  title={vid.isPinned ? 'Unpin from profile' : 'Pin to top'}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    vid.isPinned
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDeleteVideo(vid.id)}
                  aria-label={`Delete video ${idx + 1}`}
                  className="p-1.5 rounded text-xs bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* View Count & Pinned Label Inputs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Views</label>
                  <input
                    type="number"
                    value={vid.views}
                    onChange={(e) => handleUpdateViews(vid.id, Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">
                    {vid.isPinned ? 'Pin Tag (e.g. VIRAL)' : 'Category Tag'}
                  </label>
                  <input
                    type="text"
                    value={vid.isPinned ? vid.pinLabel || 'PINNED' : vid.category}
                    onChange={(e) =>
                      vid.isPinned
                        ? handleUpdatePinLabel(vid.id, e.target.value)
                        : setVideos((prev) =>
                            prev.map((v) =>
                              v.id === vid.id ? { ...v, category: e.target.value } : v
                            )
                          )
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Gradient selector */}
              <div className="flex items-center gap-1 pt-1">
                <span className="text-[10px] text-slate-400 mr-1">Cover:</span>
                {GRADIENT_OPTIONS.map((grad) => (
                  <button
                    key={grad.id}
                    onClick={() => handleChangeGradient(vid.id, grad.class)}
                    title={grad.name}
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${grad.class} border ${
                      vid.bgGradient === grad.class ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
