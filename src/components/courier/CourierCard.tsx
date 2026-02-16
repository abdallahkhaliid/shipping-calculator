import React from "react";
import {
  CardContent,
  Box,
  Typography,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AttachMoney, Bolt, CheckCircle, Schedule } from "@mui/icons-material";
import type { CourierQuote } from "../../types";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { PricingBox } from "../common/PricingBox";
import { InfoChip } from "../common/InfoChip";
import { BrandCard } from "../common/BrandCard";

interface CourierCardProps {
  quote: CourierQuote;
  isCheapest?: boolean;
  isFastest?: boolean;
  onSelect?: () => void;
}

export const CourierCard: React.FC<CourierCardProps> = ({
  quote,
  isCheapest,
  isFastest,
  onSelect,
}) => {
  const { colors, spacing, borderRadius, typography } = useDesignTokens();

  return (
    <BrandCard
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: onSelect ? "pointer" : "default",
        p: { xs: spacing[3], sm: spacing[4] },
      }}
      onClick={onSelect}
    >
      {/* Badges Container */}
      <Box
        sx={{
          position: "absolute",
          top: spacing[3],
          right: spacing[3],
          display: "flex",
          gap: spacing[2],
          zIndex: 10,
        }}
      >
        {isCheapest && (
          <InfoChip
            icon={<AttachMoney />}
            label="CHEAPEST"
            glowcolor={colors.secondary[500]}
            sx={{
              bgcolor: colors.secondary[500],
              color: colors.white,
              fontWeight: typography.fontWeight.bold,
            }}
          />
        )}

        {isFastest && (
          <InfoChip
            icon={<Bolt />}
            label="FASTEST"
            glowcolor={colors.warning[500]}
            sx={{
              bgcolor: colors.warning[500],
              color: colors.neutral[900],
              fontWeight: typography.fontWeight.bold,
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 0,
          "&:last-child": { pb: 0 },
        }}
      >
        {/* Courier Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: spacing[6],
            mt: spacing[2],
          }}
        >
          <Avatar
            src={quote.courierLogo}
            alt={quote.courierName}
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              mr: spacing[3],
              border: `1px solid ${colors.neutral[200]}`,
              transition: "all 0.3s ease",
              bgcolor: colors.white,

              "&:hover": {
                transform: "scale(1.05)",
                borderColor: colors.primary[300],
              },
            }}
            variant="rounded"
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900],
                mb: 0.5,
                fontSize: {
                  xs: typography.fontSize.lg,
                  sm: typography.fontSize.xl,
                },
              }}
            >
              {quote.courierName}
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                px: spacing[2],
                py: spacing[1],
                borderRadius: borderRadius.sm,
                bgcolor:
                  quote.serviceType === "express"
                    ? colors.primary[50]
                    : colors.neutral[100],
                border: `1px solid ${
                  quote.serviceType === "express"
                    ? colors.primary[200]
                    : colors.neutral[300]
                }`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color:
                    quote.serviceType === "express"
                      ? colors.primary[700]
                      : colors.neutral[700],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.xs,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {quote.serviceType}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Pricing Box with Design Tokens */}
        <PricingBox sx={{ mb: spacing[3] }}>
          {/* Base Price */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: colors.neutral[600],
                fontSize: typography.fontSize.sm,
              }}
            >
              Base Price
            </Typography>
            <Typography
              sx={{
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral[900],
                fontSize: typography.fontSize.base,
              }}
            >
              ${quote.basePrice.toFixed(2)}
            </Typography>
          </Stack>

          {/* Tax */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: colors.neutral[600],
                fontSize: typography.fontSize.sm,
              }}
            >
              Tax (10%)
            </Typography>
            <Typography
              sx={{
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral[900],
                fontSize: typography.fontSize.base,
              }}
            >
              ${quote.tax.toFixed(2)}
            </Typography>
          </Stack>

          {/* Divider */}
          <Box
            sx={{
              height: "2px",
              bgcolor: colors.primary[200],
              mb: 1,
              borderRadius: borderRadius.full,
            }}
          />

          {/* Total Price */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900],
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontWeight: typography.fontWeight.bold,
                color: colors.primary[600],
                fontSize: {
                  xs: typography.fontSize.xl,
                  sm: typography.fontSize["2xl"],
                },
              }}
            >
              ${quote.totalPrice.toFixed(2)}
            </Typography>
          </Stack>
        </PricingBox>

        {/* Delivery Time Badge */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacing[3],
            p: spacing[3],
            bgcolor: colors.neutral[50],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.neutral[200]}`,
            mb: spacing[3],
          }}
        >
          {/* Icon Container */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: borderRadius.md,
              bgcolor: colors.warning[100],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Schedule sx={{ fontSize: 20, color: colors.warning[700] }} />
          </Box>

          {/* Delivery Info */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: colors.neutral[600],
                fontSize: typography.fontSize.xs,
                mb: 0,
              }}
            >
              Estimated Delivery
            </Typography>
            <Typography
              sx={{
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral[900],
                fontSize: typography.fontSize.base,
              }}
            >
              {quote.estimatedDays} {quote.estimatedDays === 1 ? "day" : "days"}
            </Typography>
          </Box>
        </Box>

        {/* Features List */}
        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="body2"
            fontWeight={typography.fontWeight.semibold}
            gutterBottom
            sx={{
              color: colors.neutral[900],
              mb: spacing[2],
            }}
          >
            ✨ Included Features
          </Typography>

          <List dense disablePadding>
            {quote.features.map((feature, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  mb: spacing[1],
                  "&:last-child": { mb: 0 },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircle
                    fontSize="small"
                    sx={{ color: colors.secondary[500] }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: {
                      color: colors.neutral[700],
                      fontSize: typography.fontSize.sm,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </BrandCard>
  );
};
