import { Flame, Clock } from 'lucide-react'
import { useTimerStore } from '@/stores/timerStore'

export default function StatsCard() {
  const { completedPomodoros, totalFocusTime } = useTimerStore()

  const hours = Math.floor(totalFocusTime / 3600)
  const minutes = Math.floor((totalFocusTime % 3600) / 60)

  return (
    <div className="fixed top-6 left-6 z-30">
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame size={16} className="text-orange-400" />
            </div>
            <div>
              <p className="text-white text-sm font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                {completedPomodoros}
              </p>
              <p className="text-white/40 text-[10px]">番茄钟</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white text-sm font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                {hours > 0 ? `${hours}h` : ''}{minutes}m
              </p>
              <p className="text-white/40 text-[10px]">专注时长</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
