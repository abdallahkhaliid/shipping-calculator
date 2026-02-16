import React, { useEffect } from "react";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, MenuItem, Grid, Box, Typography } from "@mui/material";
import { ArrowForward, LocationOn } from "@mui/icons-material";
import {
  addressSchema,
  type AddressFormData,
  COUNTRIES,
} from "../../utils/validators";
import { useQuote } from "../../hooks/useQuote";
import { CTAButton } from "../common/CTAButton";
import { useDesignTokens } from "../../hooks/useDesignTokens";
import { useDebounce } from "../../hooks/useDebounce";

export const OriginStep: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useQuote();
  const { colors, spacing } = useDesignTokens();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.origin || {
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

  const onSubmit: SubmitHandler<AddressFormData> = (data) => {
    updateFormData("origin", data);
    setCurrentStep("destination");
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
        <LocationOn />
        <Typography variant="h6">Where are you shipping from?</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={24}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      transition: "all 0.3s ease",
                    },
                  }}
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

          <Grid size={12}>
            <CTAButton
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              fullWidth
            >
              Continue to Destination
            </CTAButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
