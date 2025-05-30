import { IDashboardChartLabels, IDashboardChartTimeRange } from "@/types";
import { DashboardChartTimeRangeEnum } from "@/enums";

export const DASHBOARD_CHART_TIME_RANGE_OPTIONS: IDashboardChartTimeRange[] = [
  { label: "Weekly", value: DashboardChartTimeRangeEnum.WEEKLY },
  { label: "Monthly", value: DashboardChartTimeRangeEnum.MONTHLY },
];

export const DASHBOARD_CHART_LABELS: IDashboardChartLabels = {
  [DashboardChartTimeRangeEnum.MONTHLY]: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  [DashboardChartTimeRangeEnum.WEEKLY]: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],
};
