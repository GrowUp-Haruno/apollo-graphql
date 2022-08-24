import { PrismaClient } from "@prisma/client";
import { LinkResolvers } from "../generated/graphql";

export const Link: LinkResolvers<{ prisma: PrismaClient, userId: number | undefined }> = {
  postedBy: (parent, args, context) => {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
  }
}