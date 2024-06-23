import express from 'express'
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

import routes from'./apis';

app.use(express.urlencoded());
app.use(express.json())

app.use('/apis', routes)


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
