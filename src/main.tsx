import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './custom.css'

// fonts
import '@fontsource/jost' // Defaults to weight 400
import '@fontsource/jost/400.css'
import '@fontsource/jost/400-italic.css'
import '@fontsource/jost/500.css'
import '@fontsource/jost/500-italic.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/600-italic.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
