import Dashboard from "@/components/pages/dashboard/dashboard";
import { RoleEnum } from "@/enums";
import { getServerSession } from "@/requests/server-session.requests";

export default async function DashboardPage() {
  const data = await getServerSession();
  return <Dashboard forAdmin={data?.role === RoleEnum.ADMIN} />;
}
