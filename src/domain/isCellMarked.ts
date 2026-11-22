import type { BingoCell } from './models'

export function isCellMarked(cell: BingoCell): boolean {
  return cell.isFree === true || cell.found
}
