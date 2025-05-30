"use client";

import { IChartSeries, IDashboardChartData } from "@/types";
import { ChartTypeEnum, DashboardChartTimeRangeEnum } from "@/enums";
import ActiveOffers from "@/components/pages/offers/activeOffers";
import ChartCard from "@/components/pages/dashboard/shared/chatCard";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/requests/dashboard.requests";
import { handleError } from "@/utils";

const styles = {
  container: "h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden",
  chartsContainer: "w-full flex flex-col lg:flex-row gap-4",
  bottomCard: "flex-1 px-5 py-6 border border-divider rounded-xl",
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IDashboardChartData | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = useState({
    engagement: DashboardChartTimeRangeEnum.MONTHLY,
    pointsSpent: DashboardChartTimeRangeEnum.WEEKLY,
  });

  const engagementSeries: IChartSeries[] = [
    {
      name: "Engagement",
      data: data?.engagementChartData[selectedTimeRange.engagement] || [],
    },
  ];

  const pointsSpentSeries: IChartSeries[] = [
    {
      name: "Points Spent",
      data: data?.pointsSpentChartData[selectedTimeRange.pointsSpent] || [],
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
      </div>

      <div className={styles.bottomCard}>
        <ActiveOffers />
      </div>
    </div>
  );
};

export default Dashboard;
