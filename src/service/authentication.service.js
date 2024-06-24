import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserIdentityService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    async sign(user) { 
        return jwt.sign({id:user.id}, this.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
    } 
}
export default new UserIdentityService();