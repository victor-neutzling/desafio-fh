export const typeDefs = `
  type SaldoResponse {
    value: Float
    message: String
  }

  type Query {
    saldo(id: ID!): SaldoResponse
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, initialBalance: Float): User
    depositar(id: ID!, amount: Float!): SaldoResponse
    sacar(id: ID!, amount: Float!): SaldoResponse
  }

  type User {
    id: ID!
    name: String!
    balance: Float!
  }
`;
