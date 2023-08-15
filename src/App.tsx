import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from './theme/ThemProvider'
import MediaPlayer from './components/media-player'
import Footer from './components/footer'

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
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
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
