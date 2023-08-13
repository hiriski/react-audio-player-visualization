import Typography from '@mui/material/Typography'

import { Icon } from '@iconify/react'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

const Footer = () => (
  <Stack
    direction='column'
    alignItems='center'
    sx={{ py: 3, color: '#fbfbfb' }}
    spacing={0.3}
  >
    <Stack direction='row' spacing={0.6} alignItems='center'>
      <Typography>Made with</Typography>
      <Icon icon='mdi:cards-heart' height={18} width={18} color='#ff1f1f' />
      <Typography>By</Typography>
      <Link
        sx={{ color: '#fbfbfb' }}
        target='_blank'
        underline='hover'
        href='https://github.com/hiriski'
      >
        Riski
      </Link>
    </Stack>
    <Stack direction='row' spacing={1} alignItems='center'>
      <Typography>South Beach Pelabuhanratu, Indonesia</Typography>
    </Stack>
  </Stack>
)

export default Footer
