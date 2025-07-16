import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const BackgroundStyle = styled('div')({
  zIndex: -1,
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  backgroundImage: "url('fluid_background_6.jpg')",
  backgroundPosition: 'left top',
  backgroundSize: 'cover',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-35%',
    background:
      'radial-gradient(at center center, rgb(127 8 139) 0%, rgba(62, 79, 249, 0) 64%)'
  },
  '&:after': {
    content: '""',
    width: '180%',
    height: '200%',
    position: 'absolute',
    bottom: '-55%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(37 67 216) 0%, rgb(0 0 0 / 0%) 90%)',
    transform: 'rotate(30deg)',
    zIndex: 1
  }
})

export const WidgetWrapper = styled('div')(({ theme }) => ({
  width: '94%',
  height: '94vh',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    width: 400,
    height: 600
  },
  zIndex: 1
}))

interface IWidget {
  isPlaying: boolean
}

export const Widget = styled('div', {
  shouldForwardProp: prop => prop !== 'isPlaying'
})<IWidget>(({ theme, isPlaying }) => ({
  backgroundImage: "url('sebastiaan-chia-_saAvl1E0vg-unsplash.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  paddingBottom: '1rem',
  borderRadius: '1.8rem',
  width: '100%',
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0,0,0,0.8)'
      : 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(10px)',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  boxShadow: theme.shadows[4],
  '&:after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: isPlaying
      ? 'linear-gradient(0deg, rgb(21 2 100 / 84%) 0%, rgba(226, 99, 255, 0.5) 80%, rgb(168 22 155 / 81%) 100%)'
      : 'linear-gradient(0deg, rgba(129,99,255,0.98) 0%, rgba(226,99,255,0.98) 80%, rgb(254 32 143 / 98%) 100%)',
    transition: [theme.transitions.create(['all'])],
    zIndex: -1
  }
}))

interface ICoverImage {
  isPlaying: boolean
}

export const CoverImage = styled('div', {
  shouldForwardProp: prop => prop !== 'isPlaying'
})<ICoverImage>(({ theme, isPlaying }) => ({
  transition: [theme.transitions.create(['width', 'height'])],
  width: isPlaying ? 85 : 160,
  height: isPlaying ? 85 : 160,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: '100%',
  backgroundColor: 'rgba(0,0,0,0.08)',
  lineHeight: 0,
  borderColor: '#fff',
  borderWidth: isPlaying ? 3 : 5,
  borderStyle: 'solid',
  boxShadow: theme.shadows[4],
  '& > img': {
    height: '100%',
    width: 'auto'
  }
}))

export const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
  color: '#fff'
})
