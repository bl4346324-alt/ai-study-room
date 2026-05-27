import { create } from 'zustand'

export interface PlanItem {
  id: string
  time: string
  title: string
  duration: number
  completed: boolean
  category: 'study' | 'break' | 'exercise' | 'other'
}

interface PlanStore {
  plans: PlanItem[]
  addPlan: (item: Omit<PlanItem, 'id' | 'completed'>) => void
  togglePlan: (id: string) => void
  removePlan: (id: string) => void
  updatePlan: (id: string, updates: Partial<PlanItem>) => void
}

export const usePlanStore = create<PlanStore>((set) => ({
  plans: [
    {
      id: '1',
      time: '09:00',
      title: '晨间阅读',
      duration: 60,
      completed: false,
      category: 'study',
    },
    {
      id: '2',
      time: '10:00',
      title: '休息',
      duration: 15,
      completed: false,
      category: 'break',
    },
    {
      id: '3',
      time: '10:15',
      title: '数学复习',
      duration: 90,
      completed: false,
      category: 'study',
    },
    {
      id: '4',
      time: '11:45',
      title: '午餐休息',
      duration: 60,
      completed: false,
      category: 'break',
    },
    {
      id: '5',
      time: '12:45',
      title: '英语听力练习',
      duration: 45,
      completed: false,
      category: 'study',
    },
    {
      id: '6',
      time: '13:30',
      title: '运动时间',
      duration: 30,
      completed: false,
      category: 'exercise',
    },
    {
      id: '7',
      time: '14:00',
      title: '专业课学习',
      duration: 120,
      completed: false,
      category: 'study',
    },
  ],
  addPlan: (item) =>
    set((state) => ({
      plans: [
        ...state.plans,
        {
          ...item,
          id: Date.now().toString(),
          completed: false,
        },
      ].sort((a, b) => a.time.localeCompare(b.time)),
    })),
  togglePlan: (id) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === id ? { ...p, completed: !p.completed } : p
      ),
    })),
  removePlan: (id) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== id),
    })),
  updatePlan: (id, updates) =>
    set((state) => ({
      plans: state.plans.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
}))
