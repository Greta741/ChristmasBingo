import { CARD_STORE_NAME, CARD_ORDER_INDEX, withStore } from './indexedDb'
import type { BingoCard, CardCelebration } from '../domain/models'
import { getCompletedLines } from './bingoLines'
import { isCellMarked } from '../domain/isCellMarked'
import {
  bingoCardSchema,
  INDEXED_DB_SCHEMA_VERSION,
  persistedBingoCardSchema,
} from '../domain/schemas'

/** Contract for IndexedDB card storage. */
export interface BingoCardRepository {
  /** Save a new card. Reject if its ID already exists. */
  saveCard(card: BingoCard): Promise<void>

  /** Replace an existing card. Reject if its ID does not exist. */
  updateCard(card: BingoCard): Promise<void>

  /**
   * Set a cell's found state by its prompt ID, preserving other card data.
   * Reject if the card or cell does not exist.
   * Derive a celebration from the before/after cells and return it after commit.
   */
  updateCardCell(
    cardId: string,
    promptId: string,
    found: boolean,
  ): Promise<CardCelebration | null>

  /** Return the card with this ID, or undefined when it does not exist. */
  getCard(id: string): Promise<BingoCard | undefined>

  /**
   * Return cards newest first (createdAt descending, then ID descending).
   * Offset and limit must be non-negative safe integers; limit 0 returns [].
   * An offset beyond the available cards returns [].
   */
  getCardsPage(offset: number, limit: number): Promise<BingoCard[]>

  countCards(): Promise<number>

  /** Delete a card by ID. A missing card is a successful no-op. */
  deleteCard(id: string): Promise<void>
}

function encode(card: BingoCard) {
  const parsed = bingoCardSchema.parse(card)
  return {
    ...parsed,
    createdAt: new Date(parsed.createdAt).toISOString(),
    schemaVersion: INDEXED_DB_SCHEMA_VERSION,
  }
}

function decode(value: unknown): BingoCard {
  return bingoCardSchema.parse(persistedBingoCardSchema.parse(value))
}

/** Lazy IndexedDB implementation. Importing this object does not open a database. */
export const bingoCardRepository: BingoCardRepository = {
  async countCards() {
    return withStore<number>(
      CARD_STORE_NAME,
      'readonly',
      ({ store, onSuccess, setResult }) => {
        onSuccess(store.count(), setResult)
      },
    )
  },
  async saveCard(card) {
    const record = encode(card)
    await withStore<void>(CARD_STORE_NAME, 'readwrite', ({ store }) => {
      store.add(record)
    })
  },

  async updateCard(card) {
    const record = encode(card)
    await withStore<void>(
      CARD_STORE_NAME,
      'readwrite',
      ({ store, onSuccess }) => {
        onSuccess(store.get(card.id), (existing: unknown) => {
          if (existing === undefined)
            throw new Error(`Card not found: ${card.id}`)
          decode(existing)
          store.put(record)
        })
      },
    )
  },

  async updateCardCell(cardId, promptId, found) {
    if (typeof found !== 'boolean') throw new Error('Found must be a boolean')
    return withStore<CardCelebration | null>(
      CARD_STORE_NAME,
      'readwrite',
      ({ store, onSuccess, setResult }) => {
        onSuccess(store.get(cardId), (value: unknown) => {
          if (value === undefined) throw new Error(`Card not found: ${cardId}`)
          const card = decode(value)
          const cell = card.cells
            .flat()
            .find((entry) => entry.promptId === promptId)
          if (!cell) throw new Error(`Card cell not found: ${promptId}`)
          if (cell.isFree) {
            setResult(null)
            return
          }
          const completedLinesBefore = new Set(
            getCompletedLines(card.cells).map((line) => line.id),
          )
          const wasFullCard = card.cells.flat().every(isCellMarked)
          cell.found = found
          const bingo =
            found &&
            getCompletedLines(card.cells).some(
              (line) => !completedLinesBefore.has(line.id),
            )
          const fullCard =
            found && !wasFullCard && card.cells.flat().every(isCellMarked)
          setResult(fullCard ? 'fullCard' : bingo ? 'bingo' : null)
          store.put(encode(card))
        })
      },
    )
  },

  async getCard(id) {
    return withStore<BingoCard | undefined>(
      CARD_STORE_NAME,
      'readonly',
      ({ store, onSuccess, setResult }) => {
        onSuccess(store.get(id), (value: unknown) => {
          setResult(value === undefined ? undefined : decode(value))
        })
      },
    )
  },

  async getCardsPage(offset, limit) {
    if (
      !Number.isSafeInteger(offset) ||
      offset < 0 ||
      !Number.isSafeInteger(limit) ||
      limit < 0
    )
      throw new Error('Offset and limit must be non-negative safe integers')
    if (limit === 0) return []
    return withStore<BingoCard[]>(
      CARD_STORE_NAME,
      'readonly',
      ({ store, onSuccess, setResult }) => {
        const cards: BingoCard[] = []
        setResult(cards)
        let skipped = 0
        const request = store.index(CARD_ORDER_INDEX).openCursor(null, 'prev')
        onSuccess(request, (cursor) => {
          if (!cursor) return
          if (skipped < offset) {
            // Continue individually: cursor.advance only accepts unsigned 32-bit counts.
            skipped++
            cursor.continue()
            return
          }
          cards.push(decode(cursor.value))
          if (cards.length < limit) cursor.continue()
        })
      },
    )
  },

  async deleteCard(id) {
    await withStore<void>(CARD_STORE_NAME, 'readwrite', ({ store }) => {
      store.delete(id)
    })
  },
}
