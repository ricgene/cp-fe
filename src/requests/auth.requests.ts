import { api } from "@/libs";

// REQUEST INTERFACES
interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  city: string;
  email: string;
  phone: string;
  address: string;
  lastName: string;
  password: string;
  latitude: number;
  longitude: number;
  firstName: string;
  middleName?: string;
  countryCode: string;
  callingCode: string;
  businessName: string;
  businessType: string;
}

// ENDPOINT URLS
const loginUrl = "/auth/merchant/login";
const logoutUrl = "/auth/merchant/logout";
const signupUrl = "/auth/merchant/signup";
const refreshUrl = "/auth/merchant/refresh-token";
const verifyUrl = "/auth/merchant/verify-email-token"; // use with /:token
const resendUrl = "/auth/merchant/resend-email-token";
// REQUESTS
export const login = (data: LoginRequest) => api.post(loginUrl, data);

export const signup = (data: SignupRequest) => api.post(signupUrl, data);

export const logout = () => api.get(logoutUrl);

export const verifyEmailToken = (token: string) =>
  api.get(`${verifyUrl}/${token}`);

export const resendVerificationEmail = (email: string) =>
  api.post(resendUrl, { email });

export const refreshToken = () => api.get(refreshUrl);
