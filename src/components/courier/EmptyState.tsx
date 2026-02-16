import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { SearchOff, Refresh } from "@mui/icons-material";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { motion } from "motion/react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No couriers available",
  message = "No shipping services found for this route. Try adjusting your shipping details.",
  onRetry,
}) => {
  const { colors, spacing, borderRadius } = useDesignTokens();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        p: { xs: spacing[4], sm: spacing[6] },
        textAlign: "center",
      }}
    >
      {/* Animated Icon */}
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          display: "inline-flex",
          p: spacing[3],
          borderRadius: "50%",
          bgcolor: colors.neutral[50],
          mb: spacing[3],
        }}
      >
        <SearchOff
          sx={{
            fontSize: 48,
            color: colors.neutral[400],
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: colors.neutral[900],
          mb: spacing[1],
        }}
      >
        {title}
      </Typography>

      {/* Message */}
      <Typography
        variant="body2"
        sx={{
          color: colors.neutral[500],
          mb: spacing[4],
          maxWidth: 320,
          mx: "auto",
        }}
      >
        {message}
      </Typography>

      {/* Retry Button */}
      {onRetry && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{
            mb: spacing[4],
            px: spacing[4],
            borderRadius: borderRadius.full,
            textTransform: "none",
            fontWeight: 600,
            borderColor: colors.neutral[300],
            color: colors.neutral[700],
            "&:hover": {
              borderColor: colors.neutral[400],
              bgcolor: colors.neutral[50],
            },
          }}
        >
          Try Again
        </Button>
      )}

      {/* Helpful Tips */}
      <Box
        sx={{
          mt: spacing[2],
          pt: spacing[3],
          borderTop: `1px solid ${colors.neutral[100]}`,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: colors.neutral[400],
            mb: spacing[2],
            display: "block",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Suggestions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: spacing[1],
          }}
        >
          {[
            "Check address accuracy",
            "Try a different origin",
            "Verify weight and dimensions",
          ].map((tip, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                color: colors.neutral[500],
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&::before": {
                  content: '"•"',
                  color: colors.secondary[400],
                  fontWeight: 900,
                },
              }}
            >
              {tip}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
