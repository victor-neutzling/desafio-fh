import { pool } from "../config/database.js";
import { type User } from "../interfaces/user.js";

class UserRepository {
  async findAll(): Promise<User[]> {
    const queryResult = await pool.query(`SELECT * FROM users`);

    return queryResult.rows;
  }

  async findById(id: string): Promise<User> {
    const queryResult = await pool.query(
      `SELECT * FROM users
      WHERE id = $1`,
      [id]
    );

    return queryResult.rows[0];
  }

  async create(name: string, balance: number): Promise<User> {
    const queryResult = await pool.query(
      `INSERT INTO users(name, balance)
      VALUES ($1, $2)
      returning *`,
      [name, balance]
    );

    return queryResult.rows[0].balance;
  }

  async updateBalance(id: string, balance: number): Promise<number> {
    const queryResult = await pool.query(
      `UPDATE users
      SET balance = $1
      WHERE id = $2 
      RETURNING balance`,
      [balance, id]
    );

    return queryResult.rows[0].balance;
  }
}

export default new UserRepository();
