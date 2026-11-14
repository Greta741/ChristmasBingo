import { FestiveBranch } from './FestiveBranch'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function BingoCardFrame({
  titleId,
  subtitle,
  children,
  headingComponent = 'h2',
}: {
  titleId: string
  subtitle: string
  children: ReactNode
  headingComponent?: 'h1' | 'h2'
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
          component={headingComponent}
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
