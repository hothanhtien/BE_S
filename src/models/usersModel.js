import pool from '../database/database.config';

class userService {
    constructor(id, name, gender, age, password, email, salt, forgetPasswordToken) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.password = password;
        this.email = email;
        this.salt = salt;
        this.gender = gender;
        this.forgetPasswordToken = forgetPasswordToken;
    }
    async getUsers() {
        const [rows] = await pool.query('SELECT * FROM userdetial');
        console.log(rows)
        return rows;
    }
    async getDetial(paramsId) {
        const [rows] = await pool.query('SELECT * FROM userdetial WHERE id = ?', paramsId);
        return rows;
    }
    async getUserByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM userdetial WHERE name = ?', [username]);
            return rows[0];
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }
    
    async createUser(user) {
        const { name, gender, age, password, email, salt, forgetPasswordToken } = user;
        return await pool.query('INSERT INTO userdetial (name, age,email, password, gender, salt, forgetPasswordToken) VALUES (?,?, ?, ?, ?, ?, ?)',[name, age, email, password, gender, salt, forgetPasswordToken]);
    }
    async updateUser(name, age, email, password, gender, paramsId) {
        return await pool.query('UPDATE userdetial SET name =?, age=?, email=?, password=?, gender=? WHERE id=?',[name, age,email, password, gender, paramsId]);
    }
    async deleteUser(paramsId) {
        return await pool.query('DELETE FROM userdetial WHERE id = ?', [paramsId]);
    }
}

export default new userService();