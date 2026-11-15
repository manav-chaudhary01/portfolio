import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioClicksWidget: React.FC = () => {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const playClick = (type: 'blue' | 'brown' | 'thock') => {
    if (!audioEnabled) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'blue') {
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        setLastPlayed('Blue Click (Sharp Snap)');
      } else if (type === 'brown') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        setLastPlayed('Brown Tactile (Soft Bump)');
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        setLastPlayed('Spacebar Thock (Deep Resonant)');
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  return (
    <div className="w-full bg-surface-subtle/70 rounded-2xl p-4 border border-border-subtle/80 flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-[10px] font-mono text-ink-muted">
        <span>PROCEDURAL WEB AUDIO</span>
        <button
          type="button"
          onClick={() => setAudioEnabled((e) => !e)}
          className="hover:text-ink-primary transition-colors cursor-pointer flex items-center gap-1"
          aria-label={audioEnabled ? 'Mute micro-audio' : 'Unmute micro-audio'}
        >
          {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span>{audioEnabled ? 'AUDIO ON' : 'MUTED'}</span>
        </button>
      </div>

      <div className="py-3 flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => playClick('blue')}
          className="px-3 py-1.5 rounded-xl bg-surface border border-border-subtle shadow-2xs hover:border-amber-400 active:scale-95 transition-all text-xs font-mono font-medium text-ink-primary cursor-pointer"
        >
          Blue Click
        </button>
        <button
          type="button"
          onClick={() => playClick('brown')}
          className="px-3 py-1.5 rounded-xl bg-surface border border-border-subtle shadow-2xs hover:border-amber-400 active:scale-95 transition-all text-xs font-mono font-medium text-ink-primary cursor-pointer"
        >
          Brown Tactile
        </button>
        <button
          type="button"
          onClick={() => playClick('thock')}
          className="px-3 py-1.5 rounded-xl bg-surface border border-border-subtle shadow-2xs hover:border-amber-400 active:scale-95 transition-all text-xs font-mono font-medium text-ink-primary cursor-pointer"
        >
          Spacebar Thock
        </button>
      </div>

      <div className="pt-2 border-t border-border-subtle/60 text-center text-[10px] font-mono text-ink-muted truncate">
        {lastPlayed ? `Played: ${lastPlayed}` : 'Click any switch to synthesize sound'}
      </div>
    </div>
  );
};
