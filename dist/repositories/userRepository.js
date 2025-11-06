import { pool } from "../config/database.js";
class UserRepository {
    async findAll() {
        const queryResult = await pool.query(`SELECT * FROM users`);
        return queryResult.rows;
    }
    async findById(id) {
        const queryResult = await pool.query(`SELECT * FROM users
      WHERE id = $1`, [id]);
        return queryResult.rows[0];
    }
    async create(name, balance) {
        const queryResult = await pool.query(`INSERT INTO users(name, balance)
      VALUES ($1, $2)
      returning *`, [name, balance]);
        return queryResult.rows[0].balance;
    }
    async updateBalance(id, balance) {
        const queryResult = await pool.query(`UPDATE users
      SET balance = $1
      WHERE id = $2 
      RETURNING balance`, [balance, id]);
        return queryResult.rows[0].balance;
    }
}
export default new UserRepository();
