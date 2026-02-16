export type CountryCode = "SA" | "EG" | "US";
export type WeightUnit = "kg" | "lb";

// Location types
export interface Address {
  street?: string;
  city: string;
  state?: string;
  country: CountryCode;
  postalCode: string;
}

// Package types
export interface PackageDimensions {
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  unit: WeightUnit;
}

// Courier types
export interface CourierQuote {
  id: string;
  courierName: string;
  courierLogo: string;
  basePrice: number;
  tax: number;
  totalPrice: number;
  currency: string;
  estimatedDays: number;
  serviceType: "standard" | "express" | "overnight";
  features: string[];
}

// Form types
export interface ShippingFormData {
  origin: Address;
  destination: Address;
  package: PackageDimensions;
  isInternational: boolean;
}

// Form step types
export type FormStep = "origin" | "destination" | "package";

// Quote context types
export interface QuoteContextType {
  formData: Partial<ShippingFormData>;
  updateFormData: <K extends FormStep>(
    step: K,
    data: ShippingFormData[K],
  ) => void;
  quotes: CourierQuote[];
  setQuotes: (quotes: CourierQuote[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasSearched: boolean;
  setHasSearched: (searched: boolean) => void;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
}
