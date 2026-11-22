import Box from '@mui/material/Box'
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import ParkRoundedIcon from '@mui/icons-material/ParkRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded'
import { FreeCenterShape } from '../domain/models'

const icons = {
  [FreeCenterShape.Gift]: CardGiftcardRoundedIcon,
  [FreeCenterShape.Star]: StarRoundedIcon,
  [FreeCenterShape.Tree]: ParkRoundedIcon,
  [FreeCenterShape.Bell]: NotificationsRoundedIcon,
  [FreeCenterShape.Snowflake]: AcUnitRoundedIcon,
}

export function FreeCenterIcon({
  shape = FreeCenterShape.Star,
  label,
  compact = false,
}: {
  shape?: FreeCenterShape
  label: string
  compact?: boolean
}) {
  const Icon = icons[shape]
  return (
    <Box
      component="span"
      role="img"
      aria-label={label}
      sx={{
        display: 'inline-flex',
        width: '70%',
        maxWidth: 48,
        aspectRatio: '1',
        ...(compact && {
          position: 'absolute',
          inset: '20%',
          width: '60%',
          height: '60%',
          maxWidth: 'none',
        }),
      }}
    >
      <Icon sx={{ width: '100%', height: '100%', color: 'inherit' }} />
    </Box>
  )
}
