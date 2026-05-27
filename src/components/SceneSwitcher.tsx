import { useState, useRef } from 'react'
import { Image, Upload, X, Check } from 'lucide-react'
import { useSceneStore } from '@/stores/sceneStore'

export default function SceneSwitcher() {
  const { currentScene, scenes, customBg, setScene, setCustomBg } = useSceneStore()
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCustomBg(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 hover:scale-105"
        title="切换场景"
      >
        <Image size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-black/70 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <Image size={20} className="text-amber-400" />
                选择学习场景
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setScene(scene.id)}
                  className={`relative group rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 ${
                    currentScene === scene.id && !customBg
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(240,165,0,0.3)]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img
                    src={scene.thumbnail}
                    alt={scene.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-xs font-medium">
                    {scene.name}
                  </span>
                  {currentScene === scene.id && !customBg && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                      <Check size={12} className="text-black" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 text-sm transition-all duration-300 ${
                  customBg
                    ? 'border-amber-400/50 text-amber-300 bg-amber-500/10'
                    : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <Upload size={16} />
                {customBg ? '已上传自定义背景 (点击更换)' : '上传自定义背景图片'}
              </button>
              {customBg && (
                <button
                  onClick={() => setCustomBg(null)}
                  className="w-full mt-2 py-2 text-xs text-white/40 hover:text-white/60 transition-colors"
                >
                  恢复默认场景
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
