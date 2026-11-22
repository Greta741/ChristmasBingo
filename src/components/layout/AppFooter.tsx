import Box from '@mui/material/Box'
import { FooterEasterEgg } from './FooterEasterEgg'

export function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
    >
      <FooterEasterEgg />
    </Box>
  )
}
