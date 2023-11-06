const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controller/controller'); // Pastikan Anda menyesuaikan path ini.

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/register.html'));
});

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome ' + req.session.username + '!');
    } else {
        res.send('You must login to view this page');
    }
});

router.post('/auth', authController.authenticate);
router.post('/authreg', authController.register);

module.exports = router;
