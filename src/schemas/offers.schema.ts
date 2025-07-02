import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/constants";
import { z } from "zod";
import { DateTime } from "luxon";

// Offer Base Schema
const offerBaseSchema = z.object({
  name: z.string().min(1, "Offer Name is required"),
  productName: z.string().min(1, "Product Name is required"),
  productCategory: z
    .string({ message: "Product Category is required" })
    .min(1, "Product Category is required"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description is required"),
  discountRate: z
    .number({ message: "Discount Rate is required" })
    .min(0, "Discount rate cannot be negative")
    .max(100, "Discount rate must be between 0 and 100")
    .default(0),
  pointsPerPurchase: z
    .number()
    .min(0, "Points per purchase cannot be negative")
    .max(2147483647, "Points per purchase is too large")
    .default(0),
  startDate: z
    .string({ required_error: "Start Date is required" })
    .min(1, "Start Date is required"),
  endDate: z
    .string({ required_error: "End Date is required" })
    .min(1, "End Date is required"),
  isPerk: z.boolean().default(false),
  offerType: z.string(),
  image: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Image is required",
    })
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine(
      (files) => {
        if (!files?.[0]) return false;
        return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
      },
      { message: "Only images are allowed" }
    )
    .refine(
      (files) => {
        if (!files?.[0]) return true;
        return files[0].size <= MAX_FILE_SIZE; // 5MB in bytes
      },
      { message: "Image size must be less than 5MB" }
    )
    .refine(
      (files) => {
        if (!files?.[0]) return true;
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const ratio = img.width / img.height;
            resolve(Math.abs(ratio - 1.78) < 0.01); // Allow for small floating point differences
          };
          img.onerror = () => resolve(false);
          img.src = URL.createObjectURL(files[0]);
        });
      },
      { message: "Image must have an aspect ratio of 16:9 (width:height)" }
    )
    .optional(),
});

// Offer Create Form Schema with date refinements
export const offerCreateSchema = offerBaseSchema
  .refine(
    (data) => {
      // Check startDate is today or in the future using Luxon
      const today = DateTime.now().startOf("day");
      const start = DateTime.fromISO(data.startDate).startOf("day");
      return start >= today;
    },
    {
      message: "Start date must be today or in the future",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      // Check startDate is before endDate using Luxon
      const start = DateTime.fromISO(data.startDate).startOf("day");
      const end = DateTime.fromISO(data.endDate).endOf("day");
      return start <= end;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      // Check endDate is after or equal to startDate using Luxon
      const start = DateTime.fromISO(data.startDate).startOf("day");
      const end = DateTime.fromISO(data.endDate).endOf("day");
      return end >= start;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      // If isPerk is true, pointsPerPurchase must be > 0
      if (data.isPerk) {
        return data.pointsPerPurchase > 0;
      }
      return true;
    },
    {
      message: "Points per purchase cannot be 0 for perks.",
      path: ["pointsPerPurchase"],
    }
  )
  .refine(
    (data) => {
      // If isPerk is false, discountRate must be > 0
      if (!data.isPerk) {
        return data.discountRate > 0;
      }
      return true;
    },
    {
      message: "Discount rate cannot be 0 for offers.",
      path: ["discountRate"],
    }
  );
export type OfferCreateFormData = z.infer<typeof offerCreateSchema>;

// Offer Update Form Schema (partial, no refinements)
export const offerUpdateSchema = offerBaseSchema.partial();
export type OfferUpdateFormData = z.infer<typeof offerUpdateSchema>;
