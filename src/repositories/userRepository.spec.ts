import { describe, it, afterEach, expect, vi } from "vitest";
import UserRepository from "./userRepository.js";
import { pool } from "../config/database.js";
import { randomUUID } from "crypto";

describe("User Repository", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should run query when UserRepository.findAll is called", () => {
    const spy = vi.spyOn(pool, "query");

    UserRepository.findAll();
    expect(spy).toHaveBeenCalledWith("SELECT * FROM users");
  });

  it("should run query when create is called", () => {
    const spy = vi.spyOn(pool, "query");

    const testName = "testName";
    const testBalance = 150;

    UserRepository.create(testName, testBalance);
    expect(spy).toHaveBeenCalledWith(
      `INSERT INTO users(name, balance)
      VALUES ($1, $2)
      returning *`,
      [testName, testBalance]
    );
  });

  it("should run query when findById is called", () => {
    const spy = vi.spyOn(pool, "query");

    const testId = randomUUID();

    UserRepository.findById(testId);
    expect(spy).toHaveBeenCalledWith(
      `SELECT * FROM users
      WHERE id = $1`,
      [testId]
    );
  });
  it("should run query when updateBalance is called", () => {
    const spy = vi.spyOn(pool, "query");

    const testId = randomUUID();
    const testBalance = 150;

    UserRepository.updateBalance(testId, testBalance);
    expect(spy).toHaveBeenCalledWith(
      `UPDATE users
      SET balance = $1
      WHERE id = $2 
      RETURNING balance`,
      [testBalance, testId]
    );
  });
});
