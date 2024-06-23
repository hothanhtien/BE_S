const fs = require('fs');
import userService from '../../models/usersModel'
class userControler {
    getAllUsers = async (req, res) => {
        // res.send('hi')
        req.user // biết ai đang đăng nhập 
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    };
    detial = async (req, res, next) => {
        try {
            // const [usersDetial] = await pool.query('SELECT * FROM userdetial WHERE id = ?', req.params.id);
            const usersDetial = await userService.getDetial(req.params.id);
            if (usersDetial.length === 0) {
                return res.status(404).send('User not found');
            }
            res.json(usersDetial[0]);
        } catch (err) {
            console.error(err); 
            res.status(500).send('Server Error');
        }
    }
    create = async(req, res, next) => {
        try {
            const {name, age, email, password, gender} = req.body;
            //  await pool.query('INSERT INTO userdetial (name, age) VALUES (?,?)',[name, age]);
            await userService.createUser(name, age, email, password, gender);
            // res.json(usersInsert);
            res.status(201).send('User created');
        }
        catch(err) { 
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    update = async(req, res, next) => {
        try {
            const {name, age, email, password, gender} = req.body;
            // await pool.query('UPDATE userdetial SET name =?, age=? WHERE id=?',[name, age, req.params.id]);
            await userService.updateUser(name, age, email, password, gender, req.params.id);
            // res.json(usersInsert);
            res.status(201).send('User update');
        }
        catch(err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    delete= async(req, res, next) =>{
        try {
            // await pool.query('DELETE FROM userdetial WHERE id = ?', [req.params.id]);
            await userService.deleteUser(req.params.id);
            res.status(201).send('User update');
        }
        catch(err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

export default new userControler();