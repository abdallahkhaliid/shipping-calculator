import React, { useState, type ReactNode } from "react";
import { QuoteContext } from "./QuoteContext";
import {
  type QuoteContextType,
  type ShippingFormData,
  type CourierQuote,
  type FormStep,
  type Address,
} from "../types";

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<Partial<ShippingFormData>>({});
  const [quotes, setQuotes] = useState<CourierQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("origin");

  const updateFormData = <K extends FormStep>(
    step: K,
    data: ShippingFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
      isInternational:
        step === "destination" && prev.origin
          ? prev.origin.country !== (data as Address).country
          : prev.isInternational,
    }));
  };

  const value: QuoteContextType = {
    formData,
    updateFormData,
    quotes,
    setQuotes,
    isLoading,
    setIsLoading,
    hasSearched,
    setHasSearched,
    currentStep,
    setCurrentStep,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};
