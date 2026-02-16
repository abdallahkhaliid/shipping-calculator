import { z } from "zod";

const COUNTRY_CODES = ["SA", "EG", "US"] as const;

export const addressSchema = z.object({
  street: z.string().trim().optional(),
  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name cannot exceed 50 characters")
    .regex(/^(?!\d+$).+$/, "City name cannot be only numbers"),
  state: z
    .string()
    .trim()
    .regex(/^(?!\d+$).+$/, "State name cannot be only numbers")
    .optional()
    .or(z.literal("")),
  country: z.enum(COUNTRY_CODES, {
    message: "Please select a supported country",
  }),
  postalCode: z
    .string()
    .trim()
    .min(3, "Postal code must be at least 3 characters")
    .max(10, "Postal code cannot exceed 10 characters"),
});

const numericValidation = (fieldName: string) =>
  z
    .union([z.number(), z.string()])
    .refine((val) => val !== "", `${fieldName} is required`)
    .transform((val) => (typeof val === "string" ? val : String(val)))
    .refine(
      (val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val),
      `${fieldName} cannot have leading zeros unless it's a decimal (e.g., 0.5)`,
    )
    .transform(Number);

const optionalNumericValidation = (fieldName: string) =>
  z
    .union([z.number(), z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return typeof val === "string" ? val : String(val);
    })
    .refine(
      (val) => val === undefined || /^(0|[1-9]\d*)(\.\d+)?$/.test(val),
      `${fieldName} cannot have leading zeros unless it's a decimal (e.g., 0.5)`,
    )
    .transform((val) => (val === undefined ? undefined : Number(val)))
    .optional();

export const packageSchema = z.object({
  weight: numericValidation("Weight")
    .pipe(z.number().min(0.1, "Minimum weight is 0.1"))
    .pipe(z.number().max(1000, "Maximum weight is 1000")),
  length: optionalNumericValidation("Length")
    .pipe(z.number().positive("Length must be greater than 0").optional())
    .optional(),
  width: optionalNumericValidation("Width")
    .pipe(z.number().positive("Width must be greater than 0").optional())
    .optional(),
  height: optionalNumericValidation("Height")
    .pipe(z.number().positive("Height must be greater than 0").optional())
    .optional(),
  unit: z.enum(["kg", "lb"], {
    message: "Please select a valid unit",
  }),
});

export const shippingFormSchema = z
  .object({
    origin: addressSchema,
    destination: addressSchema,
    package: packageSchema,
    isInternational: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isInternational) {
        return data.origin.country !== data.destination.country;
      }
      return true;
    },
    {
      message:
        "International shipping requires different origin and destination countries",
      path: ["isInternational"],
    },
  );

export type AddressFormData = z.infer<typeof addressSchema>;
export type PackageFormInput = z.input<typeof packageSchema>;
export type PackageFormData = z.infer<typeof packageSchema>;

export const COUNTRIES = [
  { code: "SA", name: "Saudi Arabia" },
  { code: "EG", name: "Egypt" },
  { code: "US", name: "United States" },
] as const;
