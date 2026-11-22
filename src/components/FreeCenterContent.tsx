import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import type { FreeCenterShape } from '../domain/models'
import { FreeCenterIcon } from './FreeCenterIcon'

export function FreeCenterContent({
  shape,
  label,
  printMode = false,
}: {
  shape?: FreeCenterShape
  label: string
  printMode?: boolean
}) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [celebrating, setCelebrating] = useState(false)
  useEffect(() => {
    if (!celebrating) return
    const timeout = window.setTimeout(() => setCelebrating(false), 800)
    return () => window.clearTimeout(timeout)
  }, [celebrating])

  if (printMode) return <FreeCenterIcon shape={shape} label={label} />
  const animate = celebrating && !reducedMotion
  return (
    <ButtonBase
      aria-label={label}
      disableRipple
      onClick={() => {
        if (!reducedMotion) setCelebrating(true)
      }}
      sx={{
        position: 'relative',
        flex: 1,
        alignSelf: 'stretch',
        color: 'inherit',
        overflow: 'hidden',
        '&.Mui-focusVisible': {
          outline: '3px solid #e5c780',
          outlineOffset: -3,
        },
        '@keyframes free-center-bounce': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'translateY(-6px) scale(1.2) rotate(-15deg)' },
          '55%': { transform: 'scale(0.9) rotate(12deg)' },
          '80%': { transform: 'translateY(-3px) scale(1.1) rotate(-6deg)' },
        },
        '@keyframes free-center-spark': {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
          '20%': { opacity: 1 },
          '100%': {
            transform:
              'translate(calc(-50% + var(--spark-x)), calc(-50% + var(--spark-y))) scale(0.3) rotate(100deg)',
            opacity: 0,
          },
        },
      }}
    >
      <Box
        component="span"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '@media (prefers-reduced-motion: no-preference)': {
            animation: animate
              ? 'free-center-bounce 750ms ease-in-out'
              : 'none',
          },
        }}
      >
        <FreeCenterIcon shape={shape} label={label} />
      </Box>
      {animate &&
        Array.from({ length: 8 }, (_, index) => (
          <StarRoundedIcon
            key={index}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              fontSize: index % 2 ? 10 : 14,
              color: '#efcf8c',
              pointerEvents: 'none',
              opacity: 0,
              '--spark-x': `${Math.cos((index * Math.PI) / 4) * 30}px`,
              '--spark-y': `${Math.sin((index * Math.PI) / 4) * 30}px`,
              '@media (prefers-reduced-motion: no-preference)': {
                animation: 'free-center-spark 750ms ease-out both',
              },
            }}
          />
        ))}
    </ButtonBase>
  )
}
