import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/store/hooks'
import type { BingoCard } from '../domain/models'
import { bingoGenerator } from '../services/bingoGenerator'
import { bingoCardRepository } from '../services/bingoCardRepository'

export function useQuickPlay() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const categories = useAppSelector((state) => state.categories)
  const [starting, setStarting] = useState(false)
  const [startError, setStartError] = useState(false)
  const busy = useRef(false)
  const pendingCard = useRef<BingoCard | null>(null)
  const active = useRef(true)

  useEffect(() => {
    active.current = true
    return () => {
      active.current = false
    }
  }, [])

  async function startPlaying(): Promise<boolean> {
    if (busy.current) return false
    busy.current = true
    setStarting(true)
    setStartError(false)
    try {
      const card =
        pendingCard.current ??
        bingoGenerator.generateCard(
          categories,
          i18n.resolvedLanguage === 'lt' ? 'lt' : 'en',
        )
      pendingCard.current = card
      await bingoCardRepository.saveCard(card)
      pendingCard.current = null
      if (!active.current) return false
      navigate(`/play/${encodeURIComponent(card.id)}`)
      return true
    } catch {
      if (active.current) setStartError(true)
      return false
    } finally {
      busy.current = false
      if (active.current) setStarting(false)
    }
  }

  return {
    startPlaying,
    starting,
    startError,
    clearError: () => setStartError(false),
  }
}
