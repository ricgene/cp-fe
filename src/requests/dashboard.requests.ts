import { api } from "@/libs";
import { IDashboardChartData } from "@/types";

// ENDPOINT URLS
const dashboardDataUrl = "point-transactions/dashboard-data";

export const getDashboardData = async () => {
  return await api.get<IDashboardChartData>(dashboardDataUrl);
};
