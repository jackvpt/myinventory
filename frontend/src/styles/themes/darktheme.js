import { createTheme } from "@mui/material"
import { frFR } from "@mui/material/locale"
import { frFR as dataGridFrFR } from "@mui/x-data-grid/locales"

// === Creation of the dark theme ===
export const darkTheme = createTheme(
  {
    values: {
      xs: 0,
      sm: 370, // 👈 mobile
      md: 768, // 👈 tablet
      lg: 1024, // 👈 laptop
      xl: 1440, // 👈 desktop large
    },
    palette: {
      mode: "dark",

      // Couleurs principales
      primary: {
        light: "#404040", // primary-color-3
        main: "#373737", // primary-color-4
        dark: "#292929", // primary-color-1
        contrastText: "#fff",
      },

      custom: {
        c1: "#1976d2", // secondary-color-1
        c2: "#6faaee", // secondary-color-2
        buttonReset: "#292929", // primary-color-1
        buttonAdd: "#1976d2", // secondary-color-1
        buttonUpdate: "#ffa500",
        buttonDelete: "#f00",
        contrastText: "#fff",
      },

      background: {
        default: "#303030", // primary-color-2
        paper: "#404040", // primary-color-3
      },

      text: {
        primary: "#eee", // text-color-2
        secondary: "#347deb", // text-color-3
      },

      // Highlight / accents
      info: {
        main: "#6faaee", // secondary-color-2
      },
    },

    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#404040",
          },
        },
      },
    },
  },
  frFR,
  dataGridFrFR,
)
