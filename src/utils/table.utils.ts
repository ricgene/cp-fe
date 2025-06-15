import { IOffer, IUser } from "@/types";

const dateOptions = {
  day: "2-digit" as const,
  month: "short" as const,
  year: "numeric" as const,
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
    endDate: new Date(offer.endDate).toLocaleDateString("en-GB", dateOptions),
    startDate: new Date(offer.startDate).toLocaleDateString(
      "en-GB",
      dateOptions
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
