import authService from "./auth.service";
import userService from "../users/user.service";
class AuthController {
    login = async (req, res, next) => {
        const { name, password } = req.body;
        // console.log('vào đây')
        console.log(name, password)
        const token = await authService.login({name, password});
        console.log('tokennnn', token)
        if (token == null) return res.status(401).json({ message: 'name or password sai'});
        return res.status(200).json({token: token});     
    }
    register = async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
        };
         await userService.createUser(newUser);
        return res.status(201).json(newUser);
    }
}


export default new AuthController();