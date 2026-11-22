import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'
import type { CardCelebration } from '../../domain/models'

export function BingoCelebration({
  kind,
  onClose,
}: {
  kind: CardCelebration
  onClose: () => void
}) {
  const { t } = useTranslation()
  const fullCard = kind === 'fullCard'
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 4500)
    return () => window.clearTimeout(timeout)
  }, [onClose])

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: (theme) => theme.zIndex.snackbar,
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          '@keyframes bingo-sparkle': {
            '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: 0 },
            '10%': { opacity: 1 },
            '100%': {
              transform: 'translateY(105vh) rotate(230deg)',
              opacity: 0,
            },
          },
          '@keyframes bingo-burst': {
            '0%': {
              transform: 'translate(0px, 0px) rotate(0deg) scale(0.2)',
              opacity: 0,
            },
            '15%': { opacity: 1 },
            '65%': { opacity: 1 },
            '100%': {
              transform:
                'translate(var(--burst-x), var(--burst-y)) rotate(240deg) scale(0.5)',
              opacity: 0,
            },
          },
          display: 'none',
          '@media (prefers-reduced-motion: no-preference)': {
            display: 'block',
          },
        }}
      >
        {Array.from({ length: fullCard ? 100 : 30 }, (_, index) => (
          <Box
            component="span"
            key={index}
            sx={{
              position: 'absolute',
              top: fullCard ? '50%' : -30,
              left: fullCard ? '50%' : `${(index * 37) % 100}%`,
              '--burst-x': `${Math.cos(index * 2.4) * (40 + (index % 5) * 10)}vw`,
              '--burst-y': `${Math.sin(index * 2.4) * (40 + (index % 5) * 10)}vh`,
              color: ['#d8bc7b', '#a33b40', '#4d8760'][index % 3],
              fontSize: `${(fullCard ? 24 : 12) + (index % 4) * (fullCard ? 8 : 5)}px`,
              opacity: 0,
              animation: `${fullCard ? 'bingo-burst' : 'bingo-sparkle'} ${(fullCard ? 3.4 : 2.5) + (index % 3) * 0.3}s ${(index % 5) * (fullCard ? 0.08 : 0.03)}s ${fullCard ? 'ease-out' : 'linear'} both`,
            }}
          >
            ✦
          </Box>
        ))}
      </Box>
      <Box
        role="status"
        sx={{
          position: 'absolute',
          top: 'max(24px, env(safe-area-inset-top))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'max-content',
          maxWidth: 'calc(100% - 32px)',
          boxSizing: 'border-box',
          py: 2,
          pl: 3,
          pr: 6,
          borderRadius: 3,
          bgcolor: '#134b38',
          color: '#fff8e8',
          border: '2px solid #d8bc7b',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          pointerEvents: 'auto',
        }}
      >
        <Typography
          component="p"
          sx={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#e5c780',
          }}
        >
          {fullCard ? t('play.fullCardTitle') : 'Bingo!'}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          {t(fullCard ? 'play.fullCardMessage' : 'play.bingoMessage')}
        </Typography>
        <IconButton
          aria-label={t('play.closeCelebration')}
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'inherit',
            width: 44,
            height: 44,
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
