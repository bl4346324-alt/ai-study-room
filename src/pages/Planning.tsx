import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Check,
  Trash2,
  Plus,
  BookOpen,
  Coffee,
  Dumbbell,
  MoreHorizontal,
  CalendarDays,
  Target,
  Timer,
} from 'lucide-react'
import { usePlanStore, PlanItem } from '@/stores/planStore'
import { useGoalStore } from '@/stores/goalStore'
import { useTimerStore } from '@/stores/timerStore'

const CATEGORY_CONFIG = {
  study: {
    icon: BookOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    label: '学习',
  },
  break: {
    icon: Coffee,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    label: '休息',
  },
  exercise: {
    icon: Dumbbell,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    label: '运动',
  },
  other: {
    icon: MoreHorizontal,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    label: '其他',
  },
}

export default function Planning() {
  const { plans, addPlan, togglePlan, removePlan } = usePlanStore()
  const { goals, toggleGoal } = useGoalStore()
  const { completedPomodoros, totalFocusTime } = useTimerStore()

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTime, setNewTime] = useState('09:00')
  const [newTitle, setNewTitle] = useState('')
  const [newDuration, setNewDuration] = useState(30)
  const [newCategory, setNewCategory] = useState<PlanItem['category']>('study')

  const completedPlans = plans.filter((p) => p.completed).length
  const totalStudyTime = plans
    .filter((p) => p.category === 'study')
    .reduce((sum, p) => sum + p.duration, 0)

  const hours = Math.floor(totalFocusTime / 3600)
  const minutes = Math.floor((totalFocusTime % 3600) / 60)

  const handleAdd = () => {
    if (!newTitle.trim()) return
    addPlan({
      time: newTime,
      title: newTitle.trim(),
      duration: newDuration,
      category: newCategory,
    })
    setNewTitle('')
    setShowAddForm(false)
  }

  const now = new Date()
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16162a] text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <CalendarDays size={24} className="text-amber-400" />
                今日规划
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {new Date().toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #f0a500, #e09000)',
              boxShadow: '0 0 20px rgba(240,165,0,0.3)',
            }}
          >
            <Plus size={16} />
            添加计划
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Target size={18} className="text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {completedPlans}/{plans.length}
                </p>
                <p className="text-white/40 text-xs">已完成任务</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {Math.floor(totalStudyTime / 60)}h{totalStudyTime % 60}m
                </p>
                <p className="text-white/40 text-xs">计划学习时长</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Timer size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {hours > 0 ? `${hours}h` : ''}{minutes}m
                </p>
                <p className="text-white/40 text-xs">实际专注时长</p>
              </div>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <h3 className="text-sm font-medium text-white/60 mb-4">添加新计划</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-white/40 mb-2 block">时间</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-2 block">时长（分钟）</label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(parseInt(e.target.value) || 30)}
                  min="5"
                  max="240"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-white/40 mb-2 block">任务名称</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="输入计划内容..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="text-xs text-white/40 mb-2 block">类别</label>
              <div className="flex gap-2">
                {(Object.keys(CATEGORY_CONFIG) as PlanItem['category'][]).map((cat) => {
                  const config = CATEGORY_CONFIG[cat]
                  const Icon = config.icon
                  return (
                    <button
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-medium transition-all duration-300 ${
                        newCategory === cat
                          ? `${config.bg} ${config.color} border ${config.border}`
                          : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Icon size={14} />
                      {config.label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                取消
              </button>
              <button
                onClick={handleAdd}
                disabled={!newTitle.trim()}
                className="px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: newTitle.trim()
                    ? 'linear-gradient(135deg, #f0a500, #e09000)'
                    : 'rgba(255,255,255,0.1)',
                }}
              >
                添加
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-400" />
            时间安排
          </h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-3">
              {plans.map((plan) => {
                const config = CATEGORY_CONFIG[plan.category]
                const Icon = config.icon
                const isPast = plan.time < currentTime
                return (
                  <div
                    key={plan.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      plan.completed
                        ? 'bg-green-500/5 border border-green-500/10'
                        : isPast
                        ? 'bg-white/5 border border-white/5'
                        : 'bg-white/3 border border-transparent hover:border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col items-center min-w-[52px]">
                      <span
                        className={`text-sm font-medium ${
                          plan.completed ? 'text-white/30' : 'text-white/70'
                        }`}
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {plan.time}
                      </span>
                      <span className="text-[10px] text-white/30 mt-0.5">{plan.duration}m</span>
                    </div>

                    <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                          plan.completed
                            ? 'bg-green-500 border-green-500'
                            : isPast
                            ? 'bg-white/20 border-white/30'
                            : `${config.bg} ${config.border}`
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                          <Icon size={12} className={config.color} />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            plan.completed ? 'text-white/30 line-through' : 'text-white/80'
                          }`}
                        >
                          {plan.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => togglePlan(plan.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          plan.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/20 hover:border-amber-400 hover:bg-amber-500/10'
                        }`}
                      >
                        {plan.completed && <Check size={14} className="text-white" />}
                      </button>
                      <button
                        onClick={() => removePlan(plan.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {goals.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target size={18} className="text-amber-400" />
              今日目标
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                    goal.completed
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-white/5 border border-white/10 hover:border-white/20'
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
                    className={`text-sm ${
                      goal.completed ? 'text-white/30 line-through' : 'text-white/80'
                    }`}
                  >
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
