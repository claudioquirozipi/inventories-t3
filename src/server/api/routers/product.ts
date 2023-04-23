import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProducts: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();
    return products;
  }),
  createProduct: protectedProcedure
    .input(z.object({ name: z.string(), price: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          price: Number(input.price),
          createdAt: new Date(),
          updatedAt: new Date(),
          id: uuidv4(),
        },
      });
      return "product";
    }),
});
