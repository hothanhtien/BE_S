import auth from './authRouter';

const route = (app) => {

    app.use('/auth', auth)

    // app.use('/users', (req, res) => {
        
    // })
}

module.exports = route;