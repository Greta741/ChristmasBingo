import type { BingoGrid } from '../domain/models'

export function getCompletedLines(cells: BingoGrid) {
  const lines = [
    ...cells.map((row, index) => ({ id: `row-${index}`, cells: row })),
    ...cells.map((_, column) => ({
      id: `column-${column}`,
      cells: cells.map((row) => row[column]),
    })),
    { id: 'diagonal-down', cells: cells.map((row, index) => row[index]) },
    { id: 'diagonal-up', cells: cells.map((row, index) => row[4 - index]) },
  ]
  return lines.filter((line) => line.cells.every((cell) => cell.found))
}
