import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const MEDIUM_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'medium-01',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Sniego senis (dekoracija arba tikras)',
      en: 'Snowman (decoration or real one)',
    },
  },
  {
    id: 'medium-02',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdų Senelio rogės', en: "Santa Claus's sleigh" },
  },
  {
    id: 'medium-03',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Elnias su rogėmis', en: 'Reindeer with a sleigh' },
  },
  {
    id: 'medium-04',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdinis elfas', en: 'Christmas elf' },
  },
  {
    id: 'medium-05',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Saldainio lazdelė', en: 'Candy cane' },
  },
  {
    id: 'medium-06',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Spragtukas', en: 'Nutcracker' },
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
    text: { lt: 'Didelis raudonas kaspinas', en: 'Large red bow' },
  },
  {
    id: 'medium-09',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Kalėdinis vainikas ant durų',
      en: 'Christmas wreath on a door',
    },
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
      lt: 'Papuoštas tikras augantis medis',
      en: 'Decorated real growing tree',
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
    id: 'medium-13',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Kalėdų Senelis, lipantis į namą',
      en: 'Santa Claus climbing into a house',
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
    id: 'medium-15',
    categoryId: CategoryId.Medium,
    source: PromptSource.BuiltIn,
    text: { lt: 'Pingvinas', en: 'Penguin' },
  },
])
