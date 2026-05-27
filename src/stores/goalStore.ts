import { create } from 'zustand'

export interface Goal {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

interface GoalStore {
  goals: Goal[]
  addGoal: (text: string) => void
  toggleGoal: (id: string) => void
  removeGoal: (id: string) => void
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  addGoal: (text: string) =>
    set((state) => ({
      goals: [
        ...state.goals,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    })),
  toggleGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      ),
    })),
  removeGoal: (id: string) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),
}))
