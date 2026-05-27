import { useSceneStore } from '@/stores/sceneStore'

export default function BackgroundScene() {
  const { currentScene, scenes, customBg } = useSceneStore()

  const scene = scenes.find((s) => s.id === currentScene)
  const bgUrl = customBg || scene?.imageUrl || ''

  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
    </div>
  )
}
