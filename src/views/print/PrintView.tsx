import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import GlobalStyles from '@mui/material/GlobalStyles'
import LinearProgress from '@mui/material/LinearProgress'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import PaletteIcon from '@mui/icons-material/PaletteRounded'
import TonalityIcon from '@mui/icons-material/TonalityRounded'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'
import { BingoCardFrame } from '../../components/BingoCardFrame'
import { BingoCardGrid } from '../../components/BingoCardGrid'
import type { BingoCard } from '../../domain/models'
import { bingoCardRepository } from '../../services/bingoCardRepository'

function PrintCard({ card, index }: { card: BingoCard; index: number }) {
  return (
    <Box sx={{ minWidth: 0, minHeight: 0 }}>
      <BingoCardFrame
        titleId={`print-card-${index}`}
        subtitle={card.name}
        printMode
      >
        <BingoCardGrid cells={card.cells} printMode />
      </BingoCardFrame>
    </Box>
  )
}

export function PrintView() {
  const [params] = useSearchParams()
  const ids = (params.get('ids') ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 4)
  return <PrintSheet key={JSON.stringify(ids)} ids={ids} />
}

function PrintSheet({ ids }: { ids: string[] }) {
  const { t } = useTranslation()
  const [cards, setCards] = useState<BingoCard[]>([])
  const [loading, setLoading] = useState(ids.length > 0)
  const [error, setError] = useState(false)
  const [revision, setRevision] = useState(0)
  const [monochrome, setMonochrome] = useState(false)
  const selection = JSON.stringify(ids)
  useEffect(() => {
    let active = true
    const selectedIds = JSON.parse(selection) as string[]
    if (!selectedIds.length) return
    Promise.all(selectedIds.map((id) => bingoCardRepository.getCard(id)))
      .then((results) => {
        if (!active) return
        if (results.some((card) => !card)) throw new Error('Card not found')
        setCards(results as BingoCard[])
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
  }, [selection, revision])

  return (
    <>
      <GlobalStyles
        styles={{
          '@page': { size: 'A4 portrait', margin: '10mm' },
          body: { backgroundColor: '#fff', margin: 0 },
          '@media print': {
            html: { margin: 0, padding: 0 },
            body: {
              margin: 0,
              padding: 0,
              printColorAdjust: 'exact',
              WebkitPrintColorAdjust: 'exact',
            },
            '.print-sheet': { margin: '0 !important' },
            '.print-status': { display: 'none !important' },
            '.MuiTooltip-popper': { display: 'none !important' },
          },
        }}
      />
      {!loading && !error && cards.length > 0 && (
        <Tooltip
          title={t(monochrome ? 'print.enableColors' : 'print.disableColors')}
        >
          <Fab
            className="print-status"
            color="primary"
            aria-label={t('print.monochrome')}
            aria-pressed={monochrome}
            onClick={() => setMonochrome((previous) => !previous)}
            sx={{
              position: 'fixed',
              right: 24,
              bottom: 'max(24px, env(safe-area-inset-bottom))',
              zIndex: (theme) => theme.zIndex.fab,
            }}
          >
            {monochrome ? <PaletteIcon /> : <TonalityIcon />}
          </Fab>
        </Tooltip>
      )}
      {loading ? (
        <LinearProgress
          className="print-status"
          aria-label={t('app.loading')}
        />
      ) : error ? (
        <Alert
          className="print-status"
          severity="error"
          sx={{ m: 3 }}
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
          {t('print.loadError')}
        </Alert>
      ) : cards.length ? (
        <Box
          component="main"
          className="print-sheet"
          sx={{
            width: '184mm',
            height: '250mm',
            boxSizing: 'border-box',
            mx: 'auto',
            my: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
            gap: 0,
            breakInside: 'avoid',
            pageBreakInside: 'avoid',
            ...(monochrome && {
              '&, & *': {
                backgroundColor: 'transparent !important',
                backgroundImage: 'none !important',
                color: '#111 !important',
                borderColor: '#444 !important',
                boxShadow: 'none !important',
              },
              '& svg [fill]:not([fill="none"])': { fill: '#444' },
              '& svg [stroke]:not([stroke="none"])': { stroke: '#444' },
            }),
          }}
        >
          {cards.map((card, index) => (
            <PrintCard key={`${card.id}-${index}`} card={card} index={index} />
          ))}
        </Box>
      ) : (
        <Alert className="print-status" severity="info" sx={{ m: 3 }}>
          {t('print.empty')}{' '}
          <Button component={Link} to="/create">
            {t('print.create')}
          </Button>
        </Alert>
      )}
    </>
  )
}
