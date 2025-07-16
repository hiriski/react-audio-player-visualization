import { PaletteColorOptions, PaletteOptions } from '@mui/material'
import { grey } from '@mui/material/colors'
import paletteBase from './palette-base'

const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#23293b',
    paper: '#1f2433'
  },
  text: {
    primary: '#f4f6ff',
    secondary: '#b6bbe0',
    disabled: grey[400]
  },
  primary: {
    ...paletteBase.primary,
    dark: '#274171'
  } as PaletteColorOptions,
  secondary: {
    ...paletteBase.secondary
  } as PaletteColorOptions
}

export default paletteDark
