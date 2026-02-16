import React, { useMemo } from "react";
import { Grid, Box, Typography, Fade } from "@mui/material";
import { TrendingDown, Bolt, AttachMoney } from "@mui/icons-material";
import { useQuote } from "../../hooks/useQuote";
import { type CourierQuote } from "../../types";
import { CourierCard } from "./CourierCard";
import { CourierCardSkeleton } from "./CourierCardSkeleton";
import { EmptyState } from "./EmptyState";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { motion } from "framer-motion";

export const CourierResults: React.FC = () => {
  const { quotes, isLoading, setQuotes, setIsLoading, hasSearched } =
    useQuote();
  const { colors, spacing, typography } = useDesignTokens();

  // Calculate cheapest and fastest
  const { cheapestId, fastestId } = useMemo(() => {
    if (quotes.length === 0) return { cheapestId: null, fastestId: null };

    const cheapest = quotes.reduce(
      (prev: CourierQuote, current: CourierQuote) =>
        current.totalPrice < prev.totalPrice ? current : prev,
    );

    const fastest = quotes.reduce(
      (prev: CourierQuote, current: CourierQuote) =>
        current.estimatedDays < prev.estimatedDays ? current : prev,
    );

    return {
      cheapestId: cheapest.id,
      fastestId: fastest.id,
    };
  }, [quotes]);

  // Retry handler
  const handleRetry = () => {
    setIsLoading(true);
    setTimeout(() => {
      setQuotes([]);
      setIsLoading(false);
    }, 1000);
  };

  // 1. Initial State (Hasn't searched yet)
  if (!hasSearched) {
    return (
      <Box
        id="courier-results"
        sx={{
          textAlign: "center",
          py: spacing[6],
          px: spacing[4],
          bgcolor: colors.neutral[50],
          borderRadius: spacing[4],
          border: `1px solid ${colors.neutral[100]}`,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: colors.neutral[500],
            maxWidth: 400,
            mx: "auto",
            fontWeight: 500,
          }}
        >
          Complete the form steps above to see available courier rates and
          delivery times.
        </Typography>
      </Box>
    );
  }

  // 2. Searching State (Loading)
  if (isLoading) {
    return (
      <Box id="courier-results">
        <Box sx={{ mb: spacing[6] }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
              mb: spacing[2],
            }}
          >
            🔍 Finding the best rates...
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.neutral[600],
            }}
          >
            Comparing prices from multiple couriers
          </Typography>
        </Box>

        <Grid container spacing={24}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <CourierCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // 3a. Results State - Empty (Success but no quotes)
  if (quotes.length === 0) {
    return (
      <Box id="courier-results">
        <EmptyState onRetry={handleRetry} />
      </Box>
    );
  }

  // 3b. Results State - Success
  return (
    <Box id="courier-results">
      {/* Header with Stats */}
      <Box sx={{ mb: spacing[6] }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            mb: spacing[2],
          }}
        >
          🚚 Available Shipping Options
        </Typography>

        <Box sx={{ display: "flex", gap: spacing[4], flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: colors.secondary[100],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingDown
                sx={{ fontSize: 18, color: colors.secondary[700] }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Found <strong>{quotes.length}</strong> courier
              {quotes.length !== 1 ? "s" : ""}
            </Typography>
          </Box>

          {cheapestId && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: spacing[2] }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: colors.secondary[100],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AttachMoney
                  sx={{ fontSize: 18, color: colors.secondary[700] }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                From{" "}
                <strong>
                  $
                  {quotes
                    .find((q: CourierQuote) => q.id === cheapestId)
                    ?.totalPrice.toFixed(2)}
                </strong>
              </Typography>
            </Box>
          )}

          {fastestId && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: spacing[2] }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: colors.warning[100],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bolt sx={{ fontSize: 18, color: colors.warning[700] }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Fastest{" "}
                <strong>
                  {
                    quotes.find((q: CourierQuote) => q.id === fastestId)
                      ?.estimatedDays
                  }{" "}
                  days
                </strong>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Grid container spacing={16}>
        {quotes.map((quote: CourierQuote, index: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={quote.id}>
            <Fade in timeout={200 + index * 100}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CourierCard
                  quote={quote}
                  isCheapest={quote.id === cheapestId}
                  isFastest={quote.id === fastestId}
                />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
