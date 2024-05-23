import express from 'express';
const router = express.Router();
import auth from '../Controler/authControler'

// lc/auth/login
router.get('/login', auth.login)


module.exports = router;