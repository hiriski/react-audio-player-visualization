import { FC, ReactNode, useState, createContext, useEffect } from 'react'

import { mediaData } from '@/data/media'

// Design context
export const MediaContext = createContext<MediaContext>({} as MediaContext)

interface Props {
  children: ReactNode
}

const MediaContextProvider: FC<Props> = ({ children }) => {
  const [mediaList, setMediaList] = useState<IMedia[]>(mediaData)
  const [currentMedia, setCurrentMedia] = useState<IMedia | null>(null)
  const [visibleMediaUploader, setVisibleMediaUploader] = useState(false)
  const [currentAudioFile, setCurrentAudioFile] = useState<File | null>(null)

  useEffect(() => {
    setCurrentMedia(mediaList[0])
  }, [mediaList])

  return (
    <MediaContext.Provider
      value={{
        mediaList,
        setMediaList,
        currentMedia,
        setCurrentMedia,
        visibleMediaUploader,
        setVisibleMediaUploader,
        currentAudioFile,
        setCurrentAudioFile
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export default MediaContextProvider
