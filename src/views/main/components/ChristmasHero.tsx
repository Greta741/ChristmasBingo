import { useQuickPlay } from '../../../hooks/useQuickPlay'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { PageContainer as Container } from '../../../components/layout/PageContainer'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { ChristmasScene } from './ChristmasScene'

const HeroSection = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#0d3529',
  borderRadius: 0,
  borderTop: '1px solid rgba(255, 255, 255, 0.24)',
  color: theme.palette.primary.contrastText,
  backgroundImage:
    'radial-gradient(ellipse at 100% 100%, #2d6950, transparent 70%)',
}))

const HeroBody = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: '"scene" "action"',
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
  [theme.breakpoints.up('md')]: {
    minHeight: 420,
    gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 7fr)',
    gap: theme.spacing(4),
  },
}))

const HeroIllustration = styled('div')(({ theme }) => ({
  gridArea: 'scene',
  width: '100%',
  maxWidth: 640,
  opacity: 0.14,
  transform: 'translateY(32px)',
  justifySelf: 'center',
  pointerEvents: 'none',
  [theme.breakpoints.up('sm')]: {
    gridArea: 'illustration',
    opacity: 1,
    transform: 'none',
  },
}))

const HeroContent = styled('div')(({ theme }) => ({
  display: 'contents',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    gridArea: 'content',
  },
}))

const HeroText = styled('div')(({ theme }) => ({
  gridArea: 'scene',
  position: 'relative',
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: { minHeight: 0, display: 'block' },
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
  const { startPlaying, starting, startError } = useQuickPlay()

  return (
    <HeroSection as="section" aria-labelledby="hero-title">
      <Container>
        <HeroBody>
          <HeroIllustration>
            <ChristmasScene />
          </HeroIllustration>
          <HeroContent>
            <HeroText>
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
            </HeroText>
            <Button
              onClick={startPlaying}
              loading={starting}
              variant="contained"
              color="secondary"
              startIcon={<PlayArrowRoundedIcon />}
              sx={{
                gridArea: 'action',
                width: { xs: '100%', sm: 260 },
                maxWidth: '100%',
              }}
            >
              {t('navigation.play')}
            </Button>
          </HeroContent>
        </HeroBody>
        {startError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {t('hero.startError')}
          </Alert>
        )}
      </Container>
    </HeroSection>
  )
}
