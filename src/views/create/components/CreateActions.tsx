import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const ActionBar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
}))

const CountStepper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 2,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  '& .MuiIconButton-root': { borderRadius: 8 },
  '&:focus-within': {
    outline: '2px solid #efcf8c',
    outlineOffset: 3,
  },
}))

const CountInput = styled(InputBase)(({ theme }) => ({
  width: 56,
  color: theme.palette.text.primary,
  fontWeight: 700,
  borderInline: `1px solid ${theme.palette.divider}`,
  '& input': {
    textAlign: 'center',
    MozAppearance: 'textfield',
    padding: '6px 0',
  },
  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
}))

interface CreateActionsProps {
  batchSize: number
  onBatchSizeChange: (value: number) => void
  freeCenter: boolean
  onFreeCenterChange: (value: boolean) => void
}

export function CreateActions({
  batchSize,
  onBatchSizeChange,
  freeCenter,
  onFreeCenterChange,
}: CreateActionsProps) {
  const { t } = useTranslation()
  return (
    <ActionBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          component="label"
          htmlFor="batch-size"
          variant="body2"
          sx={{ fontWeight: 650, mb: -1 }}
        >
          {t('allocation.batchSize')}
        </Typography>
        <CountStepper>
          <IconButton
            aria-label={t('allocation.decrease', {
              category: t('allocation.batchSize'),
            })}
            disabled={batchSize <= 1}
            color="primary"
            onClick={() => onBatchSizeChange(batchSize - 1)}
            sx={{ width: 44, height: 44 }}
          >
            <RemoveIcon />
          </IconButton>
          <CountInput
            type="number"
            id="batch-size"
            value={batchSize}
            onChange={(event) => {
              const value = Number(event.target.value)
              if (Number.isInteger(value) && value >= 1 && value <= 4)
                onBatchSizeChange(value)
            }}
            slotProps={{ input: { min: 1, max: 4, step: 1 } }}
          />
          <IconButton
            aria-label={t('allocation.increase', {
              category: t('allocation.batchSize'),
            })}
            disabled={batchSize >= 4}
            color="primary"
            onClick={() => onBatchSizeChange(batchSize + 1)}
            sx={{ width: 44, height: 44 }}
          >
            <AddIcon />
          </IconButton>
        </CountStepper>
      </Box>
      <FormControlLabel
        labelPlacement="top"
        sx={{
          m: 0,
          gap: 1,
          '& .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 650,
          },
        }}
        control={
          <Switch
            checked={freeCenter}
            onChange={(_event, checked) => onFreeCenterChange(checked)}
            sx={{ '& .MuiSwitch-track': { backgroundColor: '#fff8e8' } }}
          />
        }
        label={t('allocation.freeCenter')}
      />
    </ActionBar>
  )
}
