import pool from '../config/dbConfig';

class userService {
    async getUsers() {
        const [rows] = await pool.query('SELECT * FROM userdetial');
        console.log(rows)
        return rows;
    }
}

export default new userService();