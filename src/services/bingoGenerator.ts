import { CategoryId, PromptSource } from '../domain/models'
import type {
  BingoCard,
  BingoGrid,
  CategoriesState,
  Language,
  Prompt,
} from '../domain/models'

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

function unique(prompts: Prompt[]): Prompt[] {
  return [...new Map(prompts.map((prompt) => [prompt.id, prompt])).values()]
}

function createCardId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  // getRandomValues is also available over HTTP when testing on a phone over LAN.
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export const bingoGenerator = {
  getRandomCategory(
    categories: CategoriesState,
    excluded: Set<string>,
  ): CategoryId {
    const eligible = Object.values(CategoryId).filter((id) =>
      categories[id].prompts.some((prompt) => !excluded.has(prompt.id)),
    )
    if (!eligible.length) throw new Error('No eligible categories')
    return eligible[Math.floor(Math.random() * eligible.length)]
  },

  getRandomPromptsFromCategory(
    prompts: Prompt[],
    count: number,
    excluded = new Set<string>(),
  ): Prompt[] {
    const eligible = unique(prompts).filter(
      (prompt) => !excluded.has(prompt.id),
    )
    if (!Number.isInteger(count) || count < 0 || count > eligible.length)
      throw new Error('Invalid category allocation')
    return shuffle(eligible).slice(0, count)
  },

  generateCard(categories: CategoriesState, language: Language): BingoCard {
    if (
      unique(Object.values(categories).flatMap((category) => category.prompts))
        .length < 25
    )
      throw new Error('At least 25 unique prompts are required')
    const total = Object.values(categories).reduce(
      (sum, category) => sum + category.amount,
      0,
    )
    if (total > 25) throw new Error('Allocation exceeds 25 cells')
    const selected: Prompt[] = []
    const excluded = new Set<string>()
    const add = (prompts: Prompt[]) => {
      selected.push(...prompts)
      prompts.forEach((prompt) => excluded.add(prompt.id))
    }
    for (const id of Object.values(CategoryId)) {
      add(
        this.getRandomPromptsFromCategory(
          categories[id].prompts,
          categories[id].amount,
          excluded,
        ),
      )
    }
    while (selected.length < 25) {
      const id = this.getRandomCategory(categories, excluded)
      add(
        this.getRandomPromptsFromCategory(categories[id].prompts, 1, excluded),
      )
    }
    const cells = shuffle(selected).map((prompt) => ({
      promptId: prompt.id,
      text:
        prompt.source === PromptSource.BuiltIn
          ? prompt.text[language]
          : prompt.text,
      found: false,
    }))
    return {
      id: createCardId(),
      name: new Date().toLocaleString(language),
      createdAt: new Date().toISOString(),
      language,
      cells: Array.from({ length: 5 }, (_, row) =>
        cells.slice(row * 5, row * 5 + 5),
      ) as BingoGrid,
      bingoCelebrated: false,
      fullCardCelebrated: false,
    }
  },
}
