import { hashPassword } from "../../service/hash.service";
import UsersModel  from "../../models/usersModel";
class UserService {

    async getUsers() {
        try {
            const user = UsersModel.getUsers();
            return user
        } catch (error) {
            console.error('Error fetching all USERS:', error);
            throw error;
        }
    }

    async getDetial(id) {
        try {
            const userDetial = UsersModel.getDetial(id);
            return userDetial;
        } catch (error) {
            console.error('Error fetching all USERS:', error);
            throw error;
        }
    }

    async createUser(user) {
        try {
            const { salt , passwordHashed } = hashPassword(user.password);
            console.log("salt",salt + "passwordHashed", passwordHashed);
            user.salt = salt;
            user.password = passwordHashed;
            user.forgetPasswordToken =passwordHashed;
            const id = UsersModel.createUser(user);
            return id;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

}

export default new UserService();