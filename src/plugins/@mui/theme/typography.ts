import { TypographyVariantsOptions } from '@mui/material'

// export const fontFamily = 'gdt'

export const fontFamily = ['"Jost","Helvetica","Arial",sans-serif'].join(',')

const typography: TypographyVariantsOptions = {
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    fontSize: 36,
    fontFamily
  },
  h2: {
    fontWeight: 700,
    fontSize: 30,
    fontFamily
  },
  h3: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily
  },
  h4: {
    fontSize: 22,
    fontWeight: 700,
    fontFamily
  },
  h5: {
    fontSize: 17,
    fontWeight: 600,
    fontFamily
  },
  h6: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily
  },
  body1: {
    fontSize: '0.875rem'
  },
  body2: {
    fontSize: '0.85rem'
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 400
  },
  subtitle2: {
    fontSize: '0.8rem',
    fontWeight: 500
  }
}

export default typography
