import pool from '../database/database.config';

class userService {
    async getUsers() {
        const [rows] = await pool.query('SELECT * FROM userdetial');
        console.log(rows)
        return rows;
    }
    async getDetial(paramsId) {
        const [rows] = await pool.query('SELECT * FROM userdetial WHERE id = ?', paramsId);
        return rows;
    }
    async createUser(name, age,email, password, gender) {
        return await pool.query('INSERT INTO userdetial (name, age,email, password, gender) VALUES (?,?, ?, ?, ?)',[name, age, email, password, gender]);
    }
    async updateUser(name, age, email, password, gender, paramsId) {
        return await pool.query('UPDATE userdetial SET name =?, age=?, email=?, password=?, gender=? WHERE id=?',[name, age,email, password, gender, paramsId]);
    }
    async deleteUser(paramsId) {
        return await pool.query('DELETE FROM userdetial WHERE id = ?', [paramsId]);
    }
}

export default new userService();