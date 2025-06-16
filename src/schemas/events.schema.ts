import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

// Event Create Form Schema
export const eventCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  details: z.string().min(1, "Details are required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  address: z.string().min(1, "Address is required"),
  // hidden fields
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  latitude: z.number({ message: "Latitude is required" }),
  longitude: z.number({ message: "Longitude is required" }),
  // image
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
    ),
});

export type EventCreateFormData = z.infer<typeof eventCreateSchema>;
