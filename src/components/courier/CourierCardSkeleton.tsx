import React from "react";
import { CardContent, Box, Skeleton, Stack } from "@mui/material";
import { BrandCard } from "../common/BrandCard";
import { useDesignTokens } from "../../hooks/useDesignTokens";

export const CourierCardSkeleton: React.FC = () => {
  const { spacing, borderRadius } = useDesignTokens();

  return (
    <BrandCard
      sx={{
        height: "100%",
        p: { xs: spacing[4], sm: spacing[5] },
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        {/* Header Skeleton */}
        <Box sx={{ display: "flex", alignItems: "center", mb: spacing[6] }}>
          <Skeleton
            variant="rounded"
            width={56}
            height={56}
            sx={{ mr: spacing[4], borderRadius: borderRadius.md }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>

        {/* Pricing Box Skeleton */}
        <Box
          sx={{
            bgcolor: "grey.100",
            borderRadius: borderRadius.lg,
            p: spacing[4],
            mb: spacing[5],
          }}
        >
          <Stack spacing={1}>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={2}
              sx={{ my: 1 }}
            />
            <Skeleton variant="text" width="100%" height={32} />
          </Stack>
        </Box>

        {/* Delivery Time Skeleton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacing[3],
            p: spacing[3],
            bgcolor: "grey.50",
            borderRadius: borderRadius.md,
            mb: spacing[5],
          }}
        >
          <Skeleton variant="rounded" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>

        {/* Features Skeleton */}
        <Box>
          <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="75%" />
          </Stack>
        </Box>
      </CardContent>
    </BrandCard>
  );
};
