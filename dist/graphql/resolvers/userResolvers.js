import UserService from "../../services/userService.js";
export const resolvers = {
    Query: {
        saldo: async (_, { id }) => {
            try {
                return UserService.getBalance(id);
            }
            catch (error) {
                throw new Error("Failed to retrieve balance");
            }
        },
        users: async () => {
            try {
                return UserService.index();
            }
            catch (error) {
                throw new Error("Failed to retrieve users");
            }
        },
    },
    Mutation: {
        createUser: async (_, { name, initialBalance }) => {
            try {
                return UserService.store(name, initialBalance);
            }
            catch (error) {
                throw new Error("Failed to create user");
            }
        },
        depositar: async (_, { id, amount }) => {
            try {
                return UserService.deposit(id, amount);
            }
            catch (error) {
                throw new Error("Failed to deposit");
            }
        },
        sacar: async (_, { id, amount }) => {
            try {
                return UserService.withdraw(id, amount);
            }
            catch (error) {
                throw new Error("Failed to withdraw");
            }
        },
    },
};
