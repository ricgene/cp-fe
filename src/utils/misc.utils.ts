import { IChartSeries, SortByType } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortList = (list: any[], value: SortByType | null) => {
  if (!list) return [];
  if (!value) return list;

  switch (value) {
    case "OLDEST":
      return list.sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "NEWEST":
      return list.sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return list;
  }
};

export const truncateText = (
  text: string | number | boolean | undefined,
  maxLength: number = 25
) => {
  if (text === undefined) return "";
  const stringText = String(text);
  if (stringText.length <= maxLength) return stringText;
  return `${stringText.slice(0, maxLength)}...`;
};

export const createKeyLabelPair = (str: string) => ({
  value: str,
  label: str,
});

export const getStepSize = (series: IChartSeries[]) => {
  const allValues = series.flatMap((s) => s.data as number[]);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1; // avoid 0

  const desiredSteps = 5;
  const rawStep = range / desiredSteps;

  // Round step size to a "nice" value
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const niceStep = Math.ceil(rawStep / magnitude) * magnitude;

  return niceStep;
};

export const joinUrl = (base: string, path: string) => {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};
