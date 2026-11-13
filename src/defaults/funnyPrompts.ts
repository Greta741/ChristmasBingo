import { CategoryId, PromptSource } from '../domain/models'
import { defineDefaultPrompts } from './defineDefaultPrompts'

export const FUNNY_DEFAULT_PROMPTS = defineDefaultPrompts([
  {
    id: 'funny-01',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Elektros sąskaita bus kosminė“ – namas su absurdišku kiekiu lempučių.',
      en: '“The electricity bill will be astronomical” – a house with an absurd number of lights.',
    },
  },
  {
    id: 'funny-02',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Grinčas gyvena čia“ – visi kaimynai pasipuošę, o vienas namas visiškai tamsus.',
      en: '“The Grinch lives here” – all the neighbours have decorated, but one house is completely dark.',
    },
  },
  {
    id: 'funny-03',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Kalėdų Senelis prisidirbo“ – keistai pakibęs arba nuvirtęs Senelis.',
      en: '“Santa got himself into trouble” – a strangely suspended or toppled-over Santa.',
    },
  },
  {
    id: 'funny-04',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Per anksti atėjo Kalėdos“ – Helovino ir kalėdinių dekoracijų mišinys.',
      en: '“Christmas came too early” – a mix of Halloween and Christmas decorations.',
    },
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
    id: 'funny-06',
    categoryId: CategoryId.Funny,
    source: PromptSource.BuiltIn,
    text: {
      lt: '„Pamiršo nupuošti“ – akivaizdžiai sena, išblukusi dekoracija.',
      en: '“Forgot to take it down” – an obviously old, faded decoration.',
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
      lt: '„Kalėdinis chaosas“ – bent penki skirtingi dekoracijų stiliai viename kieme.',
      en: '“Christmas chaos” – at least five different decoration styles in one yard.',
    },
  },
])
