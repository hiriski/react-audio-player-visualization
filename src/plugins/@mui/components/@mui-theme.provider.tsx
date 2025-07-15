import { FC, ReactNode, useMemo } from 'react'

// @mui
import { createTheme } from '@/theme'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'

const MuiThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMemo<Theme>(() => createTheme(), [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
