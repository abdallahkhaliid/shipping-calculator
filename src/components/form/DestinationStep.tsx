import React, { useEffect } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  Public,
  WhereToVote,
} from "@mui/icons-material";
import {
  addressSchema,
  type AddressFormData,
  COUNTRIES,
} from "../../utils/validators";
import { useQuote } from "../../hooks/useQuote";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { CTAButton } from "../common/CTAButton";
import { SecondaryButton } from "../common/SecondaryButton";
import { useDebounce } from "../../hooks/useDebounce";

export const DestinationStep: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useQuote();
  const { colors, spacing } = useDesignTokens();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.destination || {
      city: "",
      country: "US",
      postalCode: "",
    },
  });

  const watchedCity = useWatch({ control, name: "city" });
  const watchedPostalCode = useWatch({ control, name: "postalCode" });

  const debouncedCity = useDebounce(watchedCity, 500);
  const debouncedPostalCode = useDebounce(watchedPostalCode, 500);

  useEffect(() => {
    if (debouncedCity || debouncedPostalCode) {
      // Logic for address suggestions could go here
    }
  }, [debouncedCity, debouncedPostalCode]);

  const destinationCountry = useWatch({ control, name: "country" });
  const isInternational =
    formData.origin && formData.origin.country !== destinationCountry;

  const onSubmit: SubmitHandler<AddressFormData> = (data) => {
    updateFormData("destination", data);
    setCurrentStep("package");
  };

  return (
    <Box>
      <Box
        sx={{
          mb: spacing[4],
          fontWeight: 600,
          color: colors.neutral[900],
          display: "flex",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <WhereToVote />
        <Typography variant="h6">Where are you shipping to?</Typography>
      </Box>

      {isInternational && (
        <Alert severity="info" icon={<Public />} sx={{ mb: spacing[6] }}>
          International shipping detected: {formData.origin?.country} →{" "}
          {destinationCountry}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={24}>
          {/* Same fields as OriginStep */}
          <Grid size={12}>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street Address (Optional)"
                  fullWidth
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  required
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  fullWidth
                  required
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State/Province (Optional)"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  fullWidth
                  required
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {COUNTRIES.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 1, sm: 2 } }}>
            <CTAButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              fullWidth
            >
              Continue to Package
            </CTAButton>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 2, sm: 1 } }}>
            <SecondaryButton
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              fullWidth
              onClick={() => setCurrentStep("origin")}
            >
              Back
            </SecondaryButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
