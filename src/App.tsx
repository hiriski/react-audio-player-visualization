import Box from '@mui/material/Box'
import MediaPlayer from './components/media-player'

const App = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <MediaPlayer />
    </Box>
  )
}

export default App
