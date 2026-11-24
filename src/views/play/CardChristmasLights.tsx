import Box from '@mui/material/Box'
import { keyframes } from '@mui/material/styles'

const twinkle = keyframes`
  0%, 100% { opacity: 1; filter: brightness(1.3); }
  50% { opacity: 0.25; filter: brightness(0.7); }
`
const fade = keyframes`
  0%, 100% { opacity: 0; }
  12%, 85% { opacity: 1; }
`
const colors = ['#ff5757', '#ffc94d', '#62df8b', '#80caff']

export function CardChristmasLights() {
  return (
    <Box
      aria-hidden="true"
      sx={(theme) => ({
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        borderRadius: {
          xs: 0,
          sm: `${Number(theme.shape.borderRadius) * 3}px`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          boxSizing: 'border-box',
          border: '2px solid #23533b',
          borderRadius: 'inherit',
        },
        animation: `${fade} 2.6s ease-in-out both`,
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      })}
    >
      {Array.from({ length: 36 }, (_, index) => {
        const side = Math.floor(index / 9)
        const fraction = (index % 9) / 8
        // Keep bulbs on the straight sections, clear of the rounded corners.
        const offset = {
          xs: `calc(${12 * (1 - 2 * fraction)}px + ${fraction * 100}%)`,
          sm: `calc(${40 * (1 - 2 * fraction)}px + ${fraction * 100}%)`,
        }
        const color = colors[index % colors.length]
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              ...(side === 0
                ? { top: '2px', left: offset }
                : side === 1
                  ? { right: '2px', top: offset }
                  : side === 2
                    ? { bottom: '2px', left: offset }
                    : { left: '2px', top: offset }),
              width: 0,
              height: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: -2.5,
                top: -1.5,
                width: 5,
                height: 3,
                bgcolor: '#23533b',
                transform: `rotate(${side * 90}deg)`,
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: -3.5,
                top: 1.5,
                width: 7,
                height: 11,
                borderRadius: '40% 40% 50% 50%',
                bgcolor: color,
                boxShadow: `0 0 8px 2px ${color}`,
                transform: `rotate(${side * 90}deg)`,
                transformOrigin: '50% -1.5px',
                animation: `${twinkle} 1s ease-in-out ${index % 2 ? '-0.5s' : '0s'} infinite`,
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}
