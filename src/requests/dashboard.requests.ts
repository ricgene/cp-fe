import { api } from "@/libs";
import { IDashboardChartData } from "@/types";

// ENDPOINT URLS
const dashboardDataUrl = "dashboard";

export const getDashboardData = async () => {
  return await api.get<IDashboardChartData>(dashboardDataUrl);
};
