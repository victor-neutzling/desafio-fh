import { describe, it, expect, vi, afterEach, Mock } from "vitest";

vi.mock("../../services/userService.js", () => ({
  default: {
    getBalance: vi.fn(),
    index: vi.fn(),
    store: vi.fn(),
    deposit: vi.fn(),
    withdraw: vi.fn(),
  },
}));

import UserService from "../../services/userService.js";
import { resolvers } from "./userResolvers.js";
import { randomUUID } from "crypto";

describe("User Resolver queries", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call getBalance with correct id and return its result", async () => {
    (UserService.getBalance as unknown as Mock).mockResolvedValue({
      value: 150,
    });

    const testId = randomUUID();
    const result = await resolvers.Query.saldo({}, { id: testId });

    expect(UserService.getBalance).toHaveBeenCalledWith(testId);
    expect(result).toEqual({ value: 150 });
  });

  it("should return the list of users from UserService.index", async () => {
    const testUsers = [
      { id: "1", name: "Victor", balance: 100 },
      { id: "2", name: "Pedro", balance: 200 },
    ];
    (UserService.index as unknown as Mock).mockResolvedValue(testUsers);

    const result = await resolvers.Query.users();

    expect(UserService.index).toHaveBeenCalled();
    expect(result).toStrictEqual(testUsers);
  });
});

describe("User Resolver mutations", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call UserService.store with correct arguments", async () => {
    const testUser = { id: "1", name: "Victor", balance: 50 };
    (UserService.store as unknown as Mock).mockResolvedValue(testUser);

    const result = await resolvers.Mutation.createUser(
      {},
      { name: "Victor", initialBalance: 50 }
    );

    expect(UserService.store).toHaveBeenCalledWith("Victor", 50);
    expect(result).toStrictEqual(testUser);
  });

  it("should call UserService.deposit with correct arguments", async () => {
    const id = randomUUID();
    const balance = 150;
    const deposit = 20;

    (UserService.deposit as unknown as Mock).mockResolvedValue({
      balance: balance + 20,
    });

    const result = await resolvers.Mutation.depositar(
      {},
      { id, amount: deposit }
    );

    expect(result).toStrictEqual({ balance: 170 });
  });
  it("should call UserService.withdraw with correct arguments", async () => {
    const id = randomUUID();
    const balance = 150;
    const deposit = 20;

    (UserService.withdraw as unknown as Mock).mockResolvedValue({
      balance: balance - 20,
    });

    const result = await resolvers.Mutation.sacar({}, { id, amount: deposit });

    expect(result).toStrictEqual({ balance: 130 });
  });
});
