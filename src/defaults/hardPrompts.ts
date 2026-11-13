import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const HARD_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'hard-01',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdinis dinozauras', en: 'Christmas dinosaur' },
  },
  {
    id: 'hard-02',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Baltasis lokys', en: 'Polar bear' },
  },
  {
    id: 'hard-03',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdinis traukinukas', en: 'Christmas train' },
  },
  {
    id: 'hard-04',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Judanti kalėdinė dekoracija',
      en: 'Moving Christmas decoration',
    },
  },
  {
    id: 'hard-05',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Dekoracijos, grojančios muziką',
      en: 'Decorations playing music',
    },
  },
  {
    id: 'hard-06',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Kalėdų Senelis su neįprasta transporto priemone',
      en: 'Santa Claus with an unusual vehicle',
    },
  },
  {
    id: 'hard-07',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Rudolfas su raudona nosimi',
      en: 'Rudolph with a red nose',
    },
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
    text: {
      lt: 'Kalėdų Senelis ant kopėčių',
      en: 'Santa Claus on a ladder',
    },
  },
  {
    id: 'hard-10',
    categoryId: CategoryId.Hard,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Šviečianti Betliejaus žvaigždė',
      en: 'Illuminated Star of Bethlehem',
    },
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
])
