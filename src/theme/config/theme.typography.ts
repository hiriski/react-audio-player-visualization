const fontFamily = [
  '"Jost", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
].join(',')

const typography = {
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 400,
  fontWeightBold: 600,
  h1: {
    fontWeight: 400,
    fontSize: 34
  },
  h2: {
    fontWeight: 400,
    fontSize: 30
  },
  h3: {
    fontSize: 28,
    fontWeight: 400
  },
  h4: {
    fontSize: 24,
    fontWeight: 600
  },
  h5: {
    fontSize: 20,
    fontWeight: 600
  },
  h6: {
    fontSize: 16,
    fontWeight: 600
  },
  body1: {
    fontSize: '0.875rem'
  },
  body2: {
    fontSize: '0.875rem'
  },
  subtitle1: {
    fontSize: '0.8rem'
  },
  subtitle2: {
    fontSize: '0.75rem'
  }
}

export { typography }
