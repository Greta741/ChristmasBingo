import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const EASY_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'easy-01',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdų Senelis', en: 'Santa Claus' },
  },
  {
    id: 'easy-02',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Elnias', en: 'Reindeer' },
  },
  {
    id: 'easy-03',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Šviečianti žvaigždė', en: 'Illuminated star' },
  },
  {
    id: 'easy-04',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Lauke papuošta eglutė',
      en: 'Decorated outdoor Christmas tree',
    },
  },
  {
    id: 'easy-05',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Baltos kalėdinės lemputės', en: 'White Christmas lights' },
  },
  {
    id: 'easy-06',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Spalvotos kalėdinės lemputės',
      en: 'Colourful Christmas lights',
    },
  },
  {
    id: 'easy-07',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Snaigės dekoracija', en: 'Snowflake decoration' },
  },
  {
    id: 'easy-08',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Papuoštas langas', en: 'Decorated window' },
  },
  {
    id: 'easy-09',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Didelė dovanos dekoracija', en: 'Large gift decoration' },
  },
  {
    id: 'easy-10',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Lemputėmis papuoštas namo stogas',
      en: 'House roof decorated with lights',
    },
  },
  {
    id: 'easy-11',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Raudoni eglutės žaisliukai', en: 'Red Christmas baubles' },
  },
  {
    id: 'easy-12',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Elektrinė žvakė lange', en: 'Electric candle in a window' },
  },
  {
    id: 'easy-13',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Kalėdinis vainikas ant durų',
      en: 'Christmas wreath on a door',
    },
  },
  {
    id: 'easy-14',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Papuoštas balkonas', en: 'Decorated balcony' },
  },
  {
    id: 'easy-15',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Auksinės spalvos dekoracija', en: 'Gold decoration' },
  },
  {
    id: 'easy-16',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Raudona dekoracija', en: 'Red decoration' },
  },
  {
    id: 'easy-17',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Žalia dekoracija', en: 'Green decoration' },
  },
  {
    id: 'easy-18',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: { lt: 'Balta dekoracija', en: 'White decoration' },
  },
  {
    id: 'easy-19',
    categoryId: CategoryId.Easy,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Dvi dekoracijos viename lange',
      en: 'Two decorations in one window',
    },
  },
])
