import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import {
  colors,
  spacing,
  borderRadius,
  transitions,
  typography,
} from "../../theme/tokens";

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: colors.primary[500],
  border: `1px solid ${colors.primary[500]}`,
  fontWeight: typography.fontWeight.bold,
  fontSize: typography.fontSize.base,
  padding: `${spacing[4]}px ${spacing[8]}px`,
  borderRadius: borderRadius.md,
  transition: transitions.base,
  textTransform: "none",
  letterSpacing: "0.5px",

  "&:hover": {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[600],
    color: colors.primary[600],
    transform: "translateY(-2px)",
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&:disabled": {
    borderColor: colors.neutral[300],
    color: colors.neutral[500],
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: typography.fontSize.sm,
    padding: `${spacing[3]}px ${spacing[6]}px`,
  },
}));
