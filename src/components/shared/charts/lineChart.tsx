"use client";
import dynamic from "next/dynamic";

import React from "react";
import { ApexOptions } from "apexcharts";
import { getStepSize } from "@/utils";
import { IChartSeries } from "@/types";
import { Loader } from "@/components/ui";
import { COMMON_CHART_OPTIONS } from "@/constants";

const styles = {
  chart: "min-h-[300px] w-full",
  loaderContainer: "flex h-full w-full",
  loader: "m-auto stroke-primary",
};

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className={styles.loaderContainer}>
      <Loader className={styles.loader} />
    </div>
  ),
});

interface Props {
  categories: string[];
  series: IChartSeries[];
}

const LineChart = ({ categories, series }: Props) => {
  const stepSize = getStepSize(series);

  const options: ApexOptions = {
    ...COMMON_CHART_OPTIONS,
    chart: {
      ...COMMON_CHART_OPTIONS.chart,
      type: "line",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.65,
        opacityTo: 0.2,
        stops: [0, 90],
        gradientToColors: ["#008F45"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      ...COMMON_CHART_OPTIONS.yaxis,
      stepSize,
      labels: {
        formatter: (value: number) => {
          return value
            ? value > 1000
              ? `${value / 1000}k`
              : value.toString()
            : "";
        },
        style: {
          colors: "#595959",
        },
      },
    },
    xaxis: {
      ...COMMON_CHART_OPTIONS.xaxis,
      categories,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        if (value === null || seriesIndex === 1) return "";
        return `<div class="text-white bg-primary rounded p-1 text-xs">${value.toLocaleString()} Redemptions</div>`;
      },
    },
    colors: ["#008F45"],
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  return (
    <div className={styles.chart} id="line-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};

export default LineChart;
