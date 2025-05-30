import { z } from "zod";

// Register Form Schema
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone Number is required"),
    businessName: z.string().min(1, "Business Name is required"),
    businessType: z.string().min(1, "Business Type is required"),
    address: z.string().min(1, "Address is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    // hidden fields
    latitude: z.number({ message: "Latitude is required" }),
    longitude: z.number({ message: "Longitude is required" }),
    countryCode: z.string({ message: "Country Code is required" }),
    callingCode: z.string({ message: "Calling Code is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterFormData = z.infer<typeof registerSchema>;

// Login Form Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

// Forgot Password Form Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Form Schema
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
