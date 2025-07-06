import { SortByEnum } from "@/enums";
import { ApexOptions } from "apexcharts";

// CONSTANTS
export const SORT_BY_OPTIONS: { value: SortByEnum; label: string }[] = [
  { value: SortByEnum.asc, label: "Oldest" },
  { value: SortByEnum.desc, label: "Newest" },
];

export const COMMON_CHART_OPTIONS: Partial<ApexOptions> = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      style: {
        colors: "#595959",
      },
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: "#595959",
      },
    },
    tickPlacement: "between",
  },
  tooltip: {
    theme: "light",
  },
  legend: {
    show: false,
  },
  colors: ["#008F45", "#E5D200"],
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
