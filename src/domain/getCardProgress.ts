import type { BingoGrid } from './models'

export function getCardProgress(cells: BingoGrid) {
  const prompts = cells.flat().filter((cell) => !cell.isFree)
  return {
    marked: prompts.filter((cell) => cell.found).length,
    total: prompts.length,
  }
}
