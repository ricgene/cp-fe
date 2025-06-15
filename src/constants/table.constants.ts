import { IOffer, IUser } from "@/types";

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
