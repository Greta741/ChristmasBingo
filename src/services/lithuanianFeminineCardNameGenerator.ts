// All nouns and adjectives use the feminine singular form.
const adjectives = [
  'Linksma',
  'Jauki',
  'Snieguota',
  'Auksinė',
  'Sidabrinė',
  'Stebuklinga',
  'Šventinė',
  'Žaisminga',
  'Spindinti',
  'Balta',
  'Raudona',
  'Žalia',
  'Laiminga',
  'Paslaptinga',
  'Miela',
  'Žiemiška',
  'Apsimiegojusi',
  'Išdykusi',
  'Pūkuota',
  'Persivalgiusi',
  'Susivėlusi',
  'Čepsinti',
]

const nouns = [
  'snaigė',
  'eglutė',
  'žvaigždė',
  'dovana',
  'žvakė',
  'girlianda',
  'nykštukė',
  'pusnis',
  'kepurė',
  'pirštinė',
  'kojinė',
  'uoga',
  'šakelė',
  'pasaka',
  'silkė',
  'barzda',
  'karamelė',
  'šlepetė',
  'spanguolė',
  'žąsis',
  'spurga',
  'pūga',
  'aguona',
  'bruknė',
  'šaltiena',
]

export const lithuanianFeminineCardNameGenerator = {
  generate(): string {
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
  },
}
