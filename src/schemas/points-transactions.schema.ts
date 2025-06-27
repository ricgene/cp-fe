import { z } from "zod";

// General Tab Schema
export const pointsAllocationSchema = z.object({
  points: z.coerce.number().min(1, "Points must be greater than 0"),
  reason: z.string().min(1, "Reason is required"),
});

export type PointsAllocationFormData = z.infer<typeof pointsAllocationSchema>;
