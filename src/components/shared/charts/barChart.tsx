"use client";
import dynamic from "next/dynamic";

import React from "react";
import { ApexOptions } from "apexcharts";
import { getStepSize } from "@/utils";
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
  series: {
    name: string;
    data: number[];
  }[];
}

const BarChart = ({ categories, series }: Props) => {
  const stepSize = getStepSize(series);

  const options: ApexOptions = {
    ...COMMON_CHART_OPTIONS,
    chart: {
      ...COMMON_CHART_OPTIONS.chart,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: 10,
        borderRadiusApplication: "end",
        distributed: true,
        rangeBarOverlap: false,
        rangeBarGroupRows: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        if (value === null || seriesIndex === 1) return "";
        return `<div class="text-white bg-primary rounded p-1 text-xs">${value.toLocaleString()} Points</div>`;
      },
    },
    yaxis: {
      ...COMMON_CHART_OPTIONS.yaxis,
      stepSize,
    },
    xaxis: {
      ...COMMON_CHART_OPTIONS.xaxis,
      categories,
    },
  };

  return (
    <div className={styles.chart} id="bar-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};

export default BarChart;
