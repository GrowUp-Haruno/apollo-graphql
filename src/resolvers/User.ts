import { PrismaClient } from "@prisma/client";
import { UserResolvers } from "../generated/graphql";

export const User: UserResolvers<{ prisma: PrismaClient }> = {
  links: (parent,args,context) => {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
  },
}