declare global {
  interface IMedia {
    id: number
    title: string
    artist: string
    youtube_url: string | null
    cover_image: string | null
    file_url?: string | null
    mime_type?: string | null
  }

  interface MediaContext {
    currentMedia: IMedia | null
    setCurrentMedia: (media: IMedia | null) => void
    mediaList: IMedia[]
    setMediaList: (mediaList: IMedia[]) => void
    visibleMediaUploader: boolean
    setVisibleMediaUploader: (visible: boolean) => void
    currentAudioFile: File | null
    setCurrentAudioFile: (file: File | null) => void
  }
}

export {}
