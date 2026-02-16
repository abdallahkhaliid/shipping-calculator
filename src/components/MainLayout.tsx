// src/components/MainLayout.tsx
import React from "react";
import {
  Container,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

import { useQuote } from "../hooks/useQuote";
import { FormProgress } from "./form/FormProgress";
import { SidebarSummary } from "./common/SidebarSummary";
import { CourierResults } from "./courier/CourierResults";
import { useDesignTokens } from "../hooks/useDesignTokens";
import { motion } from "framer-motion";
import { ReviewerDemoControls } from "./common/ReviewerDemoControls";

const MainLayout: React.FC = () => {
  const { quotes, hasSearched, isLoading } = useQuote();

  const { colors, spacing } = useDesignTokens();

  const showResults = hasSearched || isLoading || quotes.length > 0;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.neutral[50] }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          px: 6,
          bgcolor: colors.white,
          borderBottom: `1px solid ${colors.neutral[200]}`,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: spacing[1],
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src="/logo.svg"
                alt="Logo"
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: colors.neutral[900],
                  fontWeight: 700,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Fincart Shipping
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.neutral[600],
                  display: { xs: "none", sm: "block" },
                }}
              >
                Quick Quote Calculator
              </Typography>
            </Box>
          </Box>

          {/* Quote Count Badge */}
          {showResults && (
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              sx={{
                px: "6px",
                py: "2px",
                borderRadius: spacing[1],
                bgcolor: colors.secondary[100],
                border: `1px solid ${colors.secondary[200]}`,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: colors.secondary[800],
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              >
                {quotes.length} {quotes.length === 1 ? "Quote" : "Quotes"}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 32, sm: 48 }, px: 32 }}>
        <Grid sx={{ px: { sm: 16 } }} container spacing={24}>
          {/* Form/Results Section */}
          <Grid
            size={{ xs: 12, sm: showResults ? 8 : 9 }}
            sx={{
              order: { xs: 2, sm: 1 },
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Form */}
              <Box sx={{ mb: showResults ? spacing[8] : 0 }}>
                <FormProgress />
              </Box>

              {/* Results Section (Handles Initial/Loading/Results states) */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CourierResults />
              </Box>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid
            size={{ xs: 12, sm: showResults ? 4 : 3 }}
            sx={{
              order: { xs: 1, sm: 2 },
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SidebarSummary />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: spacing[1],
          borderTop: `1px solid ${colors.neutral[200]}`,
          bgcolor: colors.white,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="body2"
            align="center"
            sx={{ color: colors.neutral[600] }}
          >
            © 2026 Fincart Shipping Calculator. Built with React + TypeScript +
            MUI.
          </Typography>
        </Container>
      </Box>

      {/* Demo Controls for Reviewer */}
      <ReviewerDemoControls />
    </Box>
  );
};

export default MainLayout;
