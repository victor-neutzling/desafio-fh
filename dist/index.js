import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema/usersSchema.js";
import { resolvers } from "./graphql/resolvers/userResolvers.js";
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`server running at: ${url}`);
