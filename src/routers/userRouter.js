import express from 'express';
const router = express.Router();
import user from '../Controller/userControler'

// lc/users
router.get('/', user.getAllUsers)
// lc/users/:id
router.get('/:id', user.detial)
// lc/users/create
router.post('/create', user.create)
// lc/users/update
router.put('/update/:id', user.update)
// lc/users/delete
router.delete('/delete/:id', user.delete)
module.exports = router;