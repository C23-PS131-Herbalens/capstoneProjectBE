const dotenv = require('dotenv')
const express = require('express')
const app = express()
const port = dotenv.config().parsed.PORT
const routes = require('./routes/api')


app.set('view engine', 'ejs')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})