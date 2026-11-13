import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import { PageHeader } from '../../components/layout/PageHeader'

export function PrintView() {
  return (
    <>
      <PageHeader
        title="Spausdinti korteles"
        description="Kalėdiniai atradimai ir popieriuje. Pasiimk bingo kortelę į pasivaikščiojimą."
      />
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Pirmiausia susikurk korteles, kurias norėsi spausdinti.
        </Typography>
        <Button component={Link} to="/create" variant="contained">
          Kurti korteles
        </Button>
      </Paper>
    </>
  )
}
