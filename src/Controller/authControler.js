const fs = require('fs');
import pool from '../config/dbConfig';
import userService from '../Service/usersService'
class authControler {
    login = async (req, res) => {
        req.user // biết ai đang đăng nhập 
        const username = "melicom";
        const password = "ahihi";
        try {
            const users = await userService.login(username, password);
            if (users) {
                res.json(users);
            } else {
                res.status(401).send('Unauthorized');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    };
}

export default new authControler();