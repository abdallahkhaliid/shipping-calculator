// src/services/mockCourierAPI.ts
// src/services/mockCourierAPI.ts
import type { CourierQuote, ShippingFormData } from "../types";

const COURIER_LOGOS = {
  dhl: "https://hatstore.imgix.net/DHLEXPRESS.jpg",
  fedex:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF36tLpWEhwwk56thJcg9iuEeFjot7-CiOqQ&s",
  ups: "https://i.etsystatic.com/6241544/r/il/89a836/3532067948/il_570xN.3532067948_lu3r.jpg",
  usps: "https://20068459.fs1.hubspotusercontent-na1.net/hubfs/20068459/app-usps.png",
  aramex:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Aramex_Logo.svg/200px-Aramex_Logo.svg.png",
};

/**
 * Simulates fetching courier quotes from multiple providers
 * In production, this would call actual courier APIs
 */
export const fetchCourierQuotes = async (
  formData: ShippingFormData,
): Promise<CourierQuote[]> => {
  // Simulate network delay (1.5-2.5 seconds)
  await new Promise((resolve) =>
    setTimeout(resolve, 1500 + Math.random() * 1000),
  );

  const { package: pkg, isInternational } = formData;

  // Calculate base distance factor
  const baseDistance = isInternational ? 5000 : 500;
  const weightFactor = pkg.weight;

  // Simulate volume-based pricing if dimensions provided
  const volumeFactor =
    pkg.length && pkg.width && pkg.height
      ? (pkg.length * pkg.width * pkg.height) / 1000
      : 0;

  // Generate realistic quotes
  const quotes: CourierQuote[] = [
    {
      id: "dhl-express",
      courierName: "DHL Express",
      courierLogo: COURIER_LOGOS.dhl,
      basePrice:
        (baseDistance * 0.15 + weightFactor * 5 + volumeFactor * 2) *
        (isInternational ? 2 : 1),
      tax: 0,
      totalPrice: 0,
      currency: "USD",
      estimatedDays: isInternational ? 3 : 1,
      serviceType: "express",
      features: [
        "Real-time tracking",
        "Insurance included",
        "Signature required",
        "Priority handling",
      ],
    },
    {
      id: "fedex-priority",
      courierName: "FedEx Priority",
      courierLogo: COURIER_LOGOS.fedex,
      basePrice:
        (baseDistance * 0.12 + weightFactor * 4.5 + volumeFactor * 1.8) *
        (isInternational ? 1.8 : 1),
      tax: 0,
      totalPrice: 0,
      currency: "USD",
      estimatedDays: isInternational ? 4 : 2,
      serviceType: "express",
      features: ["Package protection", "Tracking", "Money-back guarantee"],
    },
    {
      id: "ups-ground",
      courierName: "UPS Ground",
      courierLogo: COURIER_LOGOS.ups,
      basePrice:
        (baseDistance * 0.03 + weightFactor * 1.2 + volumeFactor * 0.5) *
        (isInternational ? 1.2 : 1),
      tax: 0,
      totalPrice: 0,
      currency: "USD",
      estimatedDays: isInternational ? 7 : 5,
      serviceType: "standard",
      features: ["Basic tracking", "Reliable delivery", "Carbon neutral"],
    },
  ];

  // Add USPS for domestic shipments (US only)
  if (!isInternational && formData.origin.country === "US") {
    quotes.push({
      id: "usps-priority",
      courierName: "USPS Priority Mail",
      courierLogo: COURIER_LOGOS.usps,
      basePrice: baseDistance * 0.06 + weightFactor * 2.5 + volumeFactor * 1,
      tax: 0,
      totalPrice: 0,
      currency: "USD",
      estimatedDays: 3,
      serviceType: "standard",
      features: ["Affordable", "Nationwide coverage", "Free tracking"],
    });
  }

  // Add Aramex for international (Middle East focused)
  if (isInternational) {
    quotes.push({
      id: "aramex-international",
      courierName: "Aramex International",
      courierLogo: COURIER_LOGOS.aramex,
      basePrice: baseDistance * 0.1 + weightFactor * 4 + volumeFactor * 1.5,
      tax: 0,
      totalPrice: 0,
      currency: "USD",
      estimatedDays: 6,
      serviceType: "standard",
      features: ["Global network", "Customs clearance", "Door-to-door"],
    });
  }

  // Calculate tax (10%) and total price
  const quotesWithTax = quotes.map((quote) => ({
    ...quote,
    tax: parseFloat((quote.basePrice * 0.1).toFixed(2)),
    totalPrice: parseFloat((quote.basePrice * 1.1).toFixed(2)),
  }));

  // Sort by price (cheapest first)
  return quotesWithTax.sort((a, b) => a.totalPrice - b.totalPrice);
};

/**
 * Simulates an API error for testing
 * Randomly fails 10% of the time in development
 */
export const fetchCourierQuotesWithError = async (
  formData: ShippingFormData,
): Promise<CourierQuote[]> => {
  if (Math.random() < 0.1) {
    throw new Error("DHL API temporarily unavailable. Please try again.");
  }
  return fetchCourierQuotes(formData);
};
