import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import './custom.css'

// fonts
import '@fontsource/jost' // Defaults to weight 400
import '@fontsource/jost/400.css'
import '@fontsource/jost/400-italic.css'
import '@fontsource/jost/500.css'
import '@fontsource/jost/500-italic.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/600-italic.css'

// Mui provider
import MuiThemeProvider from './plugins/@mui/components/@mui-theme.provider'
import MediaContextProvider from './contexts/media.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MuiThemeProvider>
      <MediaContextProvider>
        <App />
      </MediaContextProvider>
    </MuiThemeProvider>
  </React.StrictMode>
)
