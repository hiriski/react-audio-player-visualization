import { alpha, PaletteColorOptions, PaletteOptions } from '@mui/material'
import { grey } from '@mui/material/colors'
import paletteBase from './palette-base'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#e0e9f6',
    paper: '#f6f9ff'
  },
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500]
  },
  divider: alpha('#000', 0.07),
  primary: {
    ...paletteBase.primary
  } as PaletteColorOptions,
  secondary: {
    ...paletteBase.secondary
  } as PaletteColorOptions
}

export default palette
