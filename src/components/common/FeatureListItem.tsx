import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { colors, spacing, borderRadius, transitions } from "../../theme/tokens";

export const FeatureListItem = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: spacing[3],
  padding: spacing[3],
  borderRadius: borderRadius.md,
  transition: transitions.fast,

  "&:hover": {
    backgroundColor: colors.neutral[50],
  },

  "& .feature-icon": {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.secondary[100],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.secondary[700],
    flexShrink: 0,
  },
});
