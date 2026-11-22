import type { WebStorage } from 'redux-persist'
import {
  LOCAL_STORAGE_SCHEMA_VERSION,
  persistedLocalStateSchema,
} from '../../../domain/schemas'

export type PersistenceOperation = 'read' | 'write'

export interface PersistenceFailure {
  operation: PersistenceOperation
  message: string
}

type PersistenceFailureListener = (failure: PersistenceFailure | null) => void

let writesBlocked = false
let lastFailure: PersistenceFailure | null = null
const failureListeners = new Set<PersistenceFailureListener>()

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

function publishFailure(failure: PersistenceFailure | null) {
  lastFailure = failure
  queueMicrotask(() => {
    failureListeners.forEach((listener) => listener(failure))
  })
}

function getLocalStorage(): Storage {
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('localStorage is not available')
  }

  return window.localStorage
}

function parseStoredProperty(
  state: Record<string, unknown>,
  property: string,
): unknown {
  const value = state[property]

  if (typeof value !== 'string') {
    throw new Error(`Persisted property "${property}" is missing or invalid`)
  }

  return JSON.parse(value) as unknown
}

function validateSerializedState(serializedState: string) {
  const parsedState = JSON.parse(serializedState) as unknown

  if (
    typeof parsedState !== 'object' ||
    parsedState === null ||
    Array.isArray(parsedState)
  ) {
    throw new Error('Persisted application state is invalid')
  }

  const storedState = parsedState as Record<string, unknown>
  const persistMetadata = parseStoredProperty(storedState, '_persist')

  if (
    typeof persistMetadata !== 'object' ||
    persistMetadata === null ||
    !('version' in persistMetadata) ||
    typeof persistMetadata.version !== 'number'
  ) {
    throw new Error('Persisted schema version is missing or invalid')
  }

  if (persistMetadata.version !== LOCAL_STORAGE_SCHEMA_VERSION) {
    throw new Error('Persisted data uses an unsupported schema version')
  }

  const validationResult = persistedLocalStateSchema.safeParse({
    schemaVersion: persistMetadata.version,
    categories: parseStoredProperty(storedState, 'categories'),
    language: parseStoredProperty(storedState, 'language'),
    freeCenter:
      'freeCenter' in storedState
        ? parseStoredProperty(storedState, 'freeCenter')
        : true,
  })

  if (!validationResult.success) {
    throw new Error('Persisted application data failed validation')
  }
}

export function blockPersistenceWrites(
  operation: PersistenceOperation,
  error: unknown,
): Error {
  const persistenceError = toError(error)
  writesBlocked = true
  publishFailure({ operation, message: persistenceError.message })
  return persistenceError
}

export function subscribeToPersistenceFailures(
  listener: PersistenceFailureListener,
): () => void {
  failureListeners.add(listener)

  return () => failureListeners.delete(listener)
}

export function getPersistenceFailureSnapshot(): PersistenceFailure | null {
  return lastFailure
}

export const persistenceStorage: WebStorage = {
  async getItem(key) {
    try {
      const value = getLocalStorage().getItem(key)

      if (value !== null) {
        validateSerializedState(value)
      }

      return value
    } catch (error) {
      throw blockPersistenceWrites('read', error)
    }
  },

  async setItem(key, value) {
    if (writesBlocked) {
      throw new Error('Persistence writes are blocked after a storage error')
    }

    try {
      validateSerializedState(value)
      getLocalStorage().setItem(key, value)
    } catch (error) {
      throw blockPersistenceWrites('write', error)
    }
  },

  async removeItem(key) {
    try {
      getLocalStorage().removeItem(key)
      writesBlocked = false
      publishFailure(null)
    } catch (error) {
      throw blockPersistenceWrites('write', error)
    }
  },
}
