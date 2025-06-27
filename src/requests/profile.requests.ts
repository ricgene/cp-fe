import { api } from "@/libs";

// Interfaces
interface GeneralProfileUpdateData {
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  callingCode: string;
}

interface BusinessAddressUpdateData {
  businessName?: string;
  businessType?: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

interface PasswordUpdateData {
  oldPassword: string;
  password: string;
}

// ENDPOINT URLS
const profileUpdateUrl = "/user/web/profile";
const businessAddressUpdateUrl = "/user/web/business-address";
const passwordUpdateUrl = "/user/me/update-password";

// REQUESTS
export const updateProfile = (data: FormData | GeneralProfileUpdateData) =>
  api.patch(profileUpdateUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBusinessAddress = (data: BusinessAddressUpdateData) =>
  api.patch(businessAddressUpdateUrl, data);

export const updatePassword = (data: PasswordUpdateData) =>
  api.patch(passwordUpdateUrl, data);
