import { z } from 'zod'

import {
  CARD_NAME_MAX_LENGTH,
  CUSTOM_PROMPT_MAX_LENGTH,
  CategoryId,
  FreeCenterShape,
  PromptSource,
  type AppState,
  type BasePrompt,
  type BingoCard,
  type BingoCell,
  type BingoGrid,
  type BuiltInPrompt,
  type CategoryAllocation,
  type CategoriesState,
  type CategoryState,
  type CustomPrompt,
  type Prompt,
} from './models'

export const LOCAL_STORAGE_SCHEMA_VERSION = 1
export const INDEXED_DB_SCHEMA_VERSION = 1

export const languageSchema = z.enum(['lt', 'en'])
export const categoryIdSchema = z.enum(CategoryId)
export const promptSourceSchema = z.enum(PromptSource)

export const categoryAllocationSchema: z.ZodType<CategoryAllocation> = z.object(
  {
    [CategoryId.Easy]: z.number().int().nonnegative(),
    [CategoryId.Medium]: z.number().int().nonnegative(),
    [CategoryId.Hard]: z.number().int().nonnegative(),
    [CategoryId.Funny]: z.number().int().nonnegative(),
  },
)

export const basePromptSchema = z.object({
  id: z.string().min(1),
  categoryId: categoryIdSchema,
}) satisfies z.ZodType<BasePrompt>

export const builtInPromptSchema = basePromptSchema.extend({
  source: z.literal(PromptSource.BuiltIn),
  text: z.object({
    lt: z.string(),
    en: z.string(),
  }),
}) satisfies z.ZodType<BuiltInPrompt>

export const customPromptSchema = basePromptSchema.extend({
  source: z.literal(PromptSource.Custom),
  text: z.string().max(CUSTOM_PROMPT_MAX_LENGTH),
}) satisfies z.ZodType<CustomPrompt>

export const promptSchema = z.discriminatedUnion('source', [
  builtInPromptSchema,
  customPromptSchema,
]) satisfies z.ZodType<Prompt>

const promptArraySchema = z.array(promptSchema)

export const categoryStateSchema: z.ZodType<CategoryState> = z.object({
  prompts: promptArraySchema,
  amount: z.number().int().nonnegative(),
})

export const categoriesStateSchema: z.ZodType<CategoriesState> = z
  .object({
    [CategoryId.Easy]: categoryStateSchema,
    [CategoryId.Medium]: categoryStateSchema,
    [CategoryId.Hard]: categoryStateSchema,
    [CategoryId.Funny]: categoryStateSchema,
  })
  .superRefine((categories, context) => {
    const seenPromptIds = new Set<string>()
    let totalAmount = 0

    Object.entries(categories).forEach(([categoryId, category]) => {
      totalAmount += category.amount

      if (category.amount > category.prompts.length) {
        context.addIssue({
          code: 'custom',
          message: 'Category amount cannot exceed its available prompt count',
          path: [categoryId, 'amount'],
        })
      }

      category.prompts.forEach((prompt, index) => {
        if (prompt.categoryId !== categoryId) {
          context.addIssue({
            code: 'custom',
            message: 'Prompt category must match its category bucket',
            path: [categoryId, 'prompts', index, 'categoryId'],
          })
        }

        if (seenPromptIds.has(prompt.id)) {
          context.addIssue({
            code: 'custom',
            message: 'Prompt IDs must be unique across all categories',
            path: [categoryId, 'prompts', index, 'id'],
          })
        }

        seenPromptIds.add(prompt.id)
      })
    })

    if (totalAmount > 25) {
      context.addIssue({
        code: 'custom',
        message: 'Total category amount cannot exceed 25',
        path: [],
      })
    }
  })

const appStateShape = {
  categories: categoriesStateSchema,
  language: languageSchema.nullable(),
  freeCenter: z.boolean().default(false),
}

export const appStateSchema: z.ZodType<AppState> = z.object(appStateShape)

export const bingoCellSchema: z.ZodType<BingoCell> = z.object({
  promptId: z.string().min(1),
  text: z.string(),
  found: z.boolean(),
  isFree: z.boolean().optional(),
  freeCenterShape: z.enum(FreeCenterShape).optional(),
})

export const bingoRowSchema = z.tuple([
  bingoCellSchema,
  bingoCellSchema,
  bingoCellSchema,
  bingoCellSchema,
  bingoCellSchema,
])

export const bingoGridSchema: z.ZodType<BingoGrid> = z
  .tuple([
    bingoRowSchema,
    bingoRowSchema,
    bingoRowSchema,
    bingoRowSchema,
    bingoRowSchema,
  ])
  .superRefine((rows, context) => {
    const seenPromptIds = new Set<string>()

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (seenPromptIds.has(cell.promptId)) {
          context.addIssue({
            code: 'custom',
            message: 'Prompt IDs must be unique across a bingo card',
            path: [rowIndex, columnIndex, 'promptId'],
          })
        }

        seenPromptIds.add(cell.promptId)
      })
    })
  })

export const bingoCardSchema: z.ZodType<BingoCard> = z.object({
  id: z.string().min(1),
  name: z.string().max(CARD_NAME_MAX_LENGTH),
  createdAt: z.iso.datetime({ offset: true }),
  language: languageSchema,
  cells: bingoGridSchema,
})

export const persistedLocalStateSchema = z.object({
  schemaVersion: z.literal(LOCAL_STORAGE_SCHEMA_VERSION),
  ...appStateShape,
})

export const persistedBingoCardSchema = bingoCardSchema.and(
  z.object({
    schemaVersion: z.literal(INDEXED_DB_SCHEMA_VERSION),
  }),
)

export type PersistedLocalState = z.infer<typeof persistedLocalStateSchema>
export type PersistedBingoCard = z.infer<typeof persistedBingoCardSchema>
