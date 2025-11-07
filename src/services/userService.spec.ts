import { describe, it, afterEach, expect, vi, Mock } from "vitest";
import { randomUUID } from "crypto";

vi.mock("../repositories/userRepository.js", () => ({
  default: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    updateBalance: vi.fn(),
  },
}));

import UserRepository from "../repositories/userRepository.js";
import UserService from "./userService.js";

describe("User Service", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call UserRepository.findAll when UserService.index is called", () => {
    UserService.index();

    expect(UserRepository.findAll).toHaveBeenCalled();
  });

  it("should call UserRepository.findById with the appropriate Id when UserService.getBalance is called", () => {
    const testId = randomUUID();

    UserService.getBalance(testId);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
  });

  it("should return balance value when user is found", async () => {
    const testId = randomUUID();
    (UserRepository.findById as unknown as Mock).mockResolvedValue({
      balance: 150,
    });

    const balance = await UserService.getBalance(testId);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(balance.value).toBe(150);
    expect(balance.message).toBeUndefined();
  });

  it("should return error message when user is not found", async () => {
    const testId = randomUUID();
    (UserRepository.findById as unknown as Mock).mockResolvedValue(null);

    const balance = await UserService.getBalance(testId);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(balance.message).toBe("usuário não encontrado");
    expect(balance.value).toBeUndefined();
  });

  it("should call create function and return user when store function is called", async () => {
    const testName = "testName";
    const testBalance = 123;
    const testId = randomUUID();

    (UserRepository.create as unknown as Mock).mockResolvedValue({
      name: testName,
      balance: testBalance,
      id: testId,
    });

    const user = await UserService.store("testName", 100);

    expect(UserRepository.create).toHaveBeenCalled();
    expect(user).toStrictEqual({
      name: testName,
      balance: testBalance,
      id: testId,
    });
  });

  it("should return updated balance when deposit function is called", async () => {
    const testId = randomUUID();
    const balance = 150;
    const deposit = 20;

    (UserRepository.findById as unknown as Mock).mockResolvedValue({
      balance,
    });

    (UserRepository.updateBalance as unknown as Mock).mockResolvedValue({
      balance: balance + deposit,
    });

    const newBalance = await UserService.deposit(testId, 20);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(newBalance.value).toStrictEqual({ balance: 170 });
    expect(newBalance.message).toBeUndefined();
  });

  it("should return error message when user is not found", async () => {
    const testId = randomUUID();
    (UserRepository.findById as unknown as Mock).mockResolvedValue(null);

    const balance = await UserService.deposit(testId, 20);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(balance.message).toBe("usuário não encontrado");
    expect(balance.value).toBeUndefined();
  });

  it("should return updated balance when withdraw function is called", async () => {
    const testId = randomUUID();
    const balance = 150;
    const deposit = 20;

    (UserRepository.findById as unknown as Mock).mockResolvedValue({
      balance,
    });

    (UserRepository.updateBalance as unknown as Mock).mockResolvedValue({
      balance: balance - deposit,
    });

    const newBalance = await UserService.withdraw(testId, 20);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(newBalance.value).toStrictEqual({ balance: 130 });
    expect(newBalance.message).toBeUndefined();
  });

  it("should return error message when user is not found", async () => {
    const testId = randomUUID();
    (UserRepository.findById as unknown as Mock).mockResolvedValue(null);

    const balance = await UserService.withdraw(testId, 20);

    expect(UserRepository.findById).toHaveBeenCalledWith(testId);
    expect(balance.message).toBe("usuário não encontrado");
    expect(balance.value).toBeUndefined();
  });
});
