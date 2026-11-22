import { useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import PrintIcon from '@mui/icons-material/PrintRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { PageHeader } from '../../components/layout/PageHeader'
import { AllocationControls } from './components/AllocationControls'
import { CreateActions } from './components/CreateActions'
import { CreationDecorations } from './components/CreationDecorations'
import { useAppSelector } from '../../app/store/hooks'
import { bingoGenerator } from '../../services/bingoGenerator'
import { bingoCardRepository } from '../../services/bingoCardRepository'
import type { BingoCard } from '../../domain/models'
import { BingoCardGrid } from '../../components/BingoCardGrid'
import { BingoCardFrame } from '../../components/BingoCardFrame'

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
  [theme.breakpoints.down('sm')]: {
    padding: 0,
    paddingBlock: theme.spacing(2),
    gap: theme.spacing(2),
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 520px))',
  },
}))

const CreationSection = styled('section')(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  backgroundColor: theme.palette.secondary.main,
  backgroundImage:
    'radial-gradient(ellipse at top right, rgba(239,207,140,0.13), transparent 60%), linear-gradient(135deg, rgba(0,0,0,0.08), transparent 55%)',
  color: theme.palette.secondary.contrastText,
  '& header .MuiTypography-root': { color: 'inherit' },
  [theme.breakpoints.down('sm')]: {
    backgroundImage: `linear-gradient(to top, ${theme.palette.secondary.main} 120px, transparent 280px), radial-gradient(ellipse at top right, rgba(239,207,140,0.13), transparent 60%), linear-gradient(135deg, rgba(0,0,0,0.08), transparent 55%)`,
  },
}))

const CreationContent = styled('div')(({ theme }) => ({
  position: 'relative',
  maxWidth: 1440,
  marginInline: 'auto',
  boxSizing: 'border-box',
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
}))

const GenerateBar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(0, 3, 3),
  [theme.breakpoints.down('sm')]: {
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
    padding: theme.spacing(1.5, 2),
    paddingBottom: `max(${theme.spacing(1.5)}, env(safe-area-inset-bottom))`,
    backgroundColor: theme.palette.secondary.main,
    '& > button': { width: '100%', minWidth: 0 },
  },
}))

export function CreateView() {
  const { t, i18n } = useTranslation()
  const categories = useAppSelector((state) => state.categories)
  const [cards, setCards] = useState<BingoCard[]>([])
  const [batchSize, setBatchSize] = useState(1)
  const [saving, setSaving] = useState(false)
  const [unsavedCards, setUnsavedCards] = useState<BingoCard[]>([])
  const [generationError, setGenerationError] = useState(false)
  const savingRef = useRef(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const available = new Set(
    Object.values(categories).flatMap((category) =>
      category.prompts.map((prompt) => prompt.id),
    ),
  ).size

  async function saveCards(batch: BingoCard[]) {
    savingRef.current = true
    setSaving(true)
    try {
      const results = await Promise.allSettled(
        batch.map((card) => bingoCardRepository.saveCard(card)),
      )
      setUnsavedCards(
        batch.filter((_, index) => results[index].status === 'rejected'),
      )
    } finally {
      savingRef.current = false
      setSaving(false)
    }
  }

  async function generate() {
    if (savingRef.current) return
    setGenerationError(false)
    const language = i18n.resolvedLanguage === 'lt' ? 'lt' : 'en'
    let batch: BingoCard[]
    try {
      batch = Array.from({ length: batchSize }, () =>
        bingoGenerator.generateCard(categories, language),
      )
    } catch {
      setGenerationError(true)
      return
    }
    setCards(batch)
    requestAnimationFrame(() =>
      previewRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      }),
    )
    await saveCards(batch)
  }

  return (
    <>
      <CreateLayout>
        <CreationSection aria-label={t('create.title')}>
          <CreationDecorations />
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
          <GenerateBar>
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: 220 }}
              disabled={available < 25 || saving || unsavedCards.length > 0}
              loading={saving}
              onClick={generate}
            >
              {t('allocation.generate')}
            </Button>
          </GenerateBar>
        </CreationSection>
        <Box
          sx={{
            position: 'relative',
            height: 0,
            maxWidth: 1440,
            mx: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: { xs: 12, sm: 24 },
              zIndex: 2,
            }}
          >
            <Tooltip title={t('print.action')}>
              <span>
                <Fab
                  component={Link}
                  to={`/print?ids=${encodeURIComponent(
                    cards
                      .slice(0, 4)
                      .map((card) => card.id)
                      .join(','),
                  )}`}
                  target="_blank"
                  rel="noopener"
                  disabled={
                    cards.length === 0 || saving || unsavedCards.length > 0
                  }
                  color="primary"
                  aria-label={t('print.action')}
                >
                  <PrintIcon fontSize="large" />
                </Fab>
              </span>
            </Tooltip>
          </Box>
        </Box>
        {generationError && (
          <Alert severity="error" sx={{ m: 2 }}>
            {t('allocation.generationError')}
          </Alert>
        )}
        {unsavedCards.length > 0 && (
          <Alert
            severity="error"
            sx={{ m: 2 }}
            action={
              <Button
                color="inherit"
                disabled={saving}
                onClick={() => {
                  if (!savingRef.current) void saveCards(unsavedCards)
                }}
              >
                {t('allocation.retrySave')}
              </Button>
            }
          >
            {t('allocation.saveError', { count: unsavedCards.length })}
          </Alert>
        )}
        <PreviewArea ref={previewRef}>
          {cards.length === 0 && (
            <Typography
              color="text.secondary"
              sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 3 }}
            >
              {t('allocation.previewHint')}
            </Typography>
          )}
          {cards.map((card, cardIndex) => (
            <BingoCardFrame
              key={card.id}
              titleId={`preview-title-${cardIndex}`}
              squareOnMobile
              subtitle={`${new Date(card.createdAt).toLocaleDateString(i18n.resolvedLanguage === 'lt' ? 'lt-LT' : 'en-GB')}${cards.length > 1 ? ` - ${cardIndex + 1}` : ''}`}
            >
              <BingoCardGrid cells={card.cells} />
              <Button
                component={Link}
                to={`/play/${encodeURIComponent(card.id)}`}
                disabled={
                  saving || unsavedCards.some((entry) => entry.id === card.id)
                }
                variant="contained"
                startIcon={<PlayArrowRoundedIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                {t('navigation.play')}
              </Button>
            </BingoCardFrame>
          ))}
        </PreviewArea>
      </CreateLayout>
    </>
  )
}
