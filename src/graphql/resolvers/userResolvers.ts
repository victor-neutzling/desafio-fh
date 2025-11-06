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
      return await UserService.getBalance(id);
    },
    users: async (): Promise<User[]> => {
      return await UserService.index();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name, initialBalance }: CreateUserMutationParams
    ): Promise<User> => {
      return await UserService.store(name, initialBalance);
    },
    depositar: async (
      _: any,
      { id, amount }: DepositarMutationParams
    ): Promise<MonetaryValueResponse> => {
      return await UserService.deposit(id, amount);
    },
    sacar: async (
      _: any,
      { id, amount }: SacarMutationParams
    ): Promise<MonetaryValueResponse> => {
      return await UserService.withdraw(id, amount);
    },
  },
};
