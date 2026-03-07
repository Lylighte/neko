interface CarouselManifest {
  images: string[]
}

interface BackgroundCarouselOptions {
  stayTime?: number
  fadeTime?: number
  manifestPath?: string
}

const toPublicUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path
  }
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}

const loadCarouselImages = async (manifestPath: string): Promise<string[]> => {
  const response = await fetch(toPublicUrl(manifestPath))
  if (!response.ok) {
    throw new Error(`Failed to load carousel manifest: ${response.status}`)
  }

  const data = (await response.json()) as CarouselManifest
  if (!Array.isArray(data.images) || data.images.length === 0) {
    throw new Error('Carousel manifest contains no images')
  }

  return data.images.map((image) => toPublicUrl(image))
}

export const startBackgroundCarousel = async (
  elementId: string,
  options: BackgroundCarouselOptions = {},
): Promise<() => void> => {
  const stayTime = options.stayTime ?? 8000
  const fadeTime = options.fadeTime ?? 400
  const manifestPath = options.manifestPath ?? '/carousel/manifest.json'

  const box = document.getElementById(elementId)
  if (!box) {
    throw new Error(`Carousel target not found: ${elementId}`)
  }

  const images = await loadCarouselImages(manifestPath)
  const pool: string[] = []
  const unloadedImages = [...images]

  let disposed = false
  let timer: number | undefined

  const preloadImage = async (url: string) => {
    const index = unloadedImages.indexOf(url)
    if (index < 0) {
      return
    }
    unloadedImages.splice(index, 1)

    const promise = new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = reject
      img.src = url
    })

    await promise
  }

  const nextBg = (first: boolean = false) => {
    if (disposed) {
      return
    }
    if (pool.length === 0) {
      pool.push(...images)
    }

    const idx = Math.floor(Math.random() * pool.length)
    const url = pool.splice(idx, 1)[0]
    void preloadImage(url)

    box.style.opacity = '0'
    if (first) {
      box.style.backgroundImage = `url(${url})`
      box.style.opacity = '1'
    }

    timer = window.setTimeout(() => {
      if (disposed) {
        return
      }
      box.style.backgroundImage = `url(${url})`
      box.style.opacity = '1'
      timer = window.setTimeout(() => nextBg(false), stayTime + fadeTime)
    }, fadeTime)
  }

  nextBg(true)

  return () => {
    disposed = true
    if (timer !== undefined) {
      window.clearTimeout(timer)
    }
  }
}
