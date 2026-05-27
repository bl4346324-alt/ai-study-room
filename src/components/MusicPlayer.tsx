import { useState } from 'react'
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause, Music, ChevronUp, ChevronDown } from 'lucide-react'
import { useMusicStore } from '@/stores/musicStore'

export default function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    tracks,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    setTrack,
  } = useMusicStore()

  const [expanded, setExpanded] = useState(false)

  const track = tracks[currentTrack]

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {expanded && (
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl w-52 animate-in">
          <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider mb-2 px-1">选择音乐</p>
          <div className="space-y-1">
            {tracks.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setTrack(i)
                  setExpanded(false)
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-300 text-left ${
                  currentTrack === i
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-white/60 hover:bg-white/10 hover:text-white/80 border border-transparent'
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <span className="truncate">{t.name}</span>
                {currentTrack === i && isPlaying && (
                  <span className="ml-auto flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '8px', animationDelay: '0ms' }} />
                    <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '12px', animationDelay: '150ms' }} />
                    <span className="w-0.5 bg-amber-400 rounded-full animate-bounce" style={{ height: '6px', animationDelay: '300ms' }} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-2xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-600/30 flex items-center justify-center text-sm shrink-0 border border-amber-500/20">
            {track.icon}
          </div>
          <div className="min-w-0 max-w-[100px]">
            <p className="text-white text-xs font-medium truncate">{track.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prevTrack}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <SkipBack size={13} />
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #f0a500, #e09000)',
              boxShadow: '0 0 16px rgba(240,165,0,0.3)',
            }}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <SkipForward size={13} />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
            className="text-white/40 hover:text-white transition-colors"
          >
            {volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(240,165,0,0.5)]"
          />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          title="切换曲目"
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
    </div>
  )
}
