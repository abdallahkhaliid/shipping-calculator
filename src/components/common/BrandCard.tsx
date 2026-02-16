import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import { colors, borderRadius, transitions, shadows } from "../../theme/tokens";

export const BrandCard = styled(Card)(({ theme }) => ({
  borderRadius: borderRadius.xl,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.sm,
  transition: transitions.base,

  "&:active": {
    transform: "translateY(0)",
  },

  [theme.breakpoints.down("sm")]: {
    borderRadius: borderRadius.lg,
  },
}));
