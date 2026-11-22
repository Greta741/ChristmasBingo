import { createId } from './createId'
import { lithuanianCardNameGenerator } from './lithuanianCardNameGenerator'
import { englishCardNameGenerator } from './englishCardNameGenerator'
import { CategoryId, FreeCenterShape, PromptSource } from '../domain/models'
import type {
  BingoCard,
  BingoCell,
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

  generateCard(
    categories: CategoriesState,
    language: Language,
    freeCenter = false,
  ): BingoCard {
    const promptCount = freeCenter ? 24 : 25
    if (
      unique(Object.values(categories).flatMap((category) => category.prompts))
        .length < promptCount
    )
      throw new Error(`At least ${promptCount} unique prompts are required`)
    const total = Object.values(categories).reduce(
      (sum, category) => sum + category.amount,
      0,
    )
    if (total > 25) throw new Error('Allocation exceeds 25 cells')
    const allocatedCategories = Object.values(CategoryId).filter(
      (id) => categories[id].amount > 0,
    )
    // If all 25 slots are allocated, choose a category uniformly to make room.
    // Otherwise the free center takes one of the unallocated random slots.
    const reducedCategory =
      freeCenter && total === 25
        ? allocatedCategories[
            Math.floor(Math.random() * allocatedCategories.length)
          ]
        : undefined
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
          categories[id].amount - (id === reducedCategory ? 1 : 0),
          excluded,
        ),
      )
    }
    while (selected.length < promptCount) {
      const id = this.getRandomCategory(categories, excluded)
      add(
        this.getRandomPromptsFromCategory(categories[id].prompts, 1, excluded),
      )
    }
    const cells: BingoCell[] = shuffle(selected).map((prompt) => ({
      promptId: prompt.id,
      text:
        prompt.source === PromptSource.BuiltIn
          ? prompt.text[language]
          : prompt.text,
      found: false,
    }))
    if (freeCenter) {
      const shapes = Object.values(FreeCenterShape)
      cells.splice(12, 0, {
        promptId: `free-center-${createId()}`,
        text: language === 'lt' ? 'Nemokamas centras' : 'Free space',
        found: true,
        isFree: true,
        freeCenterShape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }
    return {
      id: createId(),
      name:
        language === 'lt'
          ? lithuanianCardNameGenerator.generate()
          : englishCardNameGenerator.generate(),
      createdAt: new Date().toISOString(),
      language,
      cells: Array.from({ length: 5 }, (_, row) =>
        cells.slice(row * 5, row * 5 + 5),
      ) as BingoGrid,
    }
  },
}
