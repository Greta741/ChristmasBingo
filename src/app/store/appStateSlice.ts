import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CATEGORY_ALLOCATION, DEFAULT_PROMPTS } from '../../defaults'
import {
  CategoryId,
  type AppState,
  type Language,
  type Prompt,
} from '../../domain/models'

function getDefaultPrompts(categoryId: CategoryId): Prompt[] {
  return DEFAULT_PROMPTS.filter(
    (prompt) => prompt.categoryId === categoryId,
  ).map((prompt) => ({
    ...prompt,
    text: { ...prompt.text },
  }))
}

const initialState: AppState = {
  categories: {
    [CategoryId.Easy]: {
      prompts: getDefaultPrompts(CategoryId.Easy),
      amount: DEFAULT_CATEGORY_ALLOCATION[CategoryId.Easy],
    },
    [CategoryId.Medium]: {
      prompts: getDefaultPrompts(CategoryId.Medium),
      amount: DEFAULT_CATEGORY_ALLOCATION[CategoryId.Medium],
    },
    [CategoryId.Hard]: {
      prompts: getDefaultPrompts(CategoryId.Hard),
      amount: DEFAULT_CATEGORY_ALLOCATION[CategoryId.Hard],
    },
    [CategoryId.Funny]: {
      prompts: getDefaultPrompts(CategoryId.Funny),
      amount: DEFAULT_CATEGORY_ALLOCATION[CategoryId.Funny],
    },
  },
  language: null,
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    replaceCategoryPrompts: (
      state,
      action: PayloadAction<{
        categoryId: CategoryId
        prompts: Prompt[]
      }>,
    ) => {
      const category = state.categories[action.payload.categoryId]
      category.prompts = action.payload.prompts
      category.amount = Math.min(category.amount, action.payload.prompts.length)
    },
    setCategoryAmount: (
      state,
      action: PayloadAction<{ categoryId: CategoryId; amount: number }>,
    ) => {
      const selectedCategory = state.categories[action.payload.categoryId]
      const otherCategoriesAmount = Object.entries(state.categories).reduce(
        (total, [categoryId, category]) =>
          categoryId === action.payload.categoryId
            ? total
            : total + category.amount,
        0,
      )
      const maximumAmount = Math.min(
        selectedCategory.prompts.length,
        25 - otherCategoriesAmount,
      )

      selectedCategory.amount = Math.max(
        0,
        Math.min(action.payload.amount, maximumAmount),
      )
    },
    setLanguagePreference: (state, action: PayloadAction<Language | null>) => {
      state.language = action.payload
    },
  },
})

export const {
  replaceCategoryPrompts,
  setCategoryAmount,
  setLanguagePreference,
} = appStateSlice.actions
export const appStateReducer = appStateSlice.reducer
