import React from "react";
import { Typography, Box, Chip, Divider, List, ListItem } from "@mui/material";
import {
  LocationOn,
  Inventory,
  Public,
  CheckCircle,
  LocalShipping,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

import { useQuote } from "../../hooks/useQuote";
import { StickySideContainer } from "../common/StickySideContainer";
import { useDesignTokens } from "../../hooks/useDesignTokens";

export const SidebarSummary: React.FC = () => {
  const { formData, quotes } = useQuote();
  const { colors, spacing, borderRadius } = useDesignTokens();

  const hasOrigin = !!formData.origin;
  const hasDestination = !!formData.destination;
  const hasPackage = !!formData.package;

  return (
    <StickySideContainer>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: spacing[2],
          fontWeight: 700,
          color: colors.neutral[900],
          mb: spacing[1],
        }}
      >
        {/* International Badge */}
        {formData.isInternational && (
          <Box sx={{ mt: spacing[0] }}>
            <Chip
              icon={<Public />}
              label="International Shipping"
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}

        {/* Shipment Summary Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: spacing[2],
            width: "100%",
          }}
        >
          <LocalShipping />

          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
            Shipment Summary
          </Typography>
        </Box>
      </Typography>

      <Divider sx={{ mb: spacing[4] }} />

      <List disablePadding>
        {/* Origin */}
        <ListItem
          disablePadding
          sx={{
            mb: spacing[2],
            opacity: hasOrigin ? 1 : 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: spacing[3],
              width: "100%",
            }}
          >
            <LocationOn
              sx={{
                color: hasOrigin ? colors.primary[500] : colors.neutral[400],
                mb: 1,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                Origin
              </Typography>
              {hasOrigin ? (
                <Typography variant="body2" color="text.secondary">
                  {formData.origin!.city}, {formData.origin!.country}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Not set
                </Typography>
              )}
            </Box>
            {hasOrigin && <CheckCircle fontSize="small" color="success" />}
          </Box>
        </ListItem>

        {/* Destination */}
        <ListItem
          disablePadding
          sx={{
            mb: spacing[2],
            opacity: hasDestination ? 1 : 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: spacing[3],
              width: "100%",
            }}
          >
            <LocationOn
              sx={{
                color: hasDestination
                  ? colors.secondary[500]
                  : colors.neutral[400],
                mt: 2,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                Destination
              </Typography>
              {hasDestination ? (
                <Typography variant="body2" color="text.secondary">
                  {formData.destination!.city}, {formData.destination!.country}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Not set
                </Typography>
              )}
            </Box>
            {hasDestination && <CheckCircle fontSize="small" color="success" />}
          </Box>
        </ListItem>

        {/* Package */}
        <ListItem
          disablePadding
          sx={{
            mb: spacing[2],
            opacity: hasPackage ? 1 : 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: spacing[3],
              width: "100%",
            }}
          >
            <Inventory
              sx={{
                color: hasPackage ? colors.warning[500] : colors.neutral[400],
                mt: 2,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                Package
              </Typography>
              {hasPackage ? (
                <Typography variant="body2" color="text.secondary">
                  {formData.package!.weight} {formData.package!.unit}
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Not set
                </Typography>
              )}
            </Box>
            {hasPackage && <CheckCircle fontSize="small" color="success" />}
          </Box>
        </ListItem>
      </List>

      {/* Quotes Count */}
      {quotes.length > 0 && (
        <Box
          sx={{
            p: spacing[2],
            bgcolor: colors.secondary[50],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.secondary[200]}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: spacing[2],
            }}
          >
            <CheckCircleOutlineOutlined />
            <Typography
              sx={{
                marginBottom: "2px",
              }}
              variant="body2"
              fontWeight={600}
              color={colors.secondary[900]}
            >
              Found {quotes.length} courier{quotes.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>
      )}
    </StickySideContainer>
  );
};
