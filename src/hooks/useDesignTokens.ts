import { useTheme } from "@mui/material/styles";

export const useDesignTokens = () => {
  const theme = useTheme();

  return {
    colors: theme.customTokens.colors,
    typography: theme.customTokens.typography,
    spacing: theme.customTokens.spacing,
    borderRadius: theme.customTokens.borderRadius,
    transitions: theme.customTokens.transitions,
  };
};
