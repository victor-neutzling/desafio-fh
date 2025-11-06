import { type User } from "../interfaces/user";
declare class UserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    create(name: string, balance: number): Promise<User>;
    updateBalance(id: string, balance: number): Promise<number>;
}
declare const _default: UserRepository;
export default _default;
//# sourceMappingURL=userRepository.d.ts.map