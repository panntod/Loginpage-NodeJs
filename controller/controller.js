const db = require('../config/database');

exports.authenticate = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        db.query('select * from user where username= ? and password= ?', [username, password], (error, result, fields) => {
            if (error) {
                throw error;
            }

            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                const errorMessage = 'Incorrect Username or Password';
                res.status(401).send(`<script>alert('${errorMessage}'); window.location.href='/';</script>`);
            }
            res.end();
        });
    } else {
        const errorMessage = 'Please enter your username and password';
        res.status(400).send(`<script>alert('${errorMessage}'); window.location.href='/';</script>`);
        res.end();
    }
};

exports.register = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        db.query('INSERT INTO user(username, password) values ( ? , ?)', [username, password], (error, result, fields) => {
            if (error) {
                throw error;
            }
            res.redirect('/');
            res.end();
        });
    } else {
        res.status(401).send(`<script>alert('Please Enter Username and Password'); window.location.href='/';</script>`);
        res.end();
    }
};
