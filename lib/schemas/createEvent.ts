import { z } from "zod";

export const venueValues = ["in-person", "virtual", "hybrid"] as const;
export const pricingValues = ["free", "paid"] as const;
export const tokenCurrencyValues = ["XLM", "USDC"] as const;
export const refundDeadlineValues = ["7d", "48h", "24h", "none"] as const;

export type VenueEnvironment = (typeof venueValues)[number];
export type PricingModel = (typeof pricingValues)[number];
export type TokenCurrency = (typeof tokenCurrencyValues)[number];
export type RefundDeadline = (typeof refundDeadlineValues)[number];

function isValidDate(value: string) {
  return !Number.isNaN(Date.parse(value));
}

const dateTimeField = z
  .string()
  .min(1, "Select a date and time")
  .refine(isValidDate, "Enter a valid date and time");

export const createEventSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Event title is required")
      .max(120, "Keep the title under 120 characters"),
    description: z.string(),
    coverImageName: z.string(),
    coverImageUrl: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || z.url().safeParse(value).success,
        "Enter a valid image URL",
      ),
    startsAt: dateTimeField,
    endsAt: dateTimeField,
    venue: z.enum(venueValues),
    location: z.string().trim().min(1, "Location or stream URL is required"),
    capacity: z.coerce
      .number({ error: "Enter a ticket capacity" })
      .int("Capacity must be a whole number")
      .positive("Capacity must be greater than 0"),
    pricing: z.enum(pricingValues),
    price: z.coerce
      .number({ error: "Enter a valid price" })
      .min(0, "Price cannot be negative"),
    currency: z.enum(tokenCurrencyValues),
    acceptedXlm: z.boolean(),
    acceptedUsdc: z.boolean(),
    selfRefund: z.boolean(),
    refundDeadline: z.enum(refundDeadlineValues),
  })
  .superRefine((values, ctx) => {
    if (
      isValidDate(values.startsAt) &&
      isValidDate(values.endsAt) &&
      Date.parse(values.endsAt) <= Date.parse(values.startsAt)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "End time must be after the start time",
      });
    }

    if (!values.acceptedXlm && !values.acceptedUsdc) {
      ctx.addIssue({
        code: "custom",
        path: ["acceptedXlm"],
        message: "Select at least one accepted asset",
      });
    }
  });

export type CreateEventFormValues = z.input<typeof createEventSchema>;
export type CreateEventPayload = z.output<typeof createEventSchema>;
