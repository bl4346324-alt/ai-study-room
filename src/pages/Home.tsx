import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import BackgroundScene from '@/components/BackgroundScene'
import PomodoroTimer from '@/components/PomodoroTimer'
import MusicPlayer from '@/components/MusicPlayer'
import GoalPanel from '@/components/GoalPanel'
import SceneSwitcher from '@/components/SceneSwitcher'
import StatsCard from '@/components/StatsCard'

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <BackgroundScene />

      <StatsCard />

      <SceneSwitcher />

      <Link
        to="/planning"
        className="fixed top-6 right-[60px] z-40 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 hover:scale-105"
        title="今日规划"
      >
        <CalendarDays size={18} />
      </Link>

      <GoalPanel />

      <main className="relative z-10 flex items-center justify-center h-full">
        <PomodoroTimer />
      </main>

      <MusicPlayer />
    </div>
  )
}
