import { QueryResolvers } from './../generated/graphql';
import { PrismaClient } from "@prisma/client";

export const Query: QueryResolvers<{ prisma: PrismaClient }> = {
  info: () => 'HackerNewsのクローン',
  feed: async (parent, args, context) => {
    return await context.prisma.link.findMany()
  },
}