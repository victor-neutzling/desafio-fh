import type { User } from "../../interfaces/user";
import type { CreateUserMutationParams, DepositarMutationParams, SacarMutationParams, MonetaryValueResponse, SaldoQueryParams } from "./types";
export declare const resolvers: {
    Query: {
        saldo: (_: any, { id }: SaldoQueryParams) => Promise<MonetaryValueResponse>;
        users: () => Promise<User[]>;
    };
    Mutation: {
        createUser: (_: any, { name, initialBalance }: CreateUserMutationParams) => Promise<User>;
        depositar: (_: any, { id, amount }: DepositarMutationParams) => Promise<MonetaryValueResponse>;
        sacar: (_: any, { id, amount }: SacarMutationParams) => Promise<MonetaryValueResponse>;
    };
};
//# sourceMappingURL=userResolvers.d.ts.map