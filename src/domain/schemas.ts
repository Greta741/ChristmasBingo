import { z } from 'zod'

import {
  CARD_NAME_MAX_LENGTH,
  CUSTOM_PROMPT_MAX_LENGTH,
  CategoryId,
  PromptSource,
  type BasePrompt,
  type BingoCard,
  type BingoCell,
  type BingoGrid,
  type BuiltInPrompt,
  type CategoryAllocation,
  type CustomPrompt,
  type Prompt,
  type PromptLibraryState,
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

export const promptLibraryStateSchema: z.ZodType<PromptLibraryState> = z
  .object({
    prompts: z.array(promptSchema),
  })
  .superRefine(({ prompts }, context) => {
    const seenPromptIds = new Set<string>()

    prompts.forEach((prompt, index) => {
      if (seenPromptIds.has(prompt.id)) {
        context.addIssue({
          code: 'custom',
          message: 'Prompt IDs must be unique in the active library',
          path: ['prompts', index, 'id'],
        })
      }

      seenPromptIds.add(prompt.id)
    })
  })

export const bingoCellSchema: z.ZodType<BingoCell> = z.object({
  promptId: z.string().min(1),
  text: z.string(),
  found: z.boolean(),
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
  bingoCelebrated: z.boolean(),
  fullCardCelebrated: z.boolean(),
})

export const persistedLocalStateSchema = z.object({
  schemaVersion: z.literal(LOCAL_STORAGE_SCHEMA_VERSION),
  promptLibrary: promptLibraryStateSchema,
  categoryAllocation: categoryAllocationSchema,
  language: languageSchema,
})

export const persistedBingoCardSchema = bingoCardSchema.and(
  z.object({
    schemaVersion: z.literal(INDEXED_DB_SCHEMA_VERSION),
  }),
)

export type PersistedLocalState = z.infer<typeof persistedLocalStateSchema>
export type PersistedBingoCard = z.infer<typeof persistedBingoCardSchema>
