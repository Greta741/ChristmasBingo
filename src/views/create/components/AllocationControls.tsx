import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../app/store/hooks'
import { CategoryId } from '../../../domain/models'
import { Category } from './Category'

const AllocationSection = styled('section')(({ theme }) => ({
  minWidth: 0,
  paddingBlock: theme.spacing(2),
}))

const CategoryGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'minmax(0, 1fr)',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
}))

const AllocationHeading = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}))

export function AllocationControls({
  minimumPrompts = 25,
}: {
  minimumPrompts?: number
}) {
  const { t } = useTranslation()
  const categories = useAppSelector((state) => state.categories)
  const total = Object.values(categories).reduce(
    (sum, category) => sum + category.amount,
    0,
  )
  const available = new Set(
    Object.values(categories).flatMap((category) =>
      category.prompts.map((prompt) => prompt.id),
    ),
  ).size
  return (
    <AllocationSection aria-labelledby="allocation-title">
      <Stack spacing={2}>
        <AllocationHeading>
          <Typography id="allocation-title" component="h2" variant="h2">
            {t('allocation.title')}
          </Typography>
          <Chip
            color="primary"
            variant="outlined"
            sx={{ bgcolor: 'background.paper' }}
            label={t('allocation.total', { total })}
            aria-live="polite"
          />
        </AllocationHeading>
        {available < minimumPrompts && (
          <Alert severity="warning">
            {t('allocation.insufficient', {
              missing: minimumPrompts - available,
            })}
          </Alert>
        )}
        <CategoryGrid>
          {Object.values(CategoryId).map((categoryId) => (
            <Category key={categoryId} categoryId={categoryId} />
          ))}
        </CategoryGrid>
      </Stack>
    </AllocationSection>
  )
}
