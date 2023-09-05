const mysql = require('mysql')
const express = require('express')
const session = require('express-session')
const path = require('path')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cafe"
})

const app = express()


app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(express.static(__dirname + '/Styling'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/regrister', (req,res) => {
    res.sendFile(path.join(__dirname + '/regrister.html'))
})

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send("Welcome " + req.session.username + "!")
    }
    else{
        res.send("You must login to view this page")
    }
})

app.post('/auth', (req,res) => {
    let username = req.body.username
    let password = req.body.password
    if(username && password) {
        connection.query('select * from user where username= ? and password= ?', [username, password], (error,result,fields) => {
            if(error) {
                throw error;
            }

            if(result.length > 0){
                req.session.loggedin = true,
                req.session.username = username,
                res.redirect('/home')
            }else{
                res.send('Incorrect Username or Password')
            }
            res.end()
        })
    }else{
        res.send('Please enter your username and password')
        res.end()
    }
})

app.post('/authreg', (req,res) => {
    let username = req.body.username
    let password = req.body.password
    if(username && password) {
        connection.query('INSERT INTO user(username, password) values ( ? , ?)', [username, password], (error,result,fields) => {
            if(error) {
                throw error;
            }
            res.redirect('/')
            res.end()
        })
    }else{
        res.send('Please enter your username and password')
        res.end()
    }
})

connection.connect((err) => {
    if(err) {
        console.log("Cant connect to database" +"\n"+ err.message);
        return;
    }
    console.log("Database is connected...")
    app.listen(9090, () => {
        console.log("Server is running...")
    })
})

