import { useState } from 'react'
import { Target, Plus, Check, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGoalStore } from '@/stores/goalStore'

export default function GoalPanel() {
  const { goals, addGoal, toggleGoal, removeGoal } = useGoalStore()
  const [input, setInput] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleAdd = () => {
    const text = input.trim()
    if (!text) return
    addGoal(text)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  const completedCount = goals.filter((g) => g.completed).length

  return (
    <div
      className={`fixed left-4 top-1/2 -translate-y-1/2 z-30 transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-12' : 'w-72'
      }`}
    >
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                <Target size={16} className="text-amber-400" />
                今日目标
                {goals.length > 0 && (
                  <span className="text-xs text-white/40 font-normal">
                    {completedCount}/{goals.length}
                  </span>
                )}
              </h3>
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="写下今天的目标..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button
                onClick={handleAdd}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: input.trim()
                    ? 'linear-gradient(135deg, #f0a500, #e09000)'
                    : 'rgba(255,255,255,0.1)',
                }}
              >
                <Plus size={16} className="text-white" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              {goals.length === 0 && (
                <p className="text-white/20 text-xs text-center py-6">
                  还没有设定目标，开始添加吧 ✨
                </p>
              )}
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`group flex items-center gap-2 p-2.5 rounded-xl transition-all duration-300 ${
                    goal.completed
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-white/5 border border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      goal.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-white/30 hover:border-amber-400'
                    }`}
                  >
                    {goal.completed && <Check size={12} className="text-white" />}
                  </button>
                  <span
                    className={`flex-1 text-sm transition-all duration-300 ${
                      goal.completed
                        ? 'text-white/40 line-through'
                        : 'text-white/80'
                    }`}
                  >
                    {goal.text}
                  </span>
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {goals.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${goals.length > 0 ? (completedCount / goals.length) * 100 : 0}%`,
                      background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                    }}
                  />
                </div>
                <p className="text-[10px] text-white/30 mt-1 text-center">
                  完成进度 {goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
