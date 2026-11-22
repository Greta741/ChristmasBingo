import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

export function CandyCaneProgress({ marked }: { marked: number }) {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        role="progressbar"
        aria-label={t('history.progress', { marked })}
        aria-valuemin={0}
        aria-valuemax={25}
        aria-valuenow={marked}
        sx={{
          flex: 1,
          minWidth: 0,
          height: 14,
          borderRadius: 999,
          overflow: 'hidden',
          bgcolor: '#eee5d3',
          border: '1px solid #d9cba9',
          boxShadow: 'inset 0 1px 3px rgba(19, 75, 56, 0.1)',
        }}
      >
        <Box
          sx={{
            width: `${(marked / 25) * 100}%`,
            height: '100%',
            borderRadius: 'inherit',
            backgroundImage:
              'repeating-linear-gradient(45deg, #a33b40 0px, #a33b40 8px, #fffaf0 8px, #fffaf0 16px)',
            boxShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.35)',
          }}
        />
      </Box>
      <Box sx={{ flexShrink: 0, fontSize: '0.7rem', fontWeight: 700 }}>
        {marked}/25
      </Box>
    </Box>
  )
}
