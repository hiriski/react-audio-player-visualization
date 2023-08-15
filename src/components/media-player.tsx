import { ChangeEvent, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  BoxMediaInfo,
  BoxUpload,
  CoverImage,
  WallPaper,
  Widget,
  WidgetWrapper
} from './media-player.style'
import Iconify from './iconify'
import { motion, useAnimationControls } from 'framer-motion'
import { mediaList } from '@/data'
import { IMedia } from '@/interfaces'

function calculateMean(values: number[]): number {
  if (values.length === 0) {
    return 0
  }

  const sum = values.reduce((acc, currentValue) => acc + currentValue, 0)
  const mean = sum / values.length

  return Math.round(mean)
}

const BAR_WIDTH = 4
let animationController: number
const audioContext = new AudioContext()

const MediaPlayer = () => {
  // hooks
  const theme = useTheme()

  const animationControls = useAnimationControls()

  // refs
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const source = useRef<MediaElementAudioSourceNode | null>(null)
  const analyzer = useRef<AnalyserNode | null>(null)

  // states
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [currentMedia, setCurrentMedia] = useState<IMedia>(mediaList[0])

  const createAudiVisualizeData = (): void => {
    animationController = window.requestAnimationFrame(createAudiVisualizeData)
    if (audioRef?.current?.paused) {
      animationControls.set({
        scale: 1
      })
      return cancelAnimationFrame(animationController)
    }
    const arrayCount = Number(canvasRef?.current?.width) / BAR_WIDTH
    const audioData = new Uint8Array(arrayCount)

    if (analyzer?.current) {
      analyzer.current.getByteFrequencyData(audioData)
    }

    if (canvasRef?.current) {
      let start = 0
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      const getScale = (value: number) => {
        // const baseScale = 1
        let scale = 1
        const thresholds = [
          { min: 0, max: 20, scale: 1 },
          { min: 20, max: 50, scale: 1.01 },
          { min: 51, max: 80, scale: 1.02 },
          { min: 81, max: 120, scale: 1.03 },
          { min: 121, max: 140, scale: 1.05 },
          { min: 141, max: 150, scale: 1.08 },
          { min: 151, max: 160, scale: 1.1 },
          { min: 161, max: 170, scale: 1.13 },
          { min: 171, max: 180, scale: 1.16 },
          { min: 191, max: 200, scale: 1.2 },
          { min: 201, max: 210, scale: 1.22 },
          { min: 211, max: 220, scale: 1.26 },
          { min: 221, max: 230, scale: 1.29 },
          { min: 231, max: 240, scale: 1.34 },
          { min: 241, max: 250, scale: 1.39 },
          { min: 251, max: 260, scale: 1.45 },
          { min: 280, max: Infinity, scale: 1.55 }
        ]

        for (const threshold of thresholds) {
          if (value > threshold.min && value < threshold.max) {
            scale = threshold.scale
            break
          }
        }

        // const scaleFactor = 0.02 // Adjust this factor as needed
        // scale = baseScale + Math.floor(audioData[0] / 20) * scaleFactor
        return scale
      }

      animationControls.set({
        scale: getScale(
          calculateMean(audioData.slice(5, 12) as unknown as number[])
        )
      })

      // console.log(
      //   'value --->',
      //   calculateMean(audioData.slice(5, 12) as unknown as number[])
      // )

      for (let i = 0; i < audioData.length; i++) {
        // compute x coordinate where we would draw
        start = i * (BAR_WIDTH + 1)

        const recHeight = Number(-audioData[i])

        //create a gradient for the  whole canvas
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        gradient.addColorStop(0.1, '#FF2525')
        gradient.addColorStop(1.0, '#ffd83b')
        ctx.fillStyle = gradient
        ctx.fillRect(start, canvasRef.current.height, BAR_WIDTH, recHeight)
      }
    }
  }

  const onMediaChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target?.files?.[0]
    if (file) {
      setMediaFile(file)
      setFileName(file?.name ?? '')
    }
  }

  const handleAudioPlay = (params: ChangeEvent<HTMLAudioElement>): void => {
    if (params.type === 'play') {
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
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 8
      }}
    >
      <WidgetWrapper>
        <Widget>
          <Box sx={{ zIndex: 1 }}>
            {!currentMedia ? (
              <BoxUpload htmlFor='inputMediaFile'>
                <Box sx={{ mb: 1.2, color: 'primary.main' }}>
                  <Iconify
                    icon='solar:music-library-2-bold-duotone'
                    fontSize={54}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    Drop your media file or{' '}
                    <Typography component='span' color='primary.main'>
                      Browse
                    </Typography>
                  </Typography>
                  <Typography variant='subtitle2'>
                    Supported audio & video files
                  </Typography>
                </Box>
              </BoxUpload>
            ) : (
              <BoxMediaInfo>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '> *': {
                      transition: 'transform 0.1s ease'
                    }
                  }}
                >
                  <motion.div animate={animationControls}>
                    <CoverImage isPlaying={false}>
                      <img
                        alt={currentMedia.title ?? 'Cover img'}
                        src={currentMedia.cover_image_url}
                      />
                    </CoverImage>
                  </motion.div>
                </Box>
                <Box sx={{ maxWidth: '100%', textAlign: 'center', mt: 1 }}>
                  <Typography variant='caption' color='#333' fontWeight={500}>
                    {currentMedia?.artist ? currentMedia.artist : '-'}
                  </Typography>
                  <Typography noWrap variant='h6' sx={{ color: '#333' }}>
                    <b>{currentMedia?.title ? currentMedia.title : '-'}</b>
                  </Typography>
                </Box>
                {/* <UploadButton htmlFor='inputMediaFile'>
                  <Iconify
                    icon='solar:music-library-2-bold-duotone'
                    fontSize={20}
                  />
                  <Typography sx={{ ml: 1, fontWeight: '600' }}>
                    Change Media
                  </Typography>
                </UploadButton> */}
              </BoxMediaInfo>
            )}
            <Box
              component='input'
              sx={{ display: 'none' }}
              type='file'
              id='inputMediaFile'
              accept='audio/*,video/*'
              onChange={onMediaChange}
            />
            {currentMedia && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  position: 'absolute',
                  bottom: theme.spacing(4),
                  left: 0,
                  zIndex: 1,
                  '> audio': {
                    width: '85%'
                  }
                }}
              >
                <audio
                  ref={audioRef}
                  onPlay={handleAudioPlay}
                  src={currentMedia.file_url}
                  controls
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -10,
              left: 0,
              zIndex: -1
            }}
          >
            <canvas ref={canvasRef} width={450} height={360} />
          </Box>
        </Widget>
      </WidgetWrapper>
      <WallPaper />
    </Box>
  )
}

export default MediaPlayer
