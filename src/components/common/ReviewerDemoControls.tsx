import React from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  BugReport,
  PlayArrow,
  Refresh,
  Close,
  SearchOff,
} from "@mui/icons-material";
import { useQuote } from "../../hooks/useQuote";
import { useDesignTokens } from "../../hooks/useDesignTokens";

const MOCK_QUOTES = [
  {
    id: "demo-1",
    courierName: "Demo Express",
    courierLogo: "https://placehold.co/60x60?text=DE",
    basePrice: 15.0,
    tax: 2.25,
    totalPrice: 17.25,
    currency: "USD",
    estimatedDays: 2,
    serviceType: "express" as const,
    features: ["Real-time Tracking", "Insurance Included"],
  },
  {
    id: "demo-2",
    courierName: "Eco Ship",
    courierLogo: "https://placehold.co/60x60?text=ES",
    basePrice: 8.5,
    tax: 1.28,
    totalPrice: 9.78,
    currency: "USD",
    estimatedDays: 7,
    serviceType: "standard" as const,
    features: ["Carbon Neutral", "Email Notifications"],
  },
];

export const ReviewerDemoControls: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { setHasSearched, setIsLoading, setQuotes } = useQuote();
  const { colors } = useDesignTokens();

  if (!isOpen) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
        }}
      >
        <Tooltip title="Show Reviewer Controls">
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              bgcolor: colors.secondary[600],
              color: colors.white,
              "&:hover": { bgcolor: colors.secondary[700] },
              boxShadow: 3,
            }}
          >
            <BugReport />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 280,
        zIndex: 9999,

        overflow: "hidden",
        border: `1px solid ${colors.neutral[200]}`,
      }}
    >
      <Box
        sx={{
          bgcolor: colors.secondary[600],
          color: colors.white,
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BugReport fontSize="small" />
          <Typography variant="subtitle2" fontWeight={700}>
            Reviewer Demo Controls
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => setIsOpen(false)}
          sx={{ color: colors.white }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          Use these controls to quickly jump between application states for
          review.
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<Refresh />}
          onClick={() => {
            setHasSearched(false);
            setIsLoading(false);
            setQuotes([]);
          }}
          sx={{ justifyContent: "flex-start", color: colors.neutral[700] }}
        >
          1. Show Initial State
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<PlayArrow />}
          onClick={() => {
            setHasSearched(true);
            setIsLoading(true);
            setQuotes([]);
          }}
          sx={{ justifyContent: "flex-start", color: colors.secondary[600] }}
        >
          2. Show Loading State
        </Button>

        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            setHasSearched(true);
            setIsLoading(false);
            setQuotes(MOCK_QUOTES);
          }}
          sx={{
            justifyContent: "flex-start",
            bgcolor: colors.secondary[600],
            "&:hover": { bgcolor: colors.secondary[700] },
          }}
        >
          3. Show Results State
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          startIcon={<SearchOff />}
          onClick={() => {
            setHasSearched(true);
            setIsLoading(false);
            setQuotes([]);
          }}
          sx={{ justifyContent: "flex-start", color: colors.warning[700] }}
        >
          4. Show Empty Results
        </Button>
      </Box>
    </Paper>
  );
};
