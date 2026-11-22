import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist'
import { LOCAL_STORAGE_SCHEMA_VERSION } from '../../domain/schemas'
import type { AppState } from '../../domain/models'
import { appStateReducer } from './appStateSlice'
import { persistenceStorage } from './persistence/persistenceStorage'

const persistConfig: PersistConfig<AppState> = {
  key: 'christmas-bingo',
  version: LOCAL_STORAGE_SCHEMA_VERSION,
  storage: persistenceStorage,
  whitelist: ['categories', 'language', 'freeCenter'],
}

const persistedReducer = persistReducer(persistConfig, appStateReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
