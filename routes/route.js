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
        res.sendFile(path.join(__dirname + '/home.html'));
    } else {
        const errorMessage = 'You most login to see this page';
        res.send(`<script>alert('${errorMessage}'); window.location.href='/';</script>`);
    }
});

router.post('/auth', authController.authenticate);
router.post('/authreg', authController.register);
router.post('/logout', authController.logout);

module.exports = router;
