import { createTheme, responsiveFontSizes } from '@mui/material/styles'

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: '#134b38' },
      secondary: { main: '#a33b40' },
      warning: { main: '#b4862c' },
      background: { default: '#faf8f3', paper: '#ffffff' },
      text: { primary: '#17372e', secondary: '#596c62' },
      divider: '#e3e8df',
    },
    typography: {
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontSize: '2.25rem', fontWeight: 750, lineHeight: 1.2 },
      h2: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 },
      button: { fontWeight: 650, textTransform: 'none' },
      body1: { lineHeight: 1.5 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 44,
            borderRadius: 12,
            paddingInline: 14,
            '&.Mui-focusVisible': {
              outline: '3px solid #b4862c',
              outlineOffset: 3,
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
    },
  }),
)
