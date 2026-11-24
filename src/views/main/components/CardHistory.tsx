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
  const { t } = useTranslation()
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
          gap: 1.25,
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {cards.map((card) => {
          const winningCells = new Set(
            getCompletedLines(card.cells).flatMap((line) =>
              line.cells.map((cell) => cell.promptId),
            ),
          )
          const progress = getCardProgress(card.cells)
          const complete = progress.marked === progress.total
          const started = progress.marked > 0 && !complete
          return (
            <Paper
              component="li"
              key={card.id}
              variant="outlined"
              sx={{
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 0.75,
                borderColor: '#e6ddce',
                borderRadius: '14px',
                bgcolor: '#fcf8ef',
                boxShadow: '0 2px 5px rgba(65, 48, 24, 0.09)',
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(5, minmax(0, 1fr))',
                  gap: '2px',
                  width: 88,
                  flexShrink: 0,
                  aspectRatio: '1',
                  p: '2px',
                  border: '1px solid #ede2cf',
                  borderRadius: '6px',
                }}
              >
                {card.cells.flat().map((cell, index) => (
                  <Box
                    key={cell.promptId}
                    sx={{
                      position: 'relative',
                      border: '1px solid #d9cba9',
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
                          ? '#ae2530'
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
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    component="h3"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      fontWeight: 800,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.2,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {card.name}
                  </Typography>
                  <IconButton
                    size="small"
                    disabled={loading || deleting}
                    aria-label={t('history.deleteCard', { name: card.name })}
                    title={t('history.delete')}
                    onClick={() => {
                      setDeleteError(false)
                      setSelected(card)
                    }}
                    sx={{ color: 'primary.main', flexShrink: 0, p: 0.25 }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography
                  component="time"
                  dateTime={card.createdAt}
                  sx={{
                    display: 'block',
                    color: 'primary.main',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {new Date(card.createdAt).toLocaleDateString('lt-LT')}{' '}
                  {new Date(card.createdAt).toLocaleTimeString('lt-LT', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Typography>
                <Box sx={{ my: 0.5, pr: { sm: 1 }, color: 'text.primary' }}>
                  {complete ? (
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {t('history.completed')} · {progress.marked}/
                      {progress.total}
                    </Typography>
                  ) : (
                    <CandyCaneProgress {...progress} />
                  )}
                </Box>
                <Button
                  component={Link}
                  to={'/play/' + encodeURIComponent(card.id)}
                  variant={complete ? 'outlined' : 'contained'}
                  color={started ? 'secondary' : 'primary'}
                  fullWidth
                  startIcon={<PlayArrowRoundedIcon />}
                  sx={{
                    minHeight: 28,
                    py: 0,
                    px: 1,
                    borderRadius: '8px',
                    fontWeight: 750,
                    width: '100%',
                    ...(started && {
                      backgroundImage: 'linear-gradient(#b52b36, #9d202a)',
                    }),
                  }}
                >
                  {t(
                    complete
                      ? 'history.view'
                      : started
                        ? 'history.continue'
                        : 'navigation.play',
                  )}
                </Button>
              </Box>
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
