import { IAlert } from "./alert.types";
import { ChartTypeEnum, DashboardChartTimeRangeEnum } from "@/enums";

//  TYPES
export type DashboardChartTimeRangeType =
  (typeof DashboardChartTimeRangeEnum)[keyof typeof DashboardChartTimeRangeEnum];

export type DashboardChartType =
  (typeof ChartTypeEnum)[keyof typeof ChartTypeEnum];

// INTERFACES
export interface IDashboardChartTimeRange {
  label: string;
  value: DashboardChartTimeRangeType;
}

export interface IDashboardChartData {
  engagementChartData: {
    [DashboardChartTimeRangeEnum.WEEKLY]: number[];
    [DashboardChartTimeRangeEnum.MONTHLY]: number[];
  };
  pointsSpentChartData: {
    [DashboardChartTimeRangeEnum.WEEKLY]: number[];
    data: number[];
    [DashboardChartTimeRangeEnum.MONTHLY]: number[];
  };
  userGrowthChartData: {
    [DashboardChartTimeRangeEnum.WEEKLY]: number[];
    [DashboardChartTimeRangeEnum.MONTHLY]: number[];
  };
  offerPerformanceChartData: {
    [DashboardChartTimeRangeEnum.WEEKLY]: number[];
    [DashboardChartTimeRangeEnum.MONTHLY]: number[];
  };
  alerts: IAlert[];
}

export interface IDashboardChartLabels {
  [DashboardChartTimeRangeEnum.WEEKLY]: string[];
  [DashboardChartTimeRangeEnum.MONTHLY]: string[];
}
