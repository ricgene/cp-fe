import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/constants";

//  Profile Image Schema
export const imageUpdateSchema = z.object({
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
    ),
});
export type ImageUpdateFormData = z.infer<typeof imageUpdateSchema>;

// General Tab Schema
export const generalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  countryCode: z.string({ message: "Country Code is required" }),
  callingCode: z.string({ message: "Calling Code is required" }),
});

export type GeneralFormData = z.infer<typeof generalSchema>;

// Business/Address Tab Schema
export const businessAddressSchema = z.object({
  businessType: z.string().min(1, "Business type is required"),
  businessName: z.string().min(1, "Business name is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number({ required_error: "Latitude is required" }),
  longitude: z.number({ required_error: "Longitude is required" }),
});
export type BusinessAddressFormData = z.infer<typeof businessAddressSchema>;

// Security Schema
export const securitySchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Passwords do not match"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Old and New passwords should not be same",
    path: ["newPassword"],
  });
export type SecurityFormData = z.infer<typeof securitySchema>;
