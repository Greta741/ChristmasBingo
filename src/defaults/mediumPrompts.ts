import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const MEDIUM_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'medium-01',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Sniego senis', en: 'Snowman' },
  },
  {
    id: 'medium-02',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Rogės', en: 'Sleigh' },
  },
  {
    id: 'medium-04',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Elfas', en: 'Elf' },
  },
  {
    id: 'medium-05',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Saldainio lazdelė', en: 'Candy cane' },
  },
  {
    id: 'medium-07',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdiniai varpeliai', en: 'Christmas bells' },
  },
  {
    id: 'medium-08',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Didelis kaspinas', en: 'Large bow' },
  },
  {
    id: 'medium-10',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Papuošta tvora', en: 'Decorated fence' },
  },
  {
    id: 'medium-11',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Papuoštas medis (ne eglutė)',
      en: 'Decorated tree (not a Christmas tree)',
    },
  },
  {
    id: 'medium-12',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Bent trys elniai viename kieme',
      en: 'At least three reindeer in one yard',
    },
  },
  {
    id: 'medium-14',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Šviečiantys varvekliai nuo stogo',
      en: 'Glowing icicles hanging from a roof',
    },
  },
  {
    id: 'medium-16',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Mėlynos Lemputės', en: 'Blue lights' },
  },
  {
    id: 'medium-17',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Trys vienodos dekoracijos', en: 'Three matching decorations' },
  },
  {
    id: 'medium-18',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdinė kojinė', en: 'Christmas stocking' },
  },
  {
    id: 'medium-19',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdinis žibintas', en: 'Christmas lantern' },
  },
  {
    id: 'medium-20',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Sidabrinė dekoracija', en: 'Silver decoration' },
  },
  {
    id: 'medium-21',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Unikaliai papuoštos durys (be vainiko)',
      en: 'Uniquely decorated door (without a wreath)',
    },
  },
  {
    id: 'medium-22',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Papuošta eglutė be lempučių',
      en: 'Decorated Christmas tree without lights',
    },
  },
])
