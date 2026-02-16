import { Box } from "@mui/material";
import { colors, borderRadius, spacing } from "../../theme/tokens";
import { styled } from "@mui/material/styles";

export const GradientBox = styled(Box)({
  background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[700]} 100%)`,
  borderRadius: borderRadius.lg,
  padding: spacing[6],
  color: colors.white,
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-50%",
    bottom: "-50%",
    left: "-50%",
    background: `linear-gradient(45deg, transparent, ${colors.primary[300]}40, transparent)`,
    transform: "rotate(45deg)",
    animation: "shimmer 3s infinite linear",
  },

  "@keyframes shimmer": {
    "0%": {
      transform: "translateX(-100%) rotate(45deg)",
    },
    "100%": {
      transform: "translateX(100%) rotate(45deg)",
    },
  },
});
