"use client";

import React, { useEffect, useState } from "react";
import { handleError } from "@/utils";
import { IChartSeries, IDashboardChartData } from "@/types";
import { getDashboardData } from "@/requests/dashboard.requests";
import ActiveOffers from "@/components/pages/offers/activeOffers";
import { ChartTypeEnum, DashboardChartTimeRangeEnum } from "@/enums";
import ChartCard from "@/components/pages/dashboard/shared/chartCard";
import AlertCard from "@/components/pages/dashboard/shared/alertCard";
import RequestedMerchants from "@/components/pages/merchants/requested";

interface Props {
  forAdmin?: boolean;
}

const styles = {
  container: "h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden",
  chartsContainer: "w-full flex flex-col lg:flex-row gap-4",
  bottomCard: "flex-1 px-5 py-6 border border-divider rounded-xl",
};

const Dashboard = ({ forAdmin }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IDashboardChartData | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = useState({
    engagement: DashboardChartTimeRangeEnum.MONTHLY,
    pointsSpent: DashboardChartTimeRangeEnum.WEEKLY,
    platformAnalytics: DashboardChartTimeRangeEnum.MONTHLY,
  });

  const engagementSeries: IChartSeries[] = [
    {
      name: "Engagement",
      data: data?.engagementChartData?.[selectedTimeRange.engagement] || [],
    },
    {
      name: "Engagement",
      data: data?.engagementChartData?.[selectedTimeRange.engagement] || [],
    },
  ];

  const pointsSpentSeries: IChartSeries[] = [
    {
      name: "Points Spent",
      data: data?.pointsSpentChartData?.[selectedTimeRange.pointsSpent] || [],
    },
  ];

  const platformAnalyticsSeries: IChartSeries[] = [
    {
      name: "User growth",
      data:
        data?.userGrowthChartData?.[selectedTimeRange.platformAnalytics] || [],
    },
    {
      name: "Offer performance",
      data:
        data?.offerPerformanceChartData?.[
          selectedTimeRange.platformAnalytics
        ] || [],
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getDashboardData();
      setData(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chartsContainer}>
        {forAdmin ? (
          <React.Fragment>
            <ChartCard
              loading={isLoading}
              series={platformAnalyticsSeries}
              title="Platform analytics"
              subtitle="User growth, Offer performances"
              chartType={ChartTypeEnum.BAR}
              selectedTimeRange={selectedTimeRange.platformAnalytics}
              onTimeRangeChange={(value) => {
                setSelectedTimeRange({
                  ...selectedTimeRange,
                  platformAnalytics: value,
                });
              }}
              multiSeries
            />
            <AlertCard
              loading={isLoading}
              title="Active Alerts"
              subtitle="Emergencies, events, news"
              data={data?.alerts || []}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ChartCard
              loading={isLoading}
              series={engagementSeries}
              title="Customer Engagement"
              subtitle="Redemption rates (%)"
              chartType={ChartTypeEnum.LINE}
              selectedTimeRange={selectedTimeRange.engagement}
              onTimeRangeChange={(value) => {
                setSelectedTimeRange({
                  ...selectedTimeRange,
                  engagement: value,
                });
              }}
            />
            <ChartCard
              loading={isLoading}
              series={pointsSpentSeries}
              chartType={ChartTypeEnum.BAR}
              title="Points Spent by Users"
              subtitle="Points spent by user on your offers"
              selectedTimeRange={selectedTimeRange.pointsSpent}
              onTimeRangeChange={(value) => {
                setSelectedTimeRange({
                  ...selectedTimeRange,
                  pointsSpent: value,
                });
              }}
            />
          </React.Fragment>
        )}
      </div>

      <div className={styles.bottomCard}>
        {forAdmin ? <RequestedMerchants /> : <ActiveOffers />}
      </div>
    </div>
  );
};

export default Dashboard;
