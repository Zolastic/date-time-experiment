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

  getAll: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.db.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return tasks;
  }),
});
