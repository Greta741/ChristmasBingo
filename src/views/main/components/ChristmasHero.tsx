import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { PageContainer as Container } from '../../../components/layout/PageContainer'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { ChristmasScene } from './ChristmasScene'

const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(2.5),
  backgroundColor: '#0d3529',
  borderRadius: 0,
  borderTop: '1px solid rgba(255, 255, 255, 0.24)',
  color: theme.palette.primary.contrastText,
  backgroundImage:
    'radial-gradient(ellipse at 100% 100%, #2d6950, transparent 70%)',
}))

const HeroBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: '"content" "illustration"',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingBlock: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    minHeight: 380,
    boxSizing: 'border-box',
    gridTemplateAreas: '"content illustration"',
    gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
    paddingBlock: theme.spacing(5),
  },
}))

const HeroIllustration = styled('div')(({ theme }) => ({
  gridArea: 'illustration',
  width: '100%',
  maxWidth: 240,
  justifySelf: 'center',
  pointerEvents: 'none',
  [theme.breakpoints.up('sm')]: { maxWidth: 340 },
}))

const HeroEyebrow = styled(Typography)(({ theme }) => ({
  color: '#efcf8c',
  fontWeight: 700,
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  marginBottom: theme.spacing(1),
}))

export function ChristmasHero() {
  const { t } = useTranslation()

  return (
    <HeroSection as="section" aria-labelledby="hero-title">
      <Container>
        <HeroBody>
          <HeroIllustration>
            <ChristmasScene />
          </HeroIllustration>
          <Box sx={{ gridArea: 'content' }}>
            <HeroEyebrow as="p">{t('hero.eyebrow')}</HeroEyebrow>
            <Typography
              component="h1"
              variant="h1"
              id="hero-title"
              sx={{ mb: 1.5 }}
            >
              {t('hero.title')}
            </Typography>
            <Typography sx={{ color: '#e0ece5', maxWidth: 350, mb: 2.5 }}>
              {t('hero.description')}
            </Typography>
            <Button
              component={Link}
              to="/play/1"
              variant="contained"
              color="secondary"
              startIcon={<PlayArrowRoundedIcon />}
              sx={{ width: { xs: '100%', sm: 260 }, maxWidth: '100%' }}
            >
              {t('navigation.play')}
            </Button>
          </Box>
        </HeroBody>
      </Container>
    </HeroSection>
  )
}
