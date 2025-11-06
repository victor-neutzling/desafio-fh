import type { User } from "../../interfaces/user.js";
import UserService from "../../services/userService.js";
import type {
  CreateUserMutationParams,
  DepositarMutationParams,
  SacarMutationParams,
  MonetaryValueResponse,
  SaldoQueryParams,
} from "./types.js";

export const resolvers = {
  Query: {
    saldo: async (
      _: any,
      { id }: SaldoQueryParams
    ): Promise<MonetaryValueResponse> => {
      try {
        return UserService.getBalance(id);
      } catch (error) {
        throw new Error("Failed to retrieve balance");
      }
    },
    users: async (): Promise<User[]> => {
      try {
        return UserService.index();
      } catch (error) {
        throw new Error("Failed to retrieve users");
      }
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { name, initialBalance }: CreateUserMutationParams
    ): Promise<User> => {
      try {
        return UserService.store(name, initialBalance);
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    depositar: async (
      _: any,
      { id, amount }: DepositarMutationParams
    ): Promise<MonetaryValueResponse> => {
      try {
        return UserService.deposit(id, amount);
      } catch (error) {
        throw new Error("Failed to deposit");
      }
    },
    sacar: async (
      _: any,
      { id, amount }: SacarMutationParams
    ): Promise<MonetaryValueResponse> => {
      try {
        return UserService.withdraw(id, amount);
      } catch (error) {
        throw new Error("Failed to withdraw");
      }
    },
  },
};
