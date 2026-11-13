import { styled } from '@mui/material/styles'

export const PageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 1440,
  marginInline: 'auto',
  boxSizing: 'border-box',
  paddingInline: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { paddingInline: theme.spacing(2) },
}))
