import React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { useQuote } from "../../hooks/useQuote";
import { OriginStep } from "./OriginStep";
import { DestinationStep } from "./DestinationStep";
import { PackageStep } from "./PackageStep";
import { BrandCard } from "../common/BrandCard";
import { useDesignTokens } from "../../hooks/useDesignTokens";

const steps = ["Origin", "Destination", "Package"];

export const FormProgress: React.FC = () => {
  const { currentStep } = useQuote();
  const { spacing } = useDesignTokens();

  const activeStepIndex = steps.findIndex(
    (step) => step.toLowerCase() === currentStep,
  );

  return (
    <BrandCard sx={{ p: { xs: spacing[6], sm: spacing[8] } }}>
      <Stepper
        activeStep={activeStepIndex}
        sx={{
          mb: spacing[8],
          "& .MuiStepLabel-label": {
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            fontWeight: 500,
            mt: 1,
          },
          "& .MuiStepIcon-root": {
            width: { xs: 24, sm: 32 },
            height: { xs: 24, sm: 32 },
          },
          "& .MuiStepConnector-line": {
            minHeight: "1px",
          },
          "& .MuiStepConnector-root": {
            top: { xs: 12, sm: 16 },
            left: { xs: "calc(-50% + 12px)", sm: "calc(-50% + 16px)" },
            right: { xs: "calc(50% + 12px)", sm: "calc(50% + 16px)" },
          },
        }}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {currentStep === "origin" && <OriginStep />}
        {currentStep === "destination" && <DestinationStep />}
        {currentStep === "package" && <PackageStep />}
      </Box>
    </BrandCard>
  );
};
