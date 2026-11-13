import { EASY_DEFAULT_PROMPTS } from './easyPrompts'
import { FUNNY_DEFAULT_PROMPTS } from './funnyPrompts'
import { HARD_DEFAULT_PROMPTS } from './hardPrompts'
import { MEDIUM_DEFAULT_PROMPTS } from './mediumPrompts'

export { EASY_DEFAULT_PROMPTS } from './easyPrompts'
export type { DefaultBuiltInPrompt } from './defineDefaultPrompts'
export { FUNNY_DEFAULT_PROMPTS } from './funnyPrompts'
export { HARD_DEFAULT_PROMPTS } from './hardPrompts'
export { MEDIUM_DEFAULT_PROMPTS } from './mediumPrompts'

export const DEFAULT_PROMPTS = Object.freeze([
  ...EASY_DEFAULT_PROMPTS,
  ...MEDIUM_DEFAULT_PROMPTS,
  ...HARD_DEFAULT_PROMPTS,
  ...FUNNY_DEFAULT_PROMPTS,
])
