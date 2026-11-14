import Box from '@mui/material/Box'
import type { BingoGrid } from '../domain/models'

export function BingoCardGrid({ cells }: { cells: BingoGrid }) {
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
                p: { xs: 0.5, sm: 1 },
                borderRight: 1,
                borderBottom: 1,
                borderColor: '#d9cba9',
                backgroundColor:
                  (index + column) % 2 === 0 ? '#fffdf7' : '#f5efdf',
                color: '#17372e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                lineHeight: 1.35,
                overflowWrap: 'anywhere',
              }}
            >
              {cell.text}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
