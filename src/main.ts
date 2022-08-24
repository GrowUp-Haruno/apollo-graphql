import { ApolloServer } from 'apollo-server';
import { ApolloServerConfig } from './ApolloServer/config';

const server = new ApolloServer(ApolloServerConfig);

(async () => {
  const { url } = await server.listen();
  console.log(`${url}でサーバを起動中`);
})();
