import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

function FestiveBranch({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 90 90"
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: 0,
        width: { xs: 64, sm: 82 },
        height: 82,
        ...(mirrored ? { right: 0, transform: 'scaleX(-1)' } : { left: 0 }),
        pointerEvents: 'none',
      }}
    >
      <path
        d="M0 0 Q32 25 68 68 M12 14 L36 13 M22 25 L48 24 M33 36 L59 34 M44 47 L70 45 M14 16 L10 38 M25 28 L20 51 M36 39 L32 63"
        fill="none"
        stroke="#7da68a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M48 24 V44" stroke="#e5c780" />
      <circle cx="48" cy="49" r="6" fill="#c66363" />
      <circle cx="62" cy="24" r="3" fill="#e5c780" />
      <path d="M72 48 l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#e5c780" />
    </Box>
  )
}

export function BingoCardFrame({
  titleId,
  subtitle,
  children,
}: {
  titleId: string
  subtitle: string
  children: ReactNode
}) {
  const { t } = useTranslation()
  return (
    <Paper
      component="section"
      aria-labelledby={titleId}
      sx={{
        minWidth: 0,
        alignSelf: 'start',
        overflow: 'hidden',
        border: '1px solid #c6ab70',
        borderRadius: 3,
        backgroundColor: '#fffaf0',
        boxShadow: '0 6px 24px rgba(19, 75, 56, 0.08)',
      }}
    >
      <Box
        component="header"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          py: 2.5,
          px: { xs: 6, sm: 9 },
          color: '#fff8e8',
          bgcolor: 'primary.main',
          backgroundImage:
            'radial-gradient(ellipse at top, #28634b, transparent 80%)',
          borderBottom: '3px solid #d8bc7b',
        }}
      >
        <FestiveBranch />
        <FestiveBranch mirrored />
        <Typography
          component="p"
          sx={{
            color: '#e5c780',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            mb: 0.5,
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          id={titleId}
          component="h2"
          sx={{
            fontFamily: 'Georgia, serif',
            fontSize: { xs: '1.6rem', sm: '2rem' },
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {t('app.name')}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            color: '#e5c780',
            fontSize: '0.75rem',
            letterSpacing: '0.6em',
            mt: 1,
          }}
        >
          ✦ ✧ ✦
        </Box>
      </Box>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>{children}</Box>
    </Paper>
  )
}
