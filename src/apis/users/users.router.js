import express from 'express';
import UsersController from './users.controller';

const router = express.Router();


// lc/users
router.get('/', UsersController.getAllUsers)
// lc/users/:id
router.get('/:id', UsersController.detial)
// lc/users/create
router.post('/create', UsersController.create)
// lc/users/update
router.put('/update/:id', UsersController.update)
// lc/users/delete
router.delete('/delete/:id', UsersController.delete)


export default router;