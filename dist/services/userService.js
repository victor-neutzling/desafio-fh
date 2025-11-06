import UserRepository from "../repositories/userRepository.js";
class UserService {
    async index() {
        return UserRepository.findAll();
    }
    async getBalance(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return { message: "usuário não encontrado" };
        }
        return {
            value: user.balance,
        };
    }
    async store(name, balance) {
        const newUser = await UserRepository.create(name, balance || 0);
        return newUser;
    }
    async deposit(id, amount) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return { message: "usuário não encontrado" };
        }
        const newBalance = await UserRepository.updateBalance(id, Number(user.balance) + Number(amount));
        return { value: newBalance };
    }
    async withdraw(id, amount) {
        const user = await UserRepository.findById(id);
        if (!user) {
            return { message: "usuário não encontrado" };
        }
        if (user.balance < amount) {
            return {
                message: "o valor inserido é maior do que o saldo disponível na conta",
            };
        }
        const newBalance = await UserRepository.updateBalance(id, Number(user.balance) - Number(amount));
        return { value: newBalance };
    }
}
export default new UserService();
