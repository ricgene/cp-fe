"use client";
import dynamic from "next/dynamic";

import React from "react";
import { ApexOptions } from "apexcharts";
import { getStepSize } from "@/utils";
import { Loader } from "@/components/ui";
import { COMMON_CHART_OPTIONS } from "@/constants";

const styles = {
  chart: "relative min-h-[300px] w-full",
  loaderContainer: "flex h-full w-full",
  loader: "m-auto stroke-primary",
  multiSeriesOverlay:
    "absolute top-0 left-0 w-full h-full pl-10 pr-5 pt-6 pb-9 flex flex-col",
  topBackground: "top-0 left-0 w-full h-[28%] bg-[#008F450A]",
  bottomBackground: "bottom-0 left-0 w-full h-[28%] bg-[#008F450A] mt-auto",
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
  multiSeries: boolean;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

const BarChart = ({ categories, series, multiSeries }: Props) => {
  const stepSize = getStepSize(series);

  const options: ApexOptions = {
    ...COMMON_CHART_OPTIONS,
    chart: {
      ...COMMON_CHART_OPTIONS.chart,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: multiSeries ? 0 : 5,
        columnWidth: multiSeries ? 12 : 10,
        borderRadiusApplication: "end",
        distributed: false,
        rangeBarOverlap: false,
        rangeBarGroupRows: false,
      },
    },
    ...(multiSeries && {
      stroke: {
        width: 2,
        colors: ["transparent"],
      },
    }),
    ...(multiSeries && {
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    }),
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        if (value === null) return "";
        return `<div class="text-white ${
          seriesIndex === 1 ? "bg-[#E5D200]" : "bg-primary"
        } rounded p-1 text-xs">${value.toLocaleString()} Points</div>`;
      },
    },
    yaxis: {
      ...COMMON_CHART_OPTIONS.yaxis,
      stepSize,
    },
    xaxis: {
      ...COMMON_CHART_OPTIONS.xaxis,
      categories,
      ...(multiSeries && {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      }),
    },
  };

  return (
    <div className={styles.chart} id="bar-chart">
      {multiSeries && (
        <div className={styles.multiSeriesOverlay}>
          <div className={styles.topBackground} />
          <div className={styles.bottomBackground} />
        </div>
      )}

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
