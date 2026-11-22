import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const FUNNY_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'funny-01',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: 'Elektros sąskaita bus kosminė - absurdiškas lempučių kiekis',
      en: 'The electricity bill will be astronomical - an absurd number of lights',
    },
  },
  {
    id: 'funny-02',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Grinčas gyvena čia“ – visiškai tamsus namas tarp papuoštų',
      en: '“The Grinch lives here” – a completely dark house among decorated ones',
    },
  },
  {
    id: 'funny-03',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: { lt: 'Kalėdų senelis patekęs į bėdą', en: 'Santa Claus in trouble' },
  },
  {
    id: 'funny-05',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Mažiau yra daugiau“ – tik viena kukli dekoracija.',
      en: '“Less is more” – just one modest decoration.',
    },
  },
  {
    id: 'funny-07',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Kas čia išvis?“ – dekoracija, kurios neįmanoma atpažinti.',
      en: '“What even is that?” – a decoration that is impossible to identify.',
    },
  },
  {
    id: 'funny-08',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Konkurencija su kaimynu“ – du gretimi namai labai gausiai papuošti.',
      en: '“Competing with the neighbour” – two adjacent houses decorated very lavishly.',
    },
  },
  {
    id: 'funny-09',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Diskoteka“ – greitai mirksinčios įvairiaspalvės lemputės.',
      en: '“Disco” – rapidly flashing multicoloured lights.',
    },
  },
  {
    id: 'funny-10',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Kalėdinis chaosas“ – bent 3 skirtingi dekoracijų stiliai viename kieme.',
      en: '“Christmas chaos” – at least 3 different decoration styles in one yard.',
    },
  },
])
