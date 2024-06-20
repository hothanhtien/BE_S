import pool from '../config/dbConfig';

class userService {
    async getUsers() {
        const [rows] = await pool.query('SELECT * FROM userdetial');
        console.log(rows)
        return rows;
    }
    async login(username, password) {
        const [row] = await pool.query('SELECT * FROM userdetial WHERE name=? AND password=?', [username, password] );
        if (row.length > 0) {
            return row[0];      
        } else {
            return null;
        }
    }
}

export default new userService(); 