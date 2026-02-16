import React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Search, ArrowBack, Public, Scale } from "@mui/icons-material";
import {
  packageSchema,
  type PackageFormData,
  type PackageFormInput,
} from "../../utils/validators";
import { useQuote } from "../../hooks/useQuote";
import { type ShippingFormData } from "../../types";
import { fetchCourierQuotes } from "../../services/mockCourierAPI";
import { CTAButton } from "../common/CTAButton";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { SecondaryButton } from "../common/SecondaryButton";
import { useDebounce } from "../../hooks/useDebounce";

export const PackageStep: React.FC = () => {
  const {
    formData,
    updateFormData,
    setCurrentStep,
    setQuotes,
    setIsLoading,
    isLoading,
    setHasSearched,
  } = useQuote();
  const { colors, spacing } = useDesignTokens();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PackageFormInput>({
    resolver: zodResolver(packageSchema),
    defaultValues: formData.package || {
      weight: 1,
      unit: "kg",
    },
  });

  const watchedWeight = useWatch({ control, name: "weight" });
  const debouncedWeight = useDebounce(watchedWeight, 500);

  // Example of using debounced value (e.g. for pre-calculating or logging)
  React.useEffect(() => {
    if (debouncedWeight) {
      console.log("Debounced weight changed:", debouncedWeight);
    }
  }, [debouncedWeight]);

  const onSubmit = async (values: PackageFormInput) => {
    const data = values as unknown as PackageFormData;
    updateFormData("package", data);
    setHasSearched(true);
    setIsLoading(true);

    try {
      const quotes = await fetchCourierQuotes({
        ...formData,
        package: data,
      } as ShippingFormData);
      setQuotes(quotes);

      // Scroll to results on mobile/desktop after a small delay to allow for rendering
      setTimeout(() => {
        const resultsElement = document.getElementById("courier-results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
      alert("Failed to fetch courier quotes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: spacing[2], fontWeight: 600 }}
      >
        📦 Package Details
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: spacing[6] }}
      >
        Enter the weight and dimensions to get accurate shipping quotes
      </Typography>
      {formData.isInternational && (
        <Alert severity="info" icon={<Public />} sx={{ mb: spacing[6] }}>
          International shipping: {formData.origin?.country} →{" "}
          {formData.destination?.country}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={24}>
          {/* Weight */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Weight"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <Scale sx={{ mr: 1, color: colors.neutral[400] }} />
                    ),
                  }}
                  inputProps={{ step: 0.1, min: 0.1, max: 1000 }}
                  error={!!errors.weight}
                  helperText={
                    (errors.weight?.message as React.ReactNode) ||
                    "Minimum: 0.1, Maximum: 1000"
                  }
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Unit" fullWidth required>
                  <MenuItem value="kg">Kilograms (kg)</MenuItem>
                  <MenuItem value="lb">Pounds (lb)</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Dimensions (Optional) */}
          <Grid size={12}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Dimensions (Optional)
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="length"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Length (cm)"
                  fullWidth
                  inputProps={{ step: 0.1, min: 0 }}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="width"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Width (cm)"
                  fullWidth
                  inputProps={{ step: 0.1, min: 0 }}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Height (cm)"
                  fullWidth
                  inputProps={{ step: 0.1, min: 0 }}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 1, sm: 2 } }}>
            <CTAButton
              type="submit"
              variant="contained"
              size="large"
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Search />
                )
              }
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Finding Quotes..." : "Get Quotes"}
            </CTAButton>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 2, sm: 1 } }}>
            <SecondaryButton
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              fullWidth
              onClick={() => setCurrentStep("destination")}
              disabled={isLoading}
            >
              Back
            </SecondaryButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
