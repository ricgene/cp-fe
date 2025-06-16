import { RoleEnum } from "@/enums";
import { RegisteredUsers } from "@/components/pages/registered-users";

export default function RegisteredMerchantsPage() {
  return <RegisteredUsers role={RoleEnum.MERCHANT} />;
}
