import { useCallback, useEffect, useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { BingoCardFrame } from '../../components/BingoCardFrame'
import { BingoCardGrid } from '../../components/BingoCardGrid'
import type { BingoCard, BingoGrid, CardCelebration } from '../../domain/models'
import { bingoCardRepository } from '../../services/bingoCardRepository'
import { getCompletedLines } from '../../services/bingoLines'
import { BingoCelebration } from './BingoCelebration'

export function PlayView() {
  const { id = '' } = useParams()
  return <SavedCard key={id} id={id} />
}

function SavedCard({ id }: { id: string }) {
  const { t } = useTranslation()
  const [card, setCard] = useState<BingoCard | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [revision, setRevision] = useState(0)
  const [saveError, setSaveError] = useState(false)
  const [pendingCells, setPendingCells] = useState<Set<string>>(new Set())
  const pendingRef = useRef(new Set<string>())
  const [celebration, setCelebration] = useState<{
    key: number
    kind: CardCelebration
  } | null>(null)
  const celebrationKey = useRef(0)
  const closeCelebration = useCallback(() => setCelebration(null), [])
  const winningCells = new Set(
    card
      ? getCompletedLines(card.cells).flatMap((line) =>
          line.cells.map((cell) => cell.promptId),
        )
      : [],
  )

  function setCellFound(promptId: string, found: boolean) {
    setCard((previous) =>
      previous
        ? {
            ...previous,
            cells: previous.cells.map((row) =>
              row.map((cell) =>
                cell.promptId === promptId ? { ...cell, found } : cell,
              ),
            ) as BingoGrid,
          }
        : previous,
    )
  }

  async function toggleCell(promptId: string) {
    const cell = card?.cells.flat().find((entry) => entry.promptId === promptId)
    if (!cell || pendingRef.current.has(promptId)) return
    const previousFound = cell.found
    pendingRef.current.add(promptId)
    setPendingCells(new Set(pendingRef.current))
    setSaveError(false)
    setCellFound(promptId, !previousFound)
    try {
      const kind = await bingoCardRepository.updateCardCell(
        id,
        promptId,
        !previousFound,
      )
      if (kind) setCelebration({ key: ++celebrationKey.current, kind })
    } catch {
      setCellFound(promptId, previousFound)
      setSaveError(true)
    } finally {
      pendingRef.current.delete(promptId)
      setPendingCells(new Set(pendingRef.current))
    }
  }

  useEffect(() => {
    let active = true
    bingoCardRepository
      .getCard(id)
      .then((savedCard) => {
        if (!active) return
        setCard(savedCard)
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setError(true)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id, revision])

  return (
    <Box
      sx={{ maxWidth: { xs: 'none', sm: 520 }, mx: 'auto', width: '100%' }}
      aria-busy={loading}
    >
      {celebration && (
        <BingoCelebration
          key={celebration.key}
          kind={celebration.kind}
          onClose={closeCelebration}
        />
      )}
      {loading ? (
        <LinearProgress aria-label={t('app.loading')} />
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              onClick={() => {
                setError(false)
                setLoading(true)
                setRevision((value) => value + 1)
              }}
            >
              {t('history.retry')}
            </Button>
          }
        >
          {t('play.loadError')}
        </Alert>
      ) : card ? (
        <BingoCardFrame
          titleId="play-card-title"
          subtitle={card.name}
          headingComponent="h1"
          squareOnMobile
        >
          {saveError && (
            <Alert severity="error" sx={{ mb: 1.5 }}>
              {t('play.saveError')}
            </Alert>
          )}
          <Typography
            aria-live="polite"
            sx={{ mb: 1.5, fontSize: '0.85rem', color: 'text.secondary' }}
          >
            {t('history.progress', {
              marked: card.cells.flat().filter((cell) => cell.found).length,
            })}
          </Typography>
          <BingoCardGrid
            cells={card.cells}
            onCellClick={toggleCell}
            pendingCells={pendingCells}
            winningCells={winningCells}
          />
        </BingoCardFrame>
      ) : (
        <Alert severity="info">{t('play.notFound')}</Alert>
      )}
      {!loading && !card && (
        <Button component={Link} to="/?section=history" sx={{ mt: 2 }}>
          {t('navigation.history')}
        </Button>
      )}
    </Box>
  )
}
