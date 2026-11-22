import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SantaSleigh } from './SantaSleigh'
import { PageContainer } from './PageContainer'

export function FooterEasterEgg() {
  const { t } = useTranslation()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const duration = isDesktop ? 10000 : 3000
  const [passing, setPassing] = useState(false)

  useEffect(() => {
    if (!passing) return
    if (reducedMotion) {
      const timeout = window.setTimeout(() => setPassing(false), 0)
      return () => window.clearTimeout(timeout)
    }
    const timeout = window.setTimeout(() => setPassing(false), duration + 200)
    return () => window.clearTimeout(timeout)
  }, [passing, reducedMotion, duration])

  return (
    <ButtonBase
      aria-label={t('app.footer')}
      onClick={() => {
        if (!reducedMotion && !passing) setPassing(true)
      }}
      disableRipple
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 64,
        justifyContent: 'flex-start',
        overflow: 'hidden',
        '&.Mui-focusVisible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
        '@keyframes santa-footer-pass': {
          from: { left: 0, transform: 'translateX(-100%)' },
          to: { left: '100%', transform: 'translateX(0)' },
        },
      }}
    >
      <PageContainer sx={{ textAlign: 'left' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            visibility: passing && !reducedMotion ? 'hidden' : 'visible',
          }}
        >
          {t('app.footer')}
        </Typography>
      </PageContainer>
      {passing && !reducedMotion && (
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            whiteSpace: 'nowrap',
            fontSize: 32,
            lineHeight: 1,
            pointerEvents: 'none',
            '@media (prefers-reduced-motion: no-preference)': {
              animation: `santa-footer-pass ${duration}ms linear both`,
            },
          }}
        >
          <SantaSleigh />
        </Box>
      )}
    </ButtonBase>
  )
}
