import { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { NavigationLinks } from './NavigationLinks'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        aria-label="Atidaryti meniu"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? 'mobile-navigation' : undefined}
        onClick={() => setOpen(true)}
        color="inherit"
        sx={{ width: 44, height: 44 }}
      >
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            id: 'mobile-navigation',
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': 'mobile-menu-title',
            sx: {
              width: 300,
              maxWidth: '85vw',
              p: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderLeft: 2,
              borderColor: 'warning.main',
            },
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          <Typography id="mobile-menu-title" component="h2" variant="h2">
            Meniu
          </Typography>
          <IconButton
            aria-label="Uždaryti meniu"
            color="inherit"
            onClick={() => setOpen(false)}
            sx={{ width: 44, height: 44 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <NavigationLinks vertical onNavigate={() => setOpen(false)} />
        </Box>
      </Drawer>
    </>
  )
}
