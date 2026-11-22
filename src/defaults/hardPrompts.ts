import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const HARD_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'hard-13',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Pingvinas', en: 'Penguin' },
  },
  {
    id: 'hard-02',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Meška', en: 'Bear' },
  },
  {
    id: 'hard-03',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Traukinukas', en: 'Miniature train' },
  },
  {
    id: 'hard-04',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Judanti dekoracija', en: 'Moving decoration' },
  },
  {
    id: 'hard-05',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Grojanti dekoracija', en: 'Decoration playing music' },
  },
  {
    id: 'hard-08',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Visas namas apkarstytas lemputėmis',
      en: 'Entire house covered in lights',
    },
  },
  {
    id: 'hard-09',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdų senelis ant kopėčių', en: 'Santa Claus on a ladder' },
  },
  {
    id: 'hard-11',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Kalėdiškai papuošta gyvūno būda',
      en: 'Festively decorated pet house',
    },
  },
  {
    id: 'hard-12',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Daugiau nei penkios papuoštos eglutės viename kieme',
      en: 'More than five decorated Christmas trees in one yard',
    },
  },
  {
    id: 'hard-14',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Prakartėlė', en: 'Nativity scene' },
  },
  {
    id: 'hard-15',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Eglutė su bent trim skirtingom lemputėm',
      en: 'Christmas tree with at least three different types of lights',
    },
  },
])
