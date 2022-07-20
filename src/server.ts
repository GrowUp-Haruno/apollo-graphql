import { Resolvers } from './generated/graphql';
import { ApolloServer, gql } from 'apollo-server';

const links = [{ id: 'link.0', description: 'GraphQLのチュートリアルをやってみた', url: 'www.example.com' }];

// スキーマ定義
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

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

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await server.listen();
  console.log(`${url}でサーバを起動中`);
})();
