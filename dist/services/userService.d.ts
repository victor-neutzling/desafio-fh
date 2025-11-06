import type { User } from "../interfaces/user";
declare class UserService {
    index(): Promise<User[]>;
    getBalance(id: string): Promise<{
        value?: number;
        message?: string;
    }>;
    store(name: string, balance?: number): Promise<User>;
    deposit(id: string, amount: number): Promise<{
        value?: number;
        message?: string;
    }>;
    withdraw(id: string, amount: number): Promise<{
        value?: number;
        message?: string;
    }>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=userService.d.ts.map