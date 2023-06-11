const express = require('express')
const app = express()
const port = 3000



const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'herbalens'
})

app.get('/', (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) throw err

        console.log('The solution is: ', rows)
    })
    res.send('Hello World!')
})

connection.end()




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})