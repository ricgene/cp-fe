import { IMedia } from "@/types";
import { RoleEnum } from "@/enums";

// TYPES
export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];

// INTERFACES
export interface IUser {
  dob: Date;
  name: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  points: number;
  createdAt: Date;
  publicId: string;
  address?: string;
  lastName: string;
  firstName: string;
  fcmToken?: string;
  countryCode: string;
  callingCode: string;
  businessName?: string;
  businessType?: string;
  isEmailVerified: boolean;
  isAdminApproved?: boolean;
  image: IMedia; // media
  role: RoleType; // role
  latitude?: number;
  longitude?: number;
}
