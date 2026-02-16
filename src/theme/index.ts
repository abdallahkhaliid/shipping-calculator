import { createTheme, type ThemeOptions } from "@mui/material/styles";
import {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
} from "./tokens";

// Extend MUI theme to include custom tokens
declare module "@mui/material/styles" {
  interface Theme {
    customTokens: {
      colors: typeof colors;
      spacing: typeof spacing;
      borderRadius: typeof borderRadius;
      transitions: typeof transitions;
      typography: typeof typography;
    };
  }
  interface ThemeOptions {
    customTokens?: {
      colors?: typeof colors;
      spacing?: typeof spacing;
      borderRadius?: typeof borderRadius;
      transitions?: typeof transitions;
      typography?: typeof typography;
    };
  }
}

const themeOptions: ThemeOptions = {
  // Set spacing to 1 to treat sx numerical values as literal pixels
  spacing: 1,

  // Custom tokens accessible via theme.customTokens
  customTokens: {
    colors,
    spacing,
    borderRadius,
    transitions,
    typography,
  },

  palette: {
    mode: "light",
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: colors.white,
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
    },
    success: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
    },
    info: {
      main: colors.primary[400],
    },
    background: {
      default: colors.neutral[50],
      paper: colors.white,
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
    },
    divider: colors.neutral[200],
  },

  typography: {
    fontFamily: typography.fontFamily.primary,
    fontSize: 16,

    h1: {
      fontSize: typography.fontSize["5xl"],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: typography.fontSize["4xl"],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: typography.fontSize["3xl"],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.tight,
    },
    h4: {
      fontSize: typography.fontSize["2xl"],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    h5: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    body1: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.normal,
    },
    button: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
    caption: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.lineHeight.normal,
      color: colors.neutral[600],
    },
  },

  shape: {
    borderRadius: borderRadius.lg,
  },

  shadows: [
    shadows.none,
    shadows.xs,
    shadows.sm,
    shadows.md,
    shadows.md,
    shadows.lg,
    shadows.lg,
    shadows.xl,
    shadows.xl,
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
    shadows["2xl"],
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: colors.neutral[100],
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.neutral[300],
            borderRadius: borderRadius.md,
            "&:hover": {
              background: colors.neutral[400],
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          padding: `${spacing[3]}px ${spacing[6]}px`, // 12px 24px
          fontWeight: typography.fontWeight.semibold,
          transition: transitions.base,
          boxShadow: shadows.none,

          "&:hover": {
            boxShadow: shadows.sm,
            transform: "translateY(-1px)",
          },

          "&:active": {
            transform: "translateY(0)",
          },
        },

        sizeLarge: {
          padding: `${spacing[4]}px ${spacing[8]}px`,
          fontSize: typography.fontSize.base,
        },

        sizeSmall: {
          padding: `${spacing[2]}px ${spacing[4]}px`,
          fontSize: typography.fontSize.sm,
        },

        contained: {
          boxShadow: shadows.sm,
          "&:hover": {
            boxShadow: shadows.md,
          },
        },

        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          boxShadow: shadows.sm,
          border: `1px solid ${colors.neutral[200]}`,
          transition: transitions.base,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
        },
        elevation1: {
          boxShadow: shadows.sm,
        },
        elevation2: {
          boxShadow: shadows.md,
        },
        elevation3: {
          boxShadow: shadows.lg,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.xs,
        },

        filled: {
          border: "none",
        },

        outlined: {
          borderWidth: "2px",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius.md,
            transition: transitions.base,

            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[300],
              },
            },

            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: typography.fontWeight.bold,
          fontSize: typography.fontSize.xs,
        },
      },
    },

    MuiStepper: {
      styleOverrides: {
        root: {
          padding: spacing[6], // 24px
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,

          "&.Mui-active": {
            fontWeight: typography.fontWeight.semibold,
          },

          "&.Mui-completed": {
            fontWeight: typography.fontWeight.medium,
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          border: "1px solid",
          fontWeight: typography.fontWeight.medium,
        },

        standardInfo: {
          backgroundColor: colors.primary[50],
          borderColor: colors.primary[200],
          color: colors.primary[900],
        },

        standardSuccess: {
          backgroundColor: colors.secondary[50],
          borderColor: colors.secondary[200],
          color: colors.secondary[900],
        },

        standardWarning: {
          backgroundColor: colors.warning[50],
          borderColor: colors.warning[200],
          color: colors.warning[900],
        },

        standardError: {
          backgroundColor: colors.error[50],
          borderColor: colors.error[200],
          color: colors.error[900],
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
