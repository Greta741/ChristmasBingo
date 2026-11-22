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
  printMode = false,
  squareOnMobile = false,
}: {
  titleId: string
  subtitle: string
  children: ReactNode
  headingComponent?: 'h1' | 'h2'
  printMode?: boolean
  squareOnMobile?: boolean
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
        borderRadius: squareOnMobile ? { xs: 0, sm: 3 } : 3,
        ...(squareOnMobile && {
          borderTop: { xs: '3px solid #d8bc7b', sm: '1px solid #c6ab70' },
        }),
        backgroundColor: '#fffaf0',
        boxShadow: '0 6px 24px rgba(19, 75, 56, 0.08)',
        ...(printMode && {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'none',
          borderRadius: 0,
          breakInside: 'avoid',
        }),
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
          ...(printMode && {
            py: 0.75,
            px: 4,
            flexShrink: 0,
            '& svg': { width: 36, height: 36 },
          }),
        }}
      >
        <FestiveBranch />
        <FestiveBranch mirrored />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            color: '#e5c780',
            opacity: 0.12,
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          {[2.5, 5, 3.5].map((size) => (
            <Box
              component="span"
              key={size}
              sx={{ fontSize: `${printMode ? size * 0.6 : size}rem` }}
            >
              ✦
            </Box>
          ))}
        </Box>
        <Typography
          component="p"
          sx={{
            position: 'relative',
            color: '#e5c780',
            fontSize: printMode ? '0.5rem' : '0.65rem',
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
            position: 'relative',
            fontFamily: 'Georgia, serif',
            fontSize: printMode ? '0.85rem' : { xs: '1.6rem', sm: '2rem' },
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {t('app.name')}
        </Typography>
      </Box>
      <Box
        sx={
          printMode
            ? { p: '2mm', flex: 1, minHeight: 0 }
            : { p: { xs: 1, sm: 2 } }
        }
      >
        {children}
      </Box>
    </Paper>
  )
}
