import auth from './authRouter';
import user from './userRouter';

const route = (app) => {

    app.use('/auth', auth)

    app.use('/users', user)
}

module.exports = route;