import { FC, ReactNode, useMemo } from 'react'

// Mui
import {
  createTheme,
  Theme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Lodash
import merge from 'lodash.merge'

// Theme mui-config
import { paletteBase } from '@/theme/config/theme.palette-base'
import { paletteDark } from '@/theme/config/theme.palette-dark'
import { paletteLight } from '@/theme/config/theme.palette-light'
import { typography } from '@/theme/config/theme.typography'
import { components } from '@/theme/config/theme.components'
import { shadows } from '@/theme/config/theme.shadows'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const mode = 'dark' // force to dark mode
  const theme = useMemo<Theme>(() => {
    // prettier-ignore
    const palette = mode === 'dark' ? merge(paletteBase, paletteDark) : merge(paletteBase, paletteLight)
    return createTheme({
      palette,
      typography,
      shadows,
      components
    })
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
