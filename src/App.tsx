import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from './theme/ThemProvider'

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
