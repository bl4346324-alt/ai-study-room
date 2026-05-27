import { create } from 'zustand'

export interface Track {
  id: string
  name: string
  url: string
  icon: string
}

const TRACKS: Track[] = [
  {
    id: 'lofi',
    name: 'Lo-Fi Chill',
    url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
    icon: '🎵',
  },
  {
    id: 'rain',
    name: '雨声白噪音',
    url: 'https://cdn.pixabay.com/audio/2022/11/22/audio_33c4b6e4a1.mp3',
    icon: '🌧️',
  },
  {
    id: 'cafe',
    name: '咖啡厅氛围',
    url: 'https://cdn.pixabay.com/audio/2022/10/25/audio_33f0e1bff2.mp3',
    icon: '☕',
  },
  {
    id: 'forest',
    name: '森林鸟鸣',
    url: 'https://cdn.pixabay.com/audio/2022/01/20/audio_d1718ab41b.mp3',
    icon: '🌿',
  },
  {
    id: 'ocean',
    name: '海浪声',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_43a73a3ddd.mp3',
    icon: '🌊',
  },
]

interface MusicStore {
  currentTrack: number
  isPlaying: boolean
  volume: number
  tracks: Track[]
  audio: HTMLAudioElement | null
  initAudio: () => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (v: number) => void
  setTrack: (index: number) => void
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  currentTrack: 0,
  isPlaying: false,
  volume: 0.5,
  tracks: TRACKS,
  audio: null,
  initAudio: () => {
    const state = get()
    if (state.audio) return
    const audio = new Audio(TRACKS[0].url)
    audio.loop = true
    audio.volume = state.volume
    set({ audio })
  },
  togglePlay: () => {
    const state = get()
    if (!state.audio) {
      const audio = new Audio(TRACKS[state.currentTrack].url)
      audio.loop = true
      audio.volume = state.volume
      audio.play()
      set({ audio, isPlaying: true })
      return
    }
    if (state.isPlaying) {
      state.audio.pause()
      set({ isPlaying: false })
    } else {
      state.audio.play()
      set({ isPlaying: true })
    }
  },
  nextTrack: () => {
    const state = get()
    const next = (state.currentTrack + 1) % TRACKS.length
    if (state.audio) {
      state.audio.pause()
    }
    const audio = new Audio(TRACKS[next].url)
    audio.loop = true
    audio.volume = state.volume
    if (state.isPlaying) {
      audio.play()
    }
    set({ currentTrack: next, audio })
  },
  prevTrack: () => {
    const state = get()
    const prev = (state.currentTrack - 1 + TRACKS.length) % TRACKS.length
    if (state.audio) {
      state.audio.pause()
    }
    const audio = new Audio(TRACKS[prev].url)
    audio.loop = true
    audio.volume = state.volume
    if (state.isPlaying) {
      audio.play()
    }
    set({ currentTrack: prev, audio })
  },
  setVolume: (v: number) => {
    const state = get()
    if (state.audio) {
      state.audio.volume = v
    }
    set({ volume: v })
  },
  setTrack: (index: number) => {
    const state = get()
    if (state.audio) {
      state.audio.pause()
    }
    const audio = new Audio(TRACKS[index].url)
    audio.loop = true
    audio.volume = state.volume
    if (state.isPlaying) {
      audio.play()
    }
    set({ currentTrack: index, audio })
  },
}))
