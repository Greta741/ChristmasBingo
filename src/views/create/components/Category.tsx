import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import RemoveIcon from '@mui/icons-material/Remove'
import RestoreIcon from '@mui/icons-material/RestoreRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import {
  addCustomPrompt,
  deletePrompt,
  restoreCategoryDefaults,
  setCategoryAmount,
} from '../../../app/store/appStateSlice'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import {
  CategoryId,
  PromptSource,
  CUSTOM_PROMPT_MAX_LENGTH,
} from '../../../domain/models'

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
  '& .MuiChip-root .MuiChip-deleteIcon': {
    color: '#e5c780',
    '&:hover': { color: '#ffe3a1' },
  },
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
  const [customText, setCustomText] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
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
  const canAdd =
    customText.trim().length > 0 &&
    customText.trim().length <= CUSTOM_PROMPT_MAX_LENGTH

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
              onDelete={() =>
                dispatch(deletePrompt({ categoryId, promptId: prompt.id }))
              }
              deleteIcon={<CloseIcon />}
              aria-label={t('allocation.deletePrompt', {
                prompt:
                  prompt.source === PromptSource.BuiltIn
                    ? prompt.text[language]
                    : prompt.text,
              })}
              label={
                prompt.source === PromptSource.BuiltIn
                  ? prompt.text[language]
                  : prompt.text
              }
            />
          ))}
        </PromptBadges>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault()
            if (!canAdd) return
            dispatch(addCustomPrompt(categoryId, customText))
            setCustomText('')
          }}
          sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}
        >
          <TextField
            fullWidth
            size="small"
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
            placeholder={t('allocation.addPrompt')}
            error={customText.trim().length > CUSTOM_PROMPT_MAX_LENGTH}
            helperText={
              customText.length
                ? `${customText.length} / ${CUSTOM_PROMPT_MAX_LENGTH}`
                : undefined
            }
            slotProps={{
              htmlInput: {
                'aria-label': t('allocation.addPrompt'),
                maxLength: CUSTOM_PROMPT_MAX_LENGTH,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      disabled={!canAdd}
                      aria-label={t('allocation.addPrompt')}
                      edge="end"
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Tooltip title={t('allocation.resetCategory', { category: label })}>
            <IconButton
              type="button"
              onClick={() => setConfirmReset(true)}
              aria-label={t('allocation.resetCategory', { category: label })}
            >
              <RestoreIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Dialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        aria-labelledby={`${categoryId}-reset-title`}
        aria-describedby={`${categoryId}-reset-description`}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id={`${categoryId}-reset-title`}>
          {t('allocation.resetCategory', { category: label })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={`${categoryId}-reset-description`}>
            {t('allocation.resetConfirmation', { category: label })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setConfirmReset(false)}>
            {t('history.cancel')}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              dispatch(restoreCategoryDefaults(categoryId))
              setCustomText('')
              setConfirmReset(false)
            }}
          >
            {t('allocation.reset')}
          </Button>
        </DialogActions>
      </Dialog>
    </Section>
  )
}
