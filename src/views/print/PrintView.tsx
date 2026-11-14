import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import GlobalStyles from '@mui/material/GlobalStyles'
import LinearProgress from '@mui/material/LinearProgress'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'
import { BingoCardFrame } from '../../components/BingoCardFrame'
import { BingoCardGrid } from '../../components/BingoCardGrid'
import type { BingoCard } from '../../domain/models'
import { bingoCardRepository } from '../../services/bingoCardRepository'

function PrintCard({ card, index }: { card: BingoCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    // Fixed millimetre dimensions are identical on screen and on paper.
    for (const cell of ref.current?.querySelectorAll<HTMLElement>(
      '[role="cell"]',
    ) ?? []) {
      const text = cell.firstElementChild as HTMLElement | null
      if (!text) continue
      const style = getComputedStyle(cell)
      const availableHeight =
        cell.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)
      let size = 28 / 3 // 7 pt in CSS pixels
      cell.style.fontSize = `${size}px`
      while (
        size > 4 &&
        (text.getBoundingClientRect().height > availableHeight ||
          text.scrollWidth > cell.clientWidth)
      ) {
        size -= 0.25
        cell.style.fontSize = `${size}px`
      }
    }
  }, [card])
  return (
    <Box ref={ref} sx={{ minWidth: 0, minHeight: 0 }}>
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
          },
        }}
      />
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
            width: '190mm',
            height: '277mm',
            boxSizing: 'border-box',
            mx: 'auto',
            my: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
            gap: '6mm',
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
