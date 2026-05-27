import { create } from 'zustand'

export interface Scene {
  id: string
  name: string
  imageUrl: string
  thumbnail: string
}

const SCENES: Scene[] = [
  {
    id: 'study',
    name: '深夜书房',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy+late+night+study+room+warm+desk+lamp+wooden+desk+books+stacked+dim+ambient+lighting+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy+late+night+study+room+warm+desk+lamp+wooden+desk+photorealistic&image_size=square',
  },
  {
    id: 'rain',
    name: '雨天窗边',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rainy+window+city+night+view+raindrops+on+glass+cozy+interior+warm+light+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=rainy+window+city+night+view+raindrops+on+glass+photorealistic&image_size=square',
  },
  {
    id: 'cafe',
    name: '咖啡厅',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy+coffee+shop+corner+warm+lighting+vintage+decor+latte+art+wooden+table+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy+coffee+shop+corner+warm+lighting+vintage+decor+photorealistic&image_size=square',
  },
  {
    id: 'library',
    name: '图书馆',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical+library+interior+tall+bookshelves+warm+light+wooden+reading+desk+quiet+atmosphere+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical+library+interior+tall+bookshelves+warm+light+photorealistic&image_size=square',
  },
  {
    id: 'cabin',
    name: '森林小屋',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest+cabin+window+view+trees+green+foliage+warm+interior+cozy+wooden+room+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest+cabin+window+view+trees+warm+interior+photorealistic&image_size=square',
  },
  {
    id: 'sunset',
    name: '海边日落',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful+ocean+sunset+golden+hour+calm+sea+view+from+window+serene+evening+photorealistic&image_size=landscape_16_9',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful+ocean+sunset+golden+hour+calm+sea+photorealistic&image_size=square',
  },
]

interface SceneStore {
  currentScene: string
  scenes: Scene[]
  customBg: string | null
  setScene: (id: string) => void
  setCustomBg: (url: string | null) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 'study',
  scenes: SCENES,
  customBg: null,
  setScene: (id: string) => set({ currentScene: id, customBg: null }),
  setCustomBg: (url: string | null) => set({ customBg: url }),
}))
