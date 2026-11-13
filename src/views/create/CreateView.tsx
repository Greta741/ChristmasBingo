import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { PageHeader } from '../../components/layout/PageHeader'
import { AllocationControls } from './components/AllocationControls'
import { CreateActions } from './components/CreateActions'

const CreateLayout = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
  flex: 1,
})

const PreviewArea = styled('div')(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 520px)',
  justifyContent: 'center',
  gap: theme.spacing(3),
  maxWidth: 1120,
  marginInline: 'auto',
  boxSizing: 'border-box',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 520px))',
  },
}))

const CreationSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '& header .MuiTypography-root': { color: 'inherit' },
}))

const CreationContent = styled('div')(({ theme }) => ({
  maxWidth: 1440,
  marginInline: 'auto',
  boxSizing: 'border-box',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
}))

const PlaceholderGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  aspectRatio: '1',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderLeft: `1px solid ${theme.palette.divider}`,
  '& > div': {
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.action.hover,
  },
}))

export function CreateView() {
  const { t } = useTranslation()
  const [batchSize, setBatchSize] = useState(1)

  return (
    <>
      <CreateLayout>
        <CreationSection aria-label={t('create.title')}>
          <CreationContent>
            <PageHeader
              title={t('create.title')}
              description={t('create.description')}
            />
            <AllocationControls />
            <CreateActions
              batchSize={batchSize}
              onBatchSizeChange={setBatchSize}
            />
          </CreationContent>
        </CreationSection>
        <PreviewArea>
          {Array.from({ length: batchSize }, (_, cardIndex) => (
            <Paper
              key={cardIndex}
              component="section"
              variant="outlined"
              sx={{ p: 2 }}
              aria-labelledby={`preview-title-${cardIndex}`}
            >
              <Typography
                id={`preview-title-${cardIndex}`}
                component="h2"
                variant="h2"
                sx={{ mb: 2 }}
              >
                {t('allocation.preview')}
                {batchSize > 1 ? ` ${cardIndex + 1}` : ''}
              </Typography>
              <Box aria-hidden="true">
                <PlaceholderGrid>
                  {Array.from({ length: 25 }, (_, index) => (
                    <div key={index} />
                  ))}
                </PlaceholderGrid>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                {t('allocation.previewHint')}
              </Typography>
              <Button
                component={Link}
                to="/play/1"
                variant="contained"
                startIcon={<PlayArrowRoundedIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t('navigation.play')}
              </Button>
            </Paper>
          ))}
        </PreviewArea>
      </CreateLayout>
    </>
  )
}
