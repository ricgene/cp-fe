import { IAlert, IEvent, IMerchantRequest, IOffer, IUser } from "@/types";

// (don't change the order of the columns)
export const OFFER_TABLE_COLUMNS: {
  key: keyof IOffer | "type";
  label: string;
}[] = [
  { key: "name", label: "Offer Name" },
  { key: "productName", label: "Product" },
  { key: "productCategory", label: "Category" },
  { key: "description", label: "Description" },
  { key: "type", label: "Type" },
  { key: "offerType", label: "Offer Type" },
  { key: "discountRate", label: "Discount" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "pointsPerPurchase", label: "Points per purchase" },
  { key: "image", label: "Image" },
  // { key: "status", label: "Status" },
];

// (don't change the order of the columns)
export const REGISTERED_USERS_TABLE_COLUMNS: {
  key: keyof IUser | "type";
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "publicId", label: "User ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone No." },
  { key: "dob", label: "Date of Birth" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
];

// (don't change the order of the columns)
export const EVENTS_TABLE_COLUMNS: {
  key: keyof IEvent | "type";
  label: string;
}[] = [
  { key: "name", label: "Event Name" },
  { key: "address", label: "Location" },
  { key: "details", label: "Event Details" },
  { key: "startDate", label: "Start Date & Time" },
  { key: "endDate", label: "End Date & Time" },
  { key: "image", label: "Venue Image" },
];

// (don't change the order of the columns)
export const ALERTS_TABLE_COLUMNS: {
  key: keyof IAlert | "type";
  label: string;
}[] = [
  { key: "title", label: "Alert Title" },
  { key: "type", label: "Alert Type" },
  { key: "precautions", label: "Precautions" },
];

// (don't change the order of the columns)
export const REQUESTS_TABLE_COLUMNS: {
  key: keyof IMerchantRequest;
  label: string;
}[] = [
  { key: "name", label: "Name of Merchant" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone No." },
  { key: "businessName", label: "Business Name" },
  { key: "businessType", label: "Business Type" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "address", label: "Address" },
  { key: "type", label: "Request Type" },
];

// (don't change the order of the columns)
export const REVOKED_REQUESTS_TABLE_COLUMNS: {
  key: keyof IMerchantRequest;
  label: string;
}[] = [
  ...REQUESTS_TABLE_COLUMNS,
  { key: "reason", label: "Reason for Revocation" },
];
