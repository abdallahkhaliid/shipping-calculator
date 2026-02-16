import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import { colors, borderRadius, typography } from "../../theme/tokens";

export const InfoChip = styled(Chip)<{ glowcolor?: string }>(
  ({ glowcolor = colors.primary[500] }) => ({
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.xs,
    borderRadius: borderRadius.md,
    boxShadow: `0 0 10px ${glowcolor}40`,

    "& .MuiChip-icon": {
      fontSize: "16px",
      marginLeft: 2,
    },

    "@keyframes pulse": {
      "0%, 100%": { boxShadow: `0 0 10px ${glowcolor}40` },
      "50%": { boxShadow: `0 0 20px ${glowcolor}60` },
    },

    animation: "pulse 2s ease-in-out infinite",
  }),
);
