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
  getProductById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { id: input.id },
      });
      return product;
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
      return "product created";
    }),
  updateProduct: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), price: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          price: Number(input.price),
          updatedAt: new Date(),
        },
      });
      return "product updated";
    }),
  deleteProduct: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.product.delete({
        where: { id: input.id },
      });
      return "product delted";
    }),
});
