import { IAlert } from "@/types";
import { Loader, Typography } from "@/components/ui";
import Icon from "@/Icons";
import { formatDateTime, truncateText } from "@/utils";
import { AlertTypeEnum } from "@/enums";

const styles = {
  card: "flex-1 flex flex-col gap-4 px-1.5 pt-6 pb-4 border border-divider rounded-xl",
  header: "flex gap-4 justify-between px-3.5",
  titleContainer: "flex flex-col gap-1",
  title: "m",
  selectWrapper: "w-[100px]",
  select: "bg-element text-paragraph",
  chartContainer: "min-h-[300px] w-full flex",
  alertItem:
    "w-full bg-element rounded-lg border-[0.5px] border-stroke px-4 py-2 flex-1 flex flex-col",
  alertContent: "flex gap-4",
  alertTextContainer: "flex flex-col gap-1",
  alertDateContainer: "flex mt-auto",
  alertDate: "text-paragraph text-[10px] ml-auto",
  emptyContainer:
    "m-auto p-6 bg-element rounded-lg border-[0.5px] border-stroke text-center shadow-sm",
  alertsContainer: "w-full flex flex-col gap-4 pb-2",
};
interface ChartCardProps {
  title: string;
  loading: boolean;
  subtitle: string;
  data: IAlert[];
}

const AlertCard = ({ data, title, loading, subtitle }: ChartCardProps) => {
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
      </div>

      <div className={styles.chartContainer}>
        {loading ? (
          <Loader className="m-auto stroke-primary" />
        ) : data?.length ? (
          <div className={styles.alertsContainer}>
            {data?.map((alert, index) => (
              <div
                key={`alert${index + alert.id}`}
                className={styles.alertItem}
              >
                <div className={styles.alertContent}>
                  <Icon
                    name={
                      alert.type === AlertTypeEnum.CRITICAL
                        ? "alert"
                        : "warning"
                    }
                    className="w-5"
                  />
                  <div className={styles.alertTextContainer}>
                    <Typography level="p1_bold">{alert.title}</Typography>
                    <Typography level="p1">
                      {truncateText(alert.precautions, 120)}
                    </Typography>
                  </div>
                </div>
                <div className={styles.alertDateContainer}>
                  <Typography level="custom" className={styles.alertDate}>
                    {formatDateTime(alert.createdAt)}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyContainer}>
            <Typography level="p1_bold">Nothing Here</Typography>
            <Typography level="p1">You will find new alerts here</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
