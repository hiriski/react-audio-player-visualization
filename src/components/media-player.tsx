import { ChangeEvent, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  BoxMediaInfo,
  BoxUpload,
  CoverImage,
  UploadButton,
  WallPaper,
  Widget,
  WidgetWrapper
} from './media-player.style'
import Iconify from './iconify'

const BAR_WIDTH = 2
let animationController: number
const audioContext = new AudioContext()

const MediaPlayer = () => {
  // hooks
  const theme = useTheme()

  // refs
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const source = useRef<MediaElementAudioSourceNode | null>(null)
  const analyzer = useRef<AnalyserNode | null>(null)

  // states
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const createAudiVisualizeData = (): void => {
    animationController = window.requestAnimationFrame(createAudiVisualizeData)
    if (audioRef?.current?.paused) {
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
      for (let i = 0; i < audioData.length; i++) {
        // compute x coordinate where we would draw
        start = i * BAR_WIDTH

        const recHeight = Number(-audioData[i])

        //create a gradient for the  whole canvas
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        gradient.addColorStop(0.2, '#FF2525')
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
        mt: 2
      }}
    >
      <WidgetWrapper>
        <Widget>
          <Box sx={{ zIndex: 1 }}>
            {!mediaFile ? (
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
                <CoverImage>
                  <img src='/react.svg' alt='Cover image' />
                </CoverImage>
                <Typography
                  sx={{ textAlign: 'center', fontSize: '1rem', mb: 1.2 }}
                >
                  {fileName}
                </Typography>
                <UploadButton htmlFor='inputMediaFile'>
                  <Iconify
                    icon='solar:music-library-2-bold-duotone'
                    fontSize={20}
                  />
                  <Typography sx={{ ml: 1, fontWeight: '600' }}>
                    Change Media
                  </Typography>
                </UploadButton>
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
            {mediaFile && (
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
                  src={window.URL.createObjectURL(mediaFile)}
                  controls
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -6,
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
