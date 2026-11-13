import { CategoryId, type CategoryAllocation } from '../domain/models'

export const DEFAULT_CATEGORY_ALLOCATION: Readonly<CategoryAllocation> =
  Object.freeze({
    [CategoryId.Easy]: 10,
    [CategoryId.Medium]: 7,
    [CategoryId.Hard]: 4,
    [CategoryId.Funny]: 4,
  })
