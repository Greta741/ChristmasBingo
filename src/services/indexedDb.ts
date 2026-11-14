const DATABASE_NAME = 'christmas-bingo-cards'
export const CARD_STORE_NAME = 'cards'
export const CARD_ORDER_INDEX = 'createdAt-id'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1)
    let blocked = false
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore(CARD_STORE_NAME, {
        keyPath: 'id',
      })
      store.createIndex(CARD_ORDER_INDEX, ['createdAt', 'id'], { unique: true })
    }
    request.onerror = () => reject(request.error)
    request.onblocked = () => {
      blocked = true
      reject(new Error('Card database upgrade is blocked by another tab'))
    }
    request.onsuccess = () => {
      const database = request.result
      database.onversionchange = () => database.close()
      if (blocked) database.close()
      else resolve(database)
    }
  })
}

interface StoreOperation<T> {
  store: IDBObjectStore
  setResult: (result: T) => void
  onSuccess: <V>(request: IDBRequest<V>, callback: (value: V) => void) => void
}

/** Resolve writes only after the entire transaction has committed. */
export async function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (context: StoreOperation<T>) => void,
): Promise<T> {
  const database = await openDatabase()
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(storeName, mode)
      let result: T
      let failure: unknown
      const fail = (error: unknown) => {
        failure = error
        transaction.abort()
      }
      transaction.oncomplete = () => resolve(result)
      transaction.onabort = () =>
        reject(
          failure ??
            transaction.error ??
            new Error('Database transaction aborted'),
        )
      transaction.onerror = () => {
        failure ??= transaction.error
      }
      try {
        operation({
          store: transaction.objectStore(storeName),
          setResult: (value) => {
            result = value
          },
          onSuccess: (request, callback) => {
            request.onsuccess = () => {
              try {
                callback(request.result)
              } catch (error) {
                fail(error)
              }
            }
          },
        })
      } catch (error) {
        fail(error)
      }
    })
  } finally {
    database.close()
  }
}
