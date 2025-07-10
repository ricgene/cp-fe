import { RequestTypeEnum } from "@/enums";
import {
  IAlert,
  IEvent,
  IMerchantRequest,
  IOffer,
  ISubscriptionsEntry,
  IUser,
  IWaitlistEntry,
} from "@/types";
import { IPointTransaction } from "@/types/point-transaction.types";

const dateOptions = {
  day: "2-digit" as const,
  month: "short" as const,
  year: "numeric" as const,
};

const dateTimeOptions = {
  day: "2-digit" as const,
  month: "short" as const,
  year: "numeric" as const,
  hour: "2-digit" as const,
  minute: "2-digit" as const,
};

export const transformOffersToTableData = (offers: IOffer[]) => {
  return offers.map((offer: IOffer) => ({
    id: offer.id,
    name: offer.name,
    status: offer.status,
    isPerk: offer.isPerk,
    image: offer.image.url,
    productName: offer.productName,
    productCategory: offer.productCategory,
    description: offer.description,
    discountRate: `${offer.discountRate}%`,
    type: offer.isPerk ? "Perk" : "Offer",
    pointsPerPurchase: offer.isPerk ? `${offer.pointsPerPurchase} Points` : "",
    endDate: new Date(offer.endDate).toLocaleDateString(
      "en-GB",
      dateTimeOptions
    ),
    startDate: new Date(offer.startDate).toLocaleDateString(
      "en-GB",
      dateTimeOptions
    ),
    offerType: offer.offerType,
  }));
};

export const transformRegisteredUsersToTableData = (users: IUser[]) => {
  return users.map((user: IUser) => ({
    id: user.publicId,
    name: user.name,
    publicId: user.publicId,
    email: user.email,
    phone: `${user.callingCode}${user.phone}`,
    dob: user.dob
      ? new Date(user.dob).toLocaleDateString("en-GB", dateOptions)
      : "",
    city: user.city,
    state: user.state,
  }));
};

export const transformEventsToTableData = (events: IEvent[]) => {
  return events.map((event: IEvent) => ({
    id: event.id,
    name: event.name,
    image: event.image.url,
    details: event.details,
    startDate: new Date(event.startDate).toLocaleDateString(
      "en-GB",
      dateTimeOptions
    ),
    endDate: new Date(event.endDate).toLocaleDateString(
      "en-GB",
      dateTimeOptions
    ),
    address: event.address.address,
  }));
};

export const transformAlertsToTableData = (alerts: IAlert[]) => {
  return alerts.map((alert: IAlert) => ({
    id: alert.id,
    type: alert.type?.toLowerCase(),
    title: alert.title,
    precautions: alert.precautions,
    createdAt: new Date(alert.createdAt).toLocaleDateString(
      "en-US",
      dateTimeOptions
    ),
  }));
};

export const transformRequestsToTableData = (requests: IMerchantRequest[]) => {
  return requests.map((request: IMerchantRequest) => ({
    id: request.id,
    type:
      request.type === RequestTypeEnum.MERCHANT_UPDATE_REQUEST
        ? "Update Request"
        : "Registration Request",
    name: request.name,
    email: request.email,
    phone: `${request.callingCode}${request.phone}`,
    businessName: request.businessName,
    businessType: request.businessType,
    state: request.state,
    city: request.city,
    address: request.address,
    reason: request.reason || "",
  }));
};

export const transformPointTransactionsToTableData = (
  transactions: IPointTransaction[]
) => {
  return transactions.map((request) => ({
    id: request.id,
    name: request.name,
    publicId: request.publicId,
    points: `${request.points} Points`,
    createdAt: new Date(request.createdAt).toLocaleDateString(
      "en-US",
      dateTimeOptions
    ),
    reason: request.reason,
  }));
};

export const transformWaitlistToTableData = (waitlist: IWaitlistEntry[]) => {
  return waitlist.map((request) => ({
    id: request.id,
    email: request.email,
    createdAt: new Date(request.createdAt).toLocaleDateString(
      "en-US",
      dateTimeOptions
    ),
    isEmailSent: request.isEmailSent ? "Yes" : "No",
  }));
};

export const transformNewsletterToTableData = (
  waitlist: ISubscriptionsEntry[]
) => {
  return waitlist.map((request) => ({
    id: request.id,
    email: request.email,
    createdAt: new Date(request.createdAt).toLocaleDateString(
      "en-US",
      dateTimeOptions
    ),
  }));
};
