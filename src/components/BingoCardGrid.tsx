import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { BingoGrid } from '../domain/models'

export function BingoCardGrid({
  cells,
  onCellClick,
  pendingCells,
  printMode = false,
}: {
  cells: BingoGrid
  onCellClick?: (promptId: string) => void
  pendingCells?: ReadonlySet<string>
  printMode?: boolean
}) {
  return (
    <Box
      role="table"
      sx={{
        borderTop: 1,
        borderLeft: 1,
        borderColor: '#d9cba9',
        ...(printMode && {
          height: '100%',
          display: 'grid',
          gridTemplateRows: 'repeat(5, minmax(0, 1fr))',
        }),
      }}
    >
      {cells.map((row, index) => (
        <Box
          key={index}
          role="row"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
            ...(printMode && { minHeight: 0 }),
          }}
        >
          {row.map((cell, column) => (
            <Box
              key={cell.promptId}
              role="cell"
              sx={{
                minWidth: 0,
                minHeight: printMode ? 0 : { xs: 72, sm: 88 },
                p: onCellClick ? 0 : printMode ? '1mm' : { xs: 0.5, sm: 1 },
                borderRight: 1,
                borderBottom: 1,
                borderColor: '#d9cba9',
                backgroundColor:
                  cell.found && !printMode
                    ? '#134b38'
                    : (index + column) % 2 === 0
                      ? '#fffdf7'
                      : '#f5efdf',
                color: cell.found && !printMode ? '#fff8e8' : '#17372e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: printMode ? '7pt' : { xs: '0.7rem', sm: '0.8rem' },
                lineHeight: printMode ? 1.15 : 1.35,
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
                <Box component="span">{cell.text}</Box>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
