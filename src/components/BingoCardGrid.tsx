import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { BingoGrid } from '../domain/models'

export function BingoCardGrid({
  cells,
  onCellClick,
  pendingCells,
}: {
  cells: BingoGrid
  onCellClick?: (promptId: string) => void
  pendingCells?: ReadonlySet<string>
}) {
  return (
    <Box
      role="table"
      sx={{ borderTop: 1, borderLeft: 1, borderColor: '#d9cba9' }}
    >
      {cells.map((row, index) => (
        <Box
          key={index}
          role="row"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          }}
        >
          {row.map((cell, column) => (
            <Box
              key={cell.promptId}
              role="cell"
              sx={{
                minWidth: 0,
                minHeight: { xs: 72, sm: 88 },
                p: onCellClick ? 0 : { xs: 0.5, sm: 1 },
                borderRight: 1,
                borderBottom: 1,
                borderColor: '#d9cba9',
                backgroundColor: cell.found
                  ? '#134b38'
                  : (index + column) % 2 === 0
                    ? '#fffdf7'
                    : '#f5efdf',
                color: cell.found ? '#fff8e8' : '#17372e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                lineHeight: 1.35,
                overflowWrap: 'anywhere',
              }}
            >
              {onCellClick ? (
                <ButtonBase
                  onClick={() => onCellClick(cell.promptId)}
                  aria-pressed={cell.found}
                  aria-busy={pendingCells?.has(cell.promptId) || undefined}
                  disabled={pendingCells?.has(cell.promptId)}
                  sx={{
                    width: '100%',
                    alignSelf: 'stretch',
                    p: { xs: 0.5, sm: 1 },
                    font: 'inherit',
                    color: 'inherit',
                    overflowWrap: 'anywhere',
                    '&.Mui-focusVisible': {
                      outline: '3px solid #b4862c',
                      outlineOffset: -3,
                    },
                  }}
                >
                  {cell.text}
                </ButtonBase>
              ) : (
                cell.text
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
