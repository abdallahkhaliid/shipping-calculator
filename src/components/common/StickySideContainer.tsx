import { styled } from "@mui/material/styles";
import { colors, spacing, borderRadius, shadows } from "../../theme/tokens";
import { Paper } from "@mui/material";

export const StickySideContainer = styled(Paper)(({ theme }) => ({
  position: "sticky",
  top: spacing[6],
  padding: spacing[5],
  borderRadius: borderRadius.lg,
  border: `1px solid ${colors.neutral[200]}`,
  boxShadow: shadows.md,

  [theme.breakpoints.down("md")]: {
    position: "static",
    marginTop: spacing[6],
  },
}));
