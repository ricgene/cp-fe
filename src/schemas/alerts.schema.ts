import { z } from "zod";
import { AlertTypeEnum, AlertAudienceEnum } from "@/enums";

export const alertCreateSchema = z.object({
  title: z.string().min(1, "Tag Line is required"),
  precautions: z.string().min(1, "Precaution is required"),
  type: z.nativeEnum(AlertTypeEnum, {
    required_error: "Emergency Type is required",
  }),
  audience: z.nativeEnum(AlertAudienceEnum, {
    required_error: "Audience is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
});

export type AlertCreateFormData = z.infer<typeof alertCreateSchema>;
