import { create } from 'zustand'

interface TimerStore {
  duration: number
  breakDuration: number
  timeLeft: number
  isRunning: boolean
  isBreak: boolean
  completedPomodoros: number
  totalFocusTime: number
  start: () => void
  pause: () => void
  reset: () => void
  tick: () => void
  setDuration: (min: number) => void
  setBreakDuration: (min: number) => void
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  duration: 25 * 60,
  breakDuration: 5 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  isBreak: false,
  completedPomodoros: 0,
  totalFocusTime: 0,
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => {
    const state = get()
    set({
      isRunning: false,
      isBreak: false,
      timeLeft: state.duration,
    })
  },
  tick: () => {
    const state = get()
    if (!state.isRunning) return

    if (state.timeLeft <= 1) {
      if (state.isBreak) {
        set({
          isBreak: false,
          timeLeft: state.duration,
          isRunning: false,
        })
      } else {
        set({
          isBreak: true,
          timeLeft: state.breakDuration,
          completedPomodoros: state.completedPomodoros + 1,
          totalFocusTime: state.totalFocusTime + state.duration,
          isRunning: false,
        })
        playNotificationSound()
      }
    } else {
      set({ timeLeft: state.timeLeft - 1 })
    }
  },
  setDuration: (min: number) => {
    const seconds = min * 60
    const state = get()
    set({
      duration: seconds,
      timeLeft: state.isRunning ? state.timeLeft : seconds,
      isRunning: false,
      isBreak: false,
    })
  },
  setBreakDuration: (min: number) => {
    set({ breakDuration: min * 60 })
  },
}))

function playNotificationSound() {
  try {
    const ctx = new AudioContext()
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.4)
    })
  } catch {}
}
