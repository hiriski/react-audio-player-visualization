import { Components } from '@mui/material'

const components: Components = {
  MuiButton: {
    defaultProps: {
      disableRipple: true
    },
    styleOverrides: {
      root: {
        textTransform: 'unset'
      }
    }
  }
}

export default components
