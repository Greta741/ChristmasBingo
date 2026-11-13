import { useId } from 'react'
import { keyframes } from '@emotion/react'
import { styled } from '@mui/material/styles'

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`

const sway = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`

const Decorations = styled('div')({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
  '& > .sparkles': { width: '100%', height: '100%', opacity: 0.2 },
  '& > .fir-corner': {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 'clamp(160px, 24vw, 300px)',
    opacity: 0.65,
  },
  '@media (prefers-reduced-motion: no-preference)': {
    '& .ornament': {
      transformBox: 'view-box',
      animation: `${sway} 5.6s ease-in-out infinite`,
    },
    '& .ornament-large': { transformOrigin: '222px 70px' },
    '& .ornament-small': {
      transformOrigin: '264px 130px',
      animationDuration: '6.8s',
      animationDelay: '-2.7s',
    },
    '& .background-star': {
      animation: `${twinkle} 5s ease-in-out infinite`,
    },
    '& .background-star-delayed': {
      animationDuration: '6.7s',
      animationDelay: '-3.4s',
    },
  },
  '@media print': {
    '& .background-star, & .ornament': { animation: 'none' },
  },
})

export function CreationDecorations() {
  const patternId = useId()

  return (
    <Decorations aria-hidden="true">
      <svg className="sparkles" focusable="false">
        <defs>
          <pattern
            id={patternId}
            width="210"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              className="background-star"
              d="m28 24 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"
              fill="#f4d58c"
            />
            <path
              className="background-star background-star-delayed"
              d="m151 112 1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5Z"
              fill="#f4d58c"
            />
            <circle cx="105" cy="52" r="1.5" fill="#fff5df" />
            <circle cx="67" cy="129" r="1" fill="#fff5df" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <svg
        className="fir-corner"
        viewBox="0 0 300 190"
        fill="none"
        focusable="false"
      >
        <g strokeLinecap="round">
          <path
            d="M308-8Q224 53 143 71M308-8Q274 79 273 145"
            stroke="#e6c681"
            strokeWidth="3"
          />
          <g stroke="#134b38" strokeWidth="5">
            <path d="m279 13-42-7m42 7-7 36m-15-20-43-8m43 8-7 35m-19-21-40-6m40 6-9 31m-18-20-39-4m39 4-10 28m-18-20-35-1m35 1-12 25" />
            <path d="m295 25 4 33m-4-33-28 9m17 15 10 33m-10-33-27 10m20 14 13 32m-13-32-26 13m23 11 13 29m-13-29-24 15m22 12 12 28m-12-28-22 16" />
          </g>
          <g stroke="#478061" strokeWidth="2">
            <path d="m279 13-42-7m42 7-7 36m-41-6-40-6m40 6-9 31m-46-12-35-1m35 1-12 25m120-38 10 33m-10-33-27 10m17 38 13 29m-13-29-24 15" />
          </g>
        </g>
        <g className="ornament ornament-large">
          <path
            d="M222 70v23"
            stroke="#f4d58c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="222" cy="105" r="12" fill="#edcd84" />
          <path
            d="M217 98q-6 5-3 10"
            stroke="#fff4d4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <g className="ornament ornament-small">
          <path
            d="M264 130v17"
            stroke="#f4d58c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="264" cy="155" r="8" fill="#edcd84" />
        </g>
      </svg>
    </Decorations>
  )
}
