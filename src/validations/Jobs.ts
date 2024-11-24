import { z } from "zod";

export const UpdateJobSchema = z.object({
    status: z.enum(["pending", "accepted", "declined", "completed"]).optional(),
  });