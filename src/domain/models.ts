export const CARD_NAME_MAX_LENGTH = 80
export const CUSTOM_PROMPT_MAX_LENGTH = 200

export type Language = 'lt' | 'en'
export type CardCelebration = 'bingo' | 'fullCard'

export enum CategoryId {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Funny = 'funny',
}

export enum PromptSource {
  BuiltIn = 'builtIn',
  Custom = 'custom',
}

export type CategoryAllocation = Record<CategoryId, number>

export interface BasePrompt {
  id: string
  categoryId: CategoryId
}

export interface BuiltInPrompt extends BasePrompt {
  source: PromptSource.BuiltIn
  text: Record<Language, string>
}

export interface CustomPrompt extends BasePrompt {
  source: PromptSource.Custom
  text: string
}

export type Prompt = BuiltInPrompt | CustomPrompt

export interface CategoryState {
  prompts: Prompt[]
  amount: number
}

export type CategoriesState = Record<CategoryId, CategoryState>

export interface AppState {
  categories: CategoriesState
  language: Language | null
}

export interface BingoCell {
  promptId: string
  text: string
  found: boolean
}

export type Tuple5<T> = [T, T, T, T, T]
export type BingoGrid = Tuple5<Tuple5<BingoCell>>

export interface BingoCard {
  id: string
  name: string
  createdAt: string
  language: Language
  cells: BingoGrid
}
