import { api } from "@/libs";

// REQUEST INTERFACES
interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  password: string;
}

// ENDPOINT URLS
const forgotPasswordUrl = "/recovery/merchant/forgot-password";
const resetPasswordUrl = "/recovery/merchant/reset-password"; // use with /:token
const resendPasswordResetUrl = "/recovery/merchant/resend-password-token";

// REQUESTS
export const forgotPassword = (data: ForgotPasswordRequest) =>
  api.post(forgotPasswordUrl, data);

export const resetPassword = (data: ResetPasswordRequest) =>
  api.post(`${resetPasswordUrl}/${data.token}`, { password: data.password });

export const resendPasswordReset = (data: ForgotPasswordRequest) =>
  api.post(resendPasswordResetUrl, data);
