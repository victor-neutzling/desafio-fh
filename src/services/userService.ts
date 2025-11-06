import type { User } from "../interfaces/user.js";
import UserRepository from "../repositories/userRepository.js";

class UserService {
  async index(): Promise<User[]> {
    return UserRepository.findAll();
  }
  async getBalance(id: string): Promise<{ value?: number; message?: string }> {
    const user = await UserRepository.findById(id);

    if (!user) {
      return { message: "usuário não encontrado" };
    }
    return {
      value: user.balance,
    };
  }

  async store(name: string, balance?: number): Promise<User> {
    const newUser = await UserRepository.create(name, balance || 0);

    return newUser;
  }

  async deposit(
    id: string,
    amount: number
  ): Promise<{ value?: number; message?: string }> {
    const user = await UserRepository.findById(id);

    if (!user) {
      return { message: "usuário não encontrado" };
    }

    const newBalance = await UserRepository.updateBalance(
      id,
      Number(user.balance) + Number(amount)
    );
    return { value: newBalance };
  }

  async withdraw(
    id: string,
    amount: number
  ): Promise<{ value?: number; message?: string }> {
    const user = await UserRepository.findById(id);

    if (!user) {
      return { message: "usuário não encontrado" };
    }

    if (user.balance < amount) {
      return {
        message: "o valor inserido é maior do que o saldo disponível na conta",
      };
    }

    const newBalance = await UserRepository.updateBalance(
      id,
      Number(user.balance) - Number(amount)
    );
    return { value: newBalance };
  }
}

export default new UserService();
