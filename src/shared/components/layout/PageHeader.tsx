import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box component="header" sx={{ mb: 2.5 }}>
      <Typography component="h1" variant="h1" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
        {description}
      </Typography>
    </Box>
  )
}
