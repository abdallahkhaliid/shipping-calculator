import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { colors, spacing, borderRadius } from "../../theme/tokens";

export const PricingBox = styled(Box)({
  background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
  borderRadius: borderRadius.lg,
  padding: spacing[4],
  border: `1px solid ${colors.primary[200]}`,
  position: "relative",
  overflow: "hidden",

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: `radial-gradient(circle, ${colors.primary[200]}40, transparent)`,
    borderRadius: "50%",
    transform: "translate(30%, -30%)",
  },

  // Shine effect on hover
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    transition: "left 0.5s",
  },

  "&:hover::before": {
    left: "100%",
  },
});
