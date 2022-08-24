import { PrismaClient } from "@prisma/client";
import { ApolloServerExpressConfig } from "apollo-server-express";
import { readFileSync } from "fs";
import { join } from "path";
import { Link } from "../resolvers/Link";
import { Mutation } from "../resolvers/Mutation";
import { Query } from "../resolvers/Query";
import { User } from "../resolvers/User";
import { GetUserId } from "../Utils/GetUserId";

const prisma: PrismaClient = new PrismaClient();

export const ApolloServerConfig: ApolloServerExpressConfig = {
  typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
  
  resolvers: {
    Query,
    Mutation,
    User,
    Link,
  },

  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? GetUserId(req) : undefined
    }
  }
}