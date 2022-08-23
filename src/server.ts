import { Resolvers } from './generated/graphql';
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
// import { Link } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

// const links = [{id:"1",createdAt:date,description:'',url:""}];

// リゾルバ関数
const resolvers: Resolvers<{ prisma: PrismaClient }> = {
  Query: {
    info: () => 'HackerNewsのクローン',
    feed: async (parent, args, context) => {
      return await context.prisma.link.findMany()
    },
    // feed: () => links,
  },
  Mutation: {
    post: async (parent, args, context) => {
      const newLink = await context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
      return newLink
    }
  }
  // Mutation: {
  //   post: (parent, args) => {
  //     let idCount = links.length;
  //     const link = {
  //       id: `link.${idCount++}`,
  //       description: args.description,
  //       url: args.url,
  //     };
  //     links.push(link);
  //     return link;
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers,
  context: {
    prisma
  }
});

(async () => {
  const { url } = await server.listen();
  console.log(`${url}でサーバを起動中`);
})();
