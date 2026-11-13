import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary">
          Maži atradimai. Daugiau kalėdinės nuotaikos.
        </Typography>
      </Container>
    </Box>
  )
}
