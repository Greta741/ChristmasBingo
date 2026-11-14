import Box from '@mui/material/Box'

export function FestiveBranch({
  mirrored = false,
  compact = false,
}: {
  mirrored?: boolean
  compact?: boolean
}) {
  return (
    <Box
      component="svg"
      viewBox="0 0 90 90"
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: 0,
        width: compact ? 48 : { xs: 64, sm: 82 },
        height: compact ? 48 : 82,
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
