import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const users = [
    { id: 1, name: "victor", balance: 13.25 },
    { id: 2, name: "pedro", balance: 1.25 },
    { id: 3, name: "joao", balance: 111.25 },
];
const typeDefs = `
  type Query {
    saldo(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, initialBalance: Float!): User
    depositar(id: ID!, amount: Float!): User
    sacar(id: ID!, amount: Float!): User
  }

  type User {
    id: ID!
    name: String!
    balance: Float!
  }
`;
//tipar depois, separar em arquivos separados
const resolvers = {
    Query: {
        saldo: (parent, { id }) => {
            return users.find((user) => user.id === Number(id));
        },
        users: () => {
            return users;
        },
    },
    Mutation: {
        createUser: (parent, { id, name, balance }) => {
            const newUser = {
                id: (users.length + 1).toString(),
                name,
                balance,
            };
            users.push(newUser);
        },
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`server running at: ${url}`);
//# sourceMappingURL=index.js.map