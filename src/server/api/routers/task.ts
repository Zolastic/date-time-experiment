import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import dayjs from "dayjs";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), completeBy: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return await ctx.db.task.create({
        data: {
          name: input.name,
          completeBy: dayjs(input.completeBy).toDate(),
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
