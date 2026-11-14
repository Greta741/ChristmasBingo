import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import RemoveIcon from '@mui/icons-material/Remove'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { setCategoryAmount } from '../../../app/store/appStateSlice'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { CategoryId, PromptSource } from '../../../domain/models'

const Section = styled('section')(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '& .MuiIconButton-root': { color: 'inherit', width: 44, height: 44 },
  '& .MuiIconButton-root.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
  '& .MuiChip-root': {
    height: 'auto',
    minHeight: 20,
    fontSize: '0.65rem',
    lineHeight: 1.3,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiChip-label': { whiteSpace: 'normal', padding: '3px 7px' },
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
}))

const PromptBadges = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: theme.spacing(0.5),
  height: 100,
  overflowY: 'auto',
  marginBottom: theme.spacing(2),
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    overflowY: 'visible',
  },
}))

export function Category({ categoryId }: { categoryId: CategoryId }) {
  const [expanded, setExpanded] = useState(false)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories)
  const category = categories[categoryId]
  const total = Object.values(categories).reduce(
    (sum, entry) => sum + entry.amount,
    0,
  )
  const capacity = new Set(category.prompts.map((prompt) => prompt.id)).size
  const maximum = Math.min(capacity, 25 - total + category.amount)
  const label = t(`allocation.${categoryId}`)
  const language = i18n.resolvedLanguage === 'lt' ? 'lt' : 'en'
  const change = (amount: number) =>
    dispatch(setCategoryAmount({ categoryId, amount }))

  return (
    <Section aria-labelledby={`${categoryId}-title`}>
      <Typography id={`${categoryId}-title`} component="h3" variant="h2">
        <Stack
          component={isMobile ? ButtonBase : 'div'}
          direction="row"
          onClick={isMobile ? () => setExpanded((value) => !value) : undefined}
          aria-expanded={isMobile ? expanded : undefined}
          aria-controls={isMobile ? `${categoryId}-prompts` : undefined}
          sx={{
            width: '100%',
            minHeight: { xs: 44, sm: 0 },
            gap: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            font: 'inherit',
            borderRadius: 1,
            '&.Mui-focusVisible': {
              outline: '2px solid currentColor',
              outlineOffset: 2,
            },
          }}
        >
          <Box component="span" sx={{ flex: 1 }}>
            {label}
          </Box>
          <Typography component="span" aria-live="polite">
            {category.amount} / {capacity}
          </Typography>
          {isMobile && (
            <ExpandMoreIcon
              sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
            />
          )}
        </Stack>
      </Typography>
      <Box
        id={`${categoryId}-prompts`}
        sx={{ display: { xs: expanded ? 'block' : 'none', sm: 'block' } }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <IconButton
            disabled={category.amount === 0}
            aria-label={t('allocation.decrease', { category: label })}
            onClick={() => change(category.amount - 1)}
          >
            <RemoveIcon />
          </IconButton>
          <Slider
            min={0}
            max={Math.max(capacity, 1)}
            step={1}
            value={category.amount}
            disabled={capacity === 0}
            onChange={(_event, value) =>
              change(Math.min(value as number, maximum))
            }
            valueLabelDisplay="auto"
            aria-label={label}
            color="primary"
          />
          <IconButton
            disabled={category.amount >= maximum}
            aria-label={t('allocation.increase', { category: label })}
            onClick={() => change(category.amount + 1)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        <PromptBadges
          tabIndex={0}
          role="region"
          aria-labelledby={`${categoryId}-title`}
        >
          {category.prompts.map((prompt) => (
            <Chip
              key={prompt.id}
              size="small"
              label={
                prompt.source === PromptSource.BuiltIn
                  ? prompt.text[language]
                  : prompt.text
              }
            />
          ))}
        </PromptBadges>
        <TextField
          fullWidth
          size="small"
          disabled
          placeholder={t('allocation.addPrompt')}
          slotProps={{ htmlInput: { 'aria-label': t('allocation.addPrompt') } }}
        />
      </Box>
    </Section>
  )
}
