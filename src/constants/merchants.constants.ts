import { IAction } from "@/types";
import { ActionEnum } from "@/enums";

export const REQUEST_ACTIONS: IAction[] = [
  { label: "Approve", key: ActionEnum.APPROVE },
  { label: "Reject", key: ActionEnum.REJECT },
];
