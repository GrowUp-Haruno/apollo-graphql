import { Resolvers } from './generated/graphql';
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';

const links = [{ id: 'link.0', description: 'GraphQLのチュートリアルをやってみた', url: 'www.example.com' }];

// リゾルバ関数
const resolvers: Resolvers = {
  Query: {
    info: () => 'HackerNewsのクローン',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link.${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({ typeDefs: readFileSync(join(__dirname, 'schema.graphql'), 'utf-8'), resolvers });

(async () => {
  const { url } = await server.listen();
  console.log(`${url}でサーバを起動中`);
})();
