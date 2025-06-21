import {
  DashboardChartTimeRangeType,
  DashboardChartType,
  IChartSeries,
  IDashboardChartTimeRange,
} from "@/types";
import {
  DASHBOARD_CHART_LABELS,
  DASHBOARD_CHART_TIME_RANGE_OPTIONS,
} from "@/constants";
import { ChartTypeEnum } from "@/enums";
import { Loader, Select, Typography } from "@/components/ui";
import { BarChart, LineChart } from "@/components/shared/charts";

const styles = {
  card: "flex-1 flex flex-col gap-4 px-1.5 pt-6 pb-4 border border-divider rounded-xl",
  header: "flex gap-4 justify-between px-3.5",
  titleContainer: "flex flex-col gap-1",
  title: "m",
  selectWrapper: "w-[100px]",
  select: "bg-element text-paragraph",
  chartContainer: "min-h-[300px] w-full flex",
};
interface ChartCardProps {
  title: string;
  loading: boolean;
  subtitle: string;
  multiSeries?: boolean;
  series: IChartSeries[];
  chartType: DashboardChartType;
  selectedTimeRange: DashboardChartTimeRangeType;
  timeRangeOptions?: IDashboardChartTimeRange[];
  onTimeRangeChange: (timeRange: DashboardChartTimeRangeType) => void;
}

const ChartCard = ({
  title,
  series,
  loading,
  subtitle,
  chartType,
  selectedTimeRange,
  multiSeries = false,
  timeRangeOptions = DASHBOARD_CHART_TIME_RANGE_OPTIONS,
  onTimeRangeChange,
}: ChartCardProps) => {
  const labels = DASHBOARD_CHART_LABELS[selectedTimeRange];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Typography level="h2" className={styles.title}>
            {title}
          </Typography>
          <Typography level="p1" className={styles.title}>
            {subtitle}
          </Typography>
        </div>
        <div>
          <Select
            name="date"
            size="small"
            icon="calendar"
            rotateIcon={false}
            value={selectedTimeRange}
            className={styles.select}
            options={timeRangeOptions}
            wrapperClassName={styles.selectWrapper}
            onChange={(value) =>
              onTimeRangeChange(value as DashboardChartTimeRangeType)
            }
          />
        </div>
      </div>

      <div className={styles.chartContainer}>
        {loading ? (
          <Loader className="m-auto stroke-primary" />
        ) : (
          <>
            {chartType === ChartTypeEnum.LINE ? (
              <LineChart categories={labels} series={series} />
            ) : (
              <BarChart
                categories={labels}
                series={series}
                multiSeries={multiSeries}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
