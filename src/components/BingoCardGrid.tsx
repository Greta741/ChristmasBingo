import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import type { BingoGrid } from '../domain/models'
import { isCellMarked } from '../domain/isCellMarked'
import { FreeCenterIcon } from './FreeCenterIcon'

export function BingoCardGrid({
  cells,
  onCellClick,
  pendingCells,
  winningCells,
  printMode = false,
}: {
  cells: BingoGrid
  onCellClick?: (promptId: string) => void
  pendingCells?: ReadonlySet<string>
  winningCells?: ReadonlySet<string>
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
                  isCellMarked(cell) && !printMode
                    ? cell.isFree || winningCells?.has(cell.promptId)
                      ? '#a33b40'
                      : '#134b38'
                    : (index + column) % 2 === 0
                      ? '#fffdf7'
                      : '#f5efdf',
                color: isCellMarked(cell) && !printMode ? '#fff8e8' : '#17372e',
                position: 'relative',
                isolation: 'isolate',
                ...(!printMode &&
                  winningCells?.has(cell.promptId) && {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${Array.from(
                          { length: 5 },
                          (_, star) => {
                            const seed = index * 17 + column * 29 + star * 37
                            const x = 12 + ((seed * 13) % 76)
                            const y = 12 + ((seed * 23) % 76)
                            const size = 5 + (seed % 7)
                            return `<path fill="#e5c780" d="M0 -${size} L${size * 0.28} -${size * 0.28} L${size} 0 L${size * 0.28} ${size * 0.28} L0 ${size} L-${size * 0.28} ${size * 0.28} L-${size} 0 L-${size * 0.28} -${size * 0.28}Z" transform="translate(${x} ${y}) rotate(${seed % 90})"/>`
                          },
                        ).join('')}</svg>`,
                      )}")`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      opacity: 0.18,
                      pointerEvents: 'none',
                      zIndex: -1,
                    },
                  }),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: printMode ? '7pt' : { xs: '0.7rem', sm: '0.8rem' },
                lineHeight: printMode ? 1.15 : 1.35,
                overflowWrap: 'anywhere',
              }}
            >
              {cell.isFree ? (
                <FreeCenterIcon
                  shape={cell.freeCenterShape}
                  label={cell.text}
                />
              ) : onCellClick ? (
                <ButtonBase
                  onClick={() => onCellClick(cell.promptId)}
                  aria-pressed={cell.found}
                  aria-busy={pendingCells?.has(cell.promptId) || undefined}
                  disabled={cell.isFree || pendingCells?.has(cell.promptId)}
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
