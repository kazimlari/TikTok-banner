import React, { useRef } from 'react';
import type { ProfileIdentity } from '../types/profile.ts';
import { AVATAR_PRESETS } from '../data/presets.ts';
import {
  User,
  CheckCircle2,
  Upload,
  Link as LinkIcon,
  Hash,
  Sparkles,
  Flame,
  Radio,
  Eye,
  ShoppingBag,
} from 'lucide-react';

interface ProfileEditorProps {
  profile: ProfileIdentity;
  setProfile: React.Dispatch<React.SetStateAction<ProfileIdentity>>;
}

const CATEGORIES = [
  'Digital Creator',
  'Gaming Creator',
  'Fashion & Style',
  'Beauty & Lifestyle',
  'Musician / Band',
  'Tech & Software',
  'Architect & Designer',
  'Fitness & Wellness',
  'Comedy & Entertainment',
  'Food & Culinary',
];

const QUICK_HASHTAGS = ['#fyp', '#creator', '#aesthetic', '#vlog', '#viral', '#tutorial', '#setup'];

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, setProfile }) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setProfile((prev) => ({
          ...prev,
          avatarUrl: url,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertHashtag = (tag: string) => {
    setProfile((prev) => ({
      ...prev,
      bio: prev.bio ? `${prev.bio.trim()} ${tag}` : tag,
    }));
  };

  return (
    <div className="space-y-6 text-sm text-slate-200">
      {/* 1. Identity & Handle */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Profile Identity & Username</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Display Name</label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, displayName: e.target.value }))
              }
              placeholder="e.g. Alex Rivers ✨"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Username (@handle)</label>
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus-within:border-cyan-400">
              <span className="text-slate-400 text-xs mr-1 font-mono">@</span>
              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    username: e.target.value.replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase(),
                  }))
                }
                placeholder="username"
                className="w-full bg-transparent text-xs text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Creator Niche / Category</label>
            <select
              value={profile.category}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 px-2">
            <div>
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Badge</span>
              </div>
              <div className="text-[11px] text-slate-400">Blue official tick</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.isVerified}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, isVerified: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500" />
            </label>
          </div>
        </div>
      </div>

      {/* 2. Avatar & Story Ring */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Profile Photo & Story Ring</span>
          </label>
          <button
            onClick={() => avatarInputRef.current?.click()}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
          <input
            type="file"
            ref={avatarInputRef}
            onChange={handleAvatarUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Avatar Preset Grid */}
        <div className="grid grid-cols-6 gap-2">
          {AVATAR_PRESETS.map((av) => (
            <button
              key={av.id}
              onClick={() =>
                setProfile((prev) => ({
                  ...prev,
                  avatarUrl: '',
                  displayName: prev.displayName || av.name,
                }))
              }
              className="p-1 rounded-full border border-slate-800 hover:border-slate-600 flex items-center justify-center transition-all group"
              title={av.name}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow"
                style={{ background: av.gradient }}
              >
                {av.letter}
              </div>
            </button>
          ))}
        </div>

        {/* Story Ring Style Options */}
        <div className="pt-2">
          <label className="text-xs text-slate-400 mb-2 block">Story Ring Effect</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(
              [
                { id: 'none', label: 'None', desc: 'Standard' },
                { id: 'rainbow', label: 'Story', desc: 'TikTok Ring' },
                { id: 'live', label: 'LIVE', desc: 'Pulsing Red' },
                { id: 'gold', label: 'VIP Gold', desc: 'Exclusive' },
                { id: 'neon', label: 'Cyber', desc: 'Neon Glow' },
              ] as const
            ).map((ring) => (
              <button
                key={ring.id}
                onClick={() => setProfile((prev) => ({ ...prev, storyRing: ring.id }))}
                className={`p-2 rounded-lg border text-center transition-all ${
                  profile.storyRing === ring.id
                    ? 'border-pink-400 bg-pink-950/40 text-pink-200 font-semibold'
                    : 'border-slate-800 bg-slate-950 text-slate-400'
                }`}
              >
                <div className="text-xs">{ring.label}</div>
                <div className="text-[10px] text-slate-500">{ring.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bio & Link-in-Bio */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-amber-400" />
          <span>Bio & Link-in-Bio</span>
        </label>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bio Description</span>
            <span>{profile.bio.length}/100</span>
          </div>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="Write your creator bio with @mentions and #hashtags..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed resize-none"
          />
        </div>

        {/* Quick Hashtag Insertion */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400">Quick insert:</span>
          {QUICK_HASHTAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleInsertHashtag(tag)}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Link in Bio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          <div>
            <label className="text-xs text-slate-400 mb-1 flex items-center gap-1">
              <LinkIcon className="w-3 h-3 text-cyan-400" />
              <span>Link URL</span>
            </label>
            <input
              type="text"
              value={profile.linkUrl}
              onChange={(e) => setProfile((prev) => ({ ...prev, linkUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Link Display Title</label>
            <input
              type="text"
              value={profile.linkTitle}
              onChange={(e) => setProfile((prev) => ({ ...prev, linkTitle: e.target.value }))}
              placeholder="e.g. twitch.tv/username"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Location & Pronouns */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Austin, TX"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Pronouns</label>
            <input
              type="text"
              value={profile.pronouns}
              onChange={(e) => setProfile((prev) => ({ ...prev, pronouns: e.target.value }))}
              placeholder="e.g. they/them"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Creator Metrics & View Modes */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-rose-400" />
          <span>Follower Counts & Visitor Mode</span>
        </label>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Following</label>
            <input
              type="number"
              value={profile.followingCount}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, followingCount: Math.max(0, Number(e.target.value)) }))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Followers</label>
            <input
              type="number"
              value={profile.followersCount}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, followersCount: Math.max(0, Number(e.target.value)) }))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Total Likes</label>
            <input
              type="number"
              value={profile.likesCount}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, likesCount: Math.max(0, Number(e.target.value)) }))
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Role Toggle: Creator vs Visitor */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Preview Perspective</div>
            <div className="text-[11px] text-slate-400">
              {profile.activeRole === 'owner'
                ? 'Viewing as Creator (Edit & Share buttons)'
                : 'Viewing as Follower (Follow & Message buttons)'}
            </div>
          </div>

          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setProfile((prev) => ({ ...prev, activeRole: 'owner' }))}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                profile.activeRole === 'owner'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Creator
            </button>
            <button
              onClick={() => setProfile((prev) => ({ ...prev, activeRole: 'visitor' }))}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                profile.activeRole === 'visitor'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visitor
            </button>
          </div>
        </div>

        {/* TikTok Shop Tab Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-rose-400" />
            <div>
              <div className="text-xs font-semibold text-white">TikTok Shop Showcase Tab</div>
              <div className="text-[11px] text-slate-400">Show products & merch tab</div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profile.shopActive}
              onChange={(e) => setProfile((prev) => ({ ...prev, shopActive: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500" />
          </label>
        </div>
      </div>
    </div>
  );
};
