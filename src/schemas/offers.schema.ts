import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/constants";
import { z } from "zod";

// Offer Create Form Schema
export const offerCreateSchema = z.object({
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
    .min(0)
    .max(100, "Discount rate must be between 0 and 100")
    .default(0),
  pointsPerPurchase: z
    .number()
    .min(0, "Points must be greater than or equal to 0")
    .default(0),
  startDate: z.string({ required_error: "Start Date is required" }),
  endDate: z.string({ required_error: "End Date is required" }),
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
export type OfferCreateFormData = z.infer<typeof offerCreateSchema>;

// Offer Update Form Schema
export const offerUpdateSchema = offerCreateSchema.partial();
export type OfferUpdateFormData = z.infer<typeof offerUpdateSchema>;
