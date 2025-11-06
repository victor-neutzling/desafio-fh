export interface SaldoQueryParams {
  id: string;
}

export interface CreateUserMutationParams {
  name: string;
  initialBalance?: number;
}

export interface DepositarMutationParams {
  id: string;
  amount: number;
}

export interface SacarMutationParams {
  id: string;
  amount: number;
}

export interface MonetaryValueResponse {
  message?: string;
  value?: number;
}
