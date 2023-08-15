import { styled } from '@mui/material/styles'

export const WallPaper = styled('div')({
  zIndex: -1,
  position: 'absolute',
  backgroundImage:
    'url("334986476_596031572542316_8847941770663362142_n.jpeg")',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  '&:after': {
    content: "''",
    width: '100%',
    height: '100%',
    display: 'block',
    top: 0,
    left: 0,
    backgroundImage:
      'linear-gradient(45deg, rgb(253 208 255 / 15%) 0%, rgb(147 232 255 / 67%) 52%, rgb(189 254 218 / 35%) 90%)'
  }
})

export const WidgetWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    width: 400,
    height: 572
  },
  zIndex: 1
}))

export const Widget = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  paddingBottom: theme.shape.borderRadius * 4,
  borderRadius: theme.shape.borderRadius * 4,
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
  justifyContent: 'center',
  flexDirection: 'column',
  boxShadow: theme.shadows[4],
  '&:after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fbfbfb',
    backgroundImage:
      'linear-gradient(30deg, rgb(255 142 228 / 44%) 0%, rgb(147 255 250) 100%)',
    zIndex: -3
  }
}))

export const CoverImage = styled('div', {
  shouldForwardProp: prop => prop !== 'isPlaying'
})<{ isPlaying?: boolean }>(({ theme, isPlaying }) => ({
  // transition: [theme.transitions.create(['width', 'height'])],
  width: isPlaying ? 85 : 110,
  height: isPlaying ? 85 : 110,
  borderRadius: 110,
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  '& > img': {
    height: '100%',
    width: '100%'
  }
}))

export const BoxUpload = styled('label')(({ theme }) => ({
  position: 'relative',
  width: 240,
  height: 180,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
  '&:hover': {
    '&:after': {
      transform: 'scale(1.1)'
    }
  },
  '&:after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: -1,
    transition: [theme.transitions.create(['transform'], { duration: 200 })],
    borderRadius: Number(theme.shape.borderRadius) * 6,
    boxShadow: theme.shadows[1]
  }
}))

export const UploadButton = styled('label')(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  padding: theme.spacing(1.2, 1.6),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    '&:after': {
      transform: 'scale(1.1)'
    }
  },
  '&:after': {
    content: '""',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: -1,
    transition: [theme.transitions.create(['transform'], { duration: 200 })],
    borderRadius: Number(theme.shape.borderRadius) * 2,
    boxShadow: theme.shadows[2]
  }
}))

export const BoxMediaInfo = styled('div')(({ theme }) => ({
  transition: [theme.transitions.create(['width', 'height'])],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 4),
  color: '#333'
}))
