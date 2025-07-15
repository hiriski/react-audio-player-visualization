// react
import { useContext } from 'react'

// context
import { MediaContext } from '@/contexts'

export const useMedia = () => {
  const mediaContext = useContext(MediaContext)
  return {
    ...mediaContext
  }
}
