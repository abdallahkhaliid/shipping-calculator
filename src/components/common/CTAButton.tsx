import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import {
  colors,
  spacing,
  borderRadius,
  transitions,
  shadows,
  typography,
} from "../../theme/tokens";

export const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.primary[500],
  color: colors.white,
  fontWeight: typography.fontWeight.bold,
  fontSize: typography.fontSize.base,
  padding: `${spacing[4]}px ${spacing[8]}px`,
  borderRadius: borderRadius.md,
  boxShadow: shadows.md,
  transition: transitions.base,
  textTransform: "none",
  letterSpacing: "0.5px",

  "&:hover": {
    backgroundColor: colors.primary[600],
    boxShadow: shadows.lg,
    transform: "translateY(-2px)",
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: shadows.sm,
  },

  "&:disabled": {
    backgroundColor: colors.neutral[300],
    color: colors.neutral[500],
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: typography.fontSize.sm,
    padding: `${spacing[3]}px ${spacing[6]}px`,
  },
}));
