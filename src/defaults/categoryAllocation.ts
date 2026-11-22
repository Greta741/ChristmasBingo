import { CategoryId, type CategoryAllocation } from '../domain/models'

export const DEFAULT_CATEGORY_ALLOCATION: Readonly<CategoryAllocation> =
  Object.freeze({
    [CategoryId.Easy]: 11,
    [CategoryId.Medium]: 8,
    [CategoryId.Hard]: 4,
    [CategoryId.Funny]: 2,
  })
