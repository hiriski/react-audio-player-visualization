import React, { useRef, useState, useEffect, useCallback } from 'react'

// components
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// icons
import PlayIcon from '@/assets/icons/fluent--play-32-filled.svg?react'
import PauseIcon from '@/assets/icons/fluent--pause-20-filled.svg?react'
import PrevIcon from '@/assets/icons/fluent--previous-24-filled.svg?react'
import NextIcon from '@/assets/icons/fluent--next-28-filled.svg?react'

// React player
import ReactPlayer from 'react-player'

// styles
import {
  Widget,
  TinyText,
  CoverImage,
  BackgroundStyle,
  WidgetWrapper
} from './media-player.styled'

// Framer motion
import { motion } from 'framer-motion'

// hooks
import { useMedia } from '@/hooks'

const BAR_WIDTH = 3

let animationController: number
const audio = new Audio()

const MediaPlayer = () => {
  const theme = useTheme()

  // const dispatch = useAppDispatch()

  const { mediaList, currentMedia, setCurrentAudioFile, currentAudioFile } =
    useMedia()

  const [duration, setDuration] = useState<number>(0)
  const [position, setPosition] = React.useState<number>(0)

  const ref = useRef<typeof ReactPlayer>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const source = useRef<MediaElementAudioSourceNode | null>(null)
  const analyzer = useRef<AnalyserNode | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  // const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000'
  const mainIconColor = '#fff'

  const onChangeSong = useCallback(
    (type: 'prev' | 'next') => {
      // dispatch(media_changeMedia({ id: Number(currentMedia?.id), type }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Number(currentMedia?.id)]
  )

  const handleSeekChange = (sec: number) => {
    // console.log('sec', sec.toFixed(0))
    console.log('sec', sec)
    if (audioRef.current) {
      setPosition(Number(sec))
      // ref.current.seekTo(Number(sec.toFixed(0)))
    }
  }

  const createAudiVisualizeData = (): void => {
    animationController = requestAnimationFrame(createAudiVisualizeData)
    if (audioRef?.current?.paused) {
      setTimeout(() => {
        return cancelAnimationFrame(animationController)
      }, 350)
    } else {
      const arrayCount = Number(canvasRef?.current?.width) / BAR_WIDTH
      const audioData = new Uint8Array(arrayCount)

      if (analyzer?.current) {
        analyzer.current.getByteFrequencyData(audioData)
        // analyzer.fftSize = 200
        // console.log('analyzer.fftSize;', analyzer.fftSize)
      }

      if (canvasRef?.current) {
        let start = 0
        const ctx = canvasRef.current.getContext(
          '2d'
        ) as CanvasRenderingContext2D
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        for (let i = 0; i < audioData.length; i++) {
          // compute x coordinate where we would draw
          start = i * BAR_WIDTH + 1

          const recHeight = Number(-audioData[i] + 40)

          //create a gradient for the  whole canvas
          const gradient = ctx.createLinearGradient(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )
          gradient.addColorStop(0.3, '#00b1ba')
          gradient.addColorStop(0.5, '#00e8be')
          gradient.addColorStop(1.0, '#c9f977')
          ctx.fillStyle = gradient
          ctx.fillRect(start, canvasRef.current.height, BAR_WIDTH, recHeight)
        }
      }
    }
  }

  const handleAudioPlay = (): void => {
    const audioContext = new AudioContext()
    // console.log('audioContext', audioContext)
    if (!source?.current) {
      source.current = audioContext.createMediaElementSource(
        audioRef.current as HTMLMediaElement
      )
      analyzer.current = audioContext.createAnalyser()
      source.current.connect(analyzer.current)
      analyzer.current.connect(audioContext.destination)
    }
    createAudiVisualizeData()
  }

  const onClickToggle = (): void => {
    if (audioRef?.current?.paused) {
      audioRef?.current?.play()
      setIsPlaying(true)
    } else {
      audioRef?.current?.pause()
      setIsPlaying(false)
    }
  }

  /* ---------- metadata: duration ---------- */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoaded = () => setDuration(audio.duration || 0)
    audio.addEventListener('loadedmetadata', handleLoaded)

    // if metadata is cached
    if (audio.readyState >= 1) handleLoaded()

    return () => audio.removeEventListener('loadedmetadata', handleLoaded)
  }, [audioRef?.current])

  /* ---------- current position ---------- */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // fires ~4–5× per second while playing
    const handleTimeUpdate = () => setPosition(audio.currentTime)

    audio.addEventListener('timeupdate', handleTimeUpdate)

    // cleanup
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate)
  }, [audioRef?.current])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
      }}
    >
      <WidgetWrapper>
        <Widget isPlaying={isPlaying}>
          <Box sx={{}}>
            {currentMedia && (
              <Box
                component='audio'
                sx={{ display: 'none' }}
                ref={audioRef}
                onPlay={handleAudioPlay}
                src={String(currentMedia.file_url)}
                controls
              />
            )}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: -6,
              left: 0
            }}
          >
            <canvas ref={canvasRef} width={400} height={200} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              transition: [theme.transitions.create(['all'])],
              mb: 1
            }}
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: isPlaying ? [0, 360] : [0, 0]
                // scale: isPlaying ? 1.2 : 1
              }}
              transition={{
                duration: isPlaying ? 4 : 0,
                ease: 'linear',
                repeatDelay: 0,
                repeatType: 'loop',
                repeat: Infinity
              }}
            >
              <CoverImage
                isPlaying={isPlaying}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {currentMedia && (
                  <img
                    alt={currentMedia.title}
                    src={
                      currentMedia.cover_image
                        ? currentMedia.cover_image
                        : undefined
                    }
                  />
                )}
              </CoverImage>
            </motion.div>

            <Box sx={{ maxWidth: '100%', textAlign: 'center', mt: 1 }}>
              <Typography variant='caption' color='#fff' fontWeight={500}>
                {currentMedia?.artist ? currentMedia.artist : '-'}
              </Typography>
              <Typography noWrap variant='h6' sx={{ color: '#fff' }}>
                <b>{currentMedia?.title ? currentMedia.title : '-'}</b>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: -1
            }}
          >
            <TinyText>{formatDuration(Number(position.toFixed()))}</TinyText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1
            }}
          >
            <IconButton
              onClick={() => onChangeSong('prev')}
              aria-label='previous song'
              size='large'
            >
              <Box
                component={PrevIcon}
                sx={{ width: 20, height: 'auto', color: 'common.white' }}
              />
            </IconButton>
            <IconButton
              sx={{ mx: 2 }}
              aria-label={isPlaying ? 'play' : 'pause'}
              onClick={onClickToggle}
              size='large'
            >
              {isPlaying ? (
                <Box
                  component={PauseIcon}
                  sx={{ width: 32, height: 'auto', color: 'common.white' }}
                />
              ) : (
                <Box
                  component={PlayIcon}
                  sx={{ width: 32, height: 'auto', color: 'common.white' }}
                />
              )}
            </IconButton>
            <IconButton
              onClick={() => onChangeSong('next')}
              aria-label='next song'
              size='large'
            >
              <Box
                component={NextIcon}
                sx={{ width: 20, height: 'auto', color: 'common.white' }}
              />
            </IconButton>
          </Box>
        </Widget>
      </WidgetWrapper>
      <BackgroundStyle />
    </Box>
  )
}

export default MediaPlayer
