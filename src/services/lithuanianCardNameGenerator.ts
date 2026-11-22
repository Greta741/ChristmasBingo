import { lithuanianMasculineCardNameGenerator } from './lithuanianMasculineCardNameGenerator'
import { lithuanianFeminineCardNameGenerator } from './lithuanianFeminineCardNameGenerator'

export const lithuanianCardNameGenerator = {
  generate(): string {
    return Math.random() < 0.5
      ? lithuanianMasculineCardNameGenerator.generate()
      : lithuanianFeminineCardNameGenerator.generate()
  },
}
