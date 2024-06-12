import express from 'express';
const router = express.Router();
import auth from '../Controller/authControler'

// lc/auth/login
router.get('/login', auth.login)


export default router;