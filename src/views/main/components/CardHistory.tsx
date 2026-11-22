import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import type { BingoCard } from '../../../domain/models'
import { bingoCardRepository } from '../../../services/bingoCardRepository'
import { getCompletedLines } from '../../../services/bingoLines'
import { CandyCaneProgress } from '../../../components/CandyCaneProgress'
import { isCellMarked } from '../../../domain/isCellMarked'
import { getCardProgress } from '../../../domain/getCardProgress'
import { FreeCenterIcon } from '../../../components/FreeCenterIcon'

const PAGE_SIZE = 12

export function CardHistory() {
  const { t, i18n } = useTranslation()
  const [cards, setCards] = useState<BingoCard[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [revision, setRevision] = useState(0)
  const [selected, setSelected] = useState<BingoCard | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const busy = useRef(false)

  useEffect(() => {
    let active = true
    Promise.all([
      bingoCardRepository.getCardsPage((page - 1) * PAGE_SIZE, PAGE_SIZE),
      bingoCardRepository.countCards(),
    ])
      .then(([pageCards, count]) => {
        if (!active) return
        const lastPage = Math.max(1, Math.ceil(count / PAGE_SIZE))
        setTotal(count)
        if (page > lastPage) {
          setPage(lastPage)
          return
        }
        setCards(pageCards)
        setLoadError(false)
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setLoadError(true)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [page, revision])

  function reload() {
    if (busy.current || loading) return
    setLoading(true)
    setLoadError(false)
    setRevision((value) => value + 1)
  }

  async function deleteSelected() {
    if (!selected || busy.current) return
    busy.current = true
    setDeleting(true)
    setDeleteError(false)
    try {
      await bingoCardRepository.deleteCard(selected.id)
      setCards((previous) => previous.filter((card) => card.id !== selected.id))
      setSelected(null)
      setLoading(true)
      setRevision((value) => value + 1)
    } catch {
      setDeleteError(true)
    } finally {
      setDeleting(false)
      busy.current = false
    }
  }

  function closeDialog() {
    if (busy.current) return
    setSelected(null)
    setDeleteError(false)
  }

  return (
    <Box aria-busy={loading}>
      {loading && (
        <LinearProgress aria-label={t('app.loading')} sx={{ my: 2 }} />
      )}
      {loadError && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              onClick={reload}
              disabled={loading || deleting}
            >
              {t('history.retry')}
            </Button>
          }
          sx={{ my: 2 }}
        >
          {t('history.loadError')}
        </Alert>
      )}
      {!loading && !loadError && cards.length === 0 && (
        <Typography color="text.secondary">{t('history.empty')}</Typography>
      )}
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gap: { xs: 1, sm: 2 },
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
            lg: 'repeat(6, minmax(0, 1fr))',
          },
        }}
      >
        {cards.map((card) => {
          const winningCells = new Set(
            getCompletedLines(card.cells).flatMap((line) =>
              line.cells.map((cell) => cell.promptId),
            ),
          )
          return (
            <Paper
              component="li"
              key={card.id}
              variant="outlined"
              sx={{
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                p: 1.25,
                borderColor: '#c6ab70',
                overflow: 'hidden',
                bgcolor: '#fffaf0',
                boxShadow: '0 4px 16px rgba(19, 75, 56, 0.08)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  mx: -1.25,
                  mt: -1.25,
                  mb: 1.25,
                  px: 1.25,
                  pt: 1.5,
                  pb: 1.5,
                  color: '#fff8e8',
                  bgcolor: '#134b38',
                  backgroundImage:
                    'radial-gradient(ellipse at top left, #32664b, transparent 90%)',
                  borderBottom: '2px solid #d8bc7b',
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    textAlign: 'center',
                    color: '#e5c780',
                    lineHeight: 1,
                    opacity: 0.12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    pointerEvents: 'none',
                  }}
                >
                  <Box component="span" sx={{ fontSize: '2rem' }}>
                    ✦
                  </Box>
                  <Box component="span" sx={{ fontSize: '4rem' }}>
                    ✦
                  </Box>
                  <Box component="span" sx={{ fontSize: '3rem' }}>
                    ✦
                  </Box>
                </Box>
                <Box sx={{ position: 'relative', minWidth: 0, pr: 4 }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                      minHeight: { xs: '2.8em', sm: 0 },
                      fontFamily: 'Georgia, serif',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    component="time"
                    dateTime={card.createdAt}
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      fontSize: '0.65rem',
                      color: '#e5c780',
                    }}
                  >
                    {new Date(card.createdAt).toLocaleString(
                      i18n.resolvedLanguage === 'lt' ? 'lt-LT' : 'en-GB',
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      },
                    )}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  disabled={loading || deleting}
                  aria-label={t('history.deleteCard', { name: card.name })}
                  onClick={() => {
                    setDeleteError(false)
                    setSelected(card)
                  }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    color: '#fff8e8',
                    '&.Mui-disabled': { color: '#fff8e8', opacity: 0.4 },
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ mb: 1.25, color: 'text.secondary' }}>
                <CandyCaneProgress {...getCardProgress(card.cells)} />
              </Box>
              <Box
                aria-hidden="true"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(5, minmax(0, 1fr))',
                  gap: '3px',
                  aspectRatio: '1',
                }}
              >
                {card.cells.flat().map((cell, index) => (
                  <Box
                    key={cell.promptId}
                    sx={{
                      border: '1px solid #d9cba9',
                      position: 'relative',
                      minWidth: 0,
                      minHeight: 0,
                      overflow: 'hidden',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCellMarked(cell) ? '#fff8e8' : '#17372e',
                      bgcolor: isCellMarked(cell)
                        ? cell.isFree || winningCells.has(cell.promptId)
                          ? '#a33b40'
                          : '#134b38'
                        : (Math.floor(index / 5) + (index % 5)) % 2 === 0
                          ? '#fffdf7'
                          : '#f0e6ce',
                    }}
                  >
                    {cell.isFree && (
                      <FreeCenterIcon
                        compact
                        shape={cell.freeCenterShape}
                        label={cell.text}
                      />
                    )}
                  </Box>
                ))}
              </Box>
              <Box sx={{ flex: 1 }} />
              <Button
                component={Link}
                to={`/play/${encodeURIComponent(card.id)}`}
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<PlayArrowRoundedIcon />}
                sx={{ mt: 1.5 }}
              >
                {t('navigation.play')}
              </Button>
            </Paper>
          )
        })}
      </Box>
      {total > PAGE_SIZE && (
        <Pagination
          count={Math.ceil(total / PAGE_SIZE)}
          page={page}
          disabled={loading || deleting}
          onChange={(_event, nextPage) => {
            if (busy.current || loading) return
            setLoading(true)
            setLoadError(false)
            setPage(nextPage)
          }}
          aria-label={t('history.pagination')}
          getItemAriaLabel={(type, itemPage) =>
            type === 'page'
              ? t('history.goToPage', { page: itemPage })
              : t(`history.${type}`)
          }
          color="primary"
          siblingCount={0}
          sx={{ mt: 3, '& ul': { justifyContent: 'center' } }}
        />
      )}
      <Dialog
        open={selected !== null}
        onClose={closeDialog}
        aria-labelledby="delete-card-title"
        aria-describedby="delete-card-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="delete-card-title">
          {t('history.deleteTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-card-description">
            {t('history.deleteConfirmation', { name: selected?.name ?? '' })}
          </DialogContentText>
          {deleteError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {t('history.deleteError')}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={deleting} autoFocus>
            {t('history.cancel')}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={deleteSelected}
            loading={deleting}
          >
            {t('history.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
