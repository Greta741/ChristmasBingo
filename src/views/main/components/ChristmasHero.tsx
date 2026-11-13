import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import { ChristmasScene } from './ChristmasScene'

export function ChristmasHero() {
  return (
    <Paper
      component="section"
      aria-labelledby="hero-title"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mb: 2.5,
        bgcolor: '#0d3529',
        borderRadius: 0,
        borderTop: '1px solid rgba(255, 255, 255, 0.24)',
        color: 'primary.contrastText',
        backgroundImage:
          'radial-gradient(ellipse at 100% 100%, #2d6950, transparent 70%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ position: 'relative', pt: { xs: 2.5, sm: 3.5} , pb: { xs: 2.5, sm: 3.5 } }}>
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 220, sm: '40%' },
              right: { xs: -34, sm: 8 },
              bottom: { xs: -5, sm: 12 },
              opacity: { xs: 0.16, sm: 1 },
              pointerEvents: 'none',
            }}
          >
            <ChristmasScene />
          </Box>
          <Box sx={{ position: 'relative', width: { xs: '100%', sm: '60%' } }}>
            <Typography
              component="p"
              sx={{
                color: '#efcf8c',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                mb: 1,
              }}
            >
              KALĖDINIS BINGO
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              id="hero-title"
              sx={{ mb: 1.5 }}
            >
              Atrask Kalėdas savo kaimynystėje
            </Typography>
            <Typography sx={{ color: '#e0ece5', maxWidth: 350, mb: 2.5 }}>
              Šviečiantys langai, papuoštos eglutės ir maži atradimai. Išeik
              pasivaikščioti ir surink savo bingo.
            </Typography>
            <Button
              component={Link}
              to="/play/1"
              variant="contained"
              color="secondary"
              startIcon={<PlayArrowRoundedIcon />}
              sx={{ width: { xs: '100%', sm: 260 }, maxWidth: '100%' }}
            >
              Žaisti
            </Button>
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}
