import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CATEGORY_ALLOCATION, DEFAULT_PROMPTS } from '../../defaults'
import {
  CategoryId,
  PromptSource,
  CUSTOM_PROMPT_MAX_LENGTH,
  type CustomPrompt,
  type AppState,
  type Language,
  type Prompt,
} from '../../domain/models'
import { createId } from '../../services/createId'

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
  freeCenter: false,
}

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    addCustomPrompt: {
      prepare: (categoryId: CategoryId, text: string) => ({
        payload: {
          id: `custom-${createId()}`,
          categoryId,
          source: PromptSource.Custom,
          text: text.trim(),
        } as CustomPrompt,
      }),
      reducer: (state, action: PayloadAction<CustomPrompt>) => {
        const prompt = action.payload
        if (!prompt.text || prompt.text.length > CUSTOM_PROMPT_MAX_LENGTH)
          return
        state.categories[prompt.categoryId].prompts.push(prompt)
      },
    },
    deletePrompt: (
      state,
      action: PayloadAction<{ categoryId: CategoryId; promptId: string }>,
    ) => {
      const category = state.categories[action.payload.categoryId]
      category.prompts = category.prompts.filter(
        (prompt) => prompt.id !== action.payload.promptId,
      )
      category.amount = Math.min(category.amount, category.prompts.length)
    },
    restoreCategoryDefaults: (state, action: PayloadAction<CategoryId>) => {
      const category = state.categories[action.payload]
      category.prompts = getDefaultPrompts(action.payload)
      category.amount = Math.min(category.amount, category.prompts.length)
    },
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
    setFreeCenter: (state, action: PayloadAction<boolean>) => {
      state.freeCenter = action.payload
    },
  },
})

export const {
  addCustomPrompt,
  deletePrompt,
  restoreCategoryDefaults,
  replaceCategoryPrompts,
  setCategoryAmount,
  setLanguagePreference,
  setFreeCenter,
} = appStateSlice.actions
export const appStateReducer = appStateSlice.reducer
