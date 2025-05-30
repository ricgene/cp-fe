import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleError = (
  error: Error | unknown | null,
  message?: string
) => {
  if (error !== null) {
    logError(error);
  }
  toast.error(
    message ||
      ((error as AxiosError).response?.data as { message: string })?.message ||
      (error as Error).message ||
      "An error occurred"
  );
};

export const logError = (error: Error | unknown | null) => {
  console.error(">> Error: ", error);
};
