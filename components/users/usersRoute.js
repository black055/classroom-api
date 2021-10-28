const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const usersController = require('./usersController');

router.post('/add-user', async function(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const successful = await usersController.addUser({
        username: req.body.username,
        password: hashedPassword,
    });
    res.send(successful);
});

router.post('/login', async function(req, res, next) {
    let check = false;
    const user = await usersController.getUser(req.body.username);
    if (user) {
        check = await bcrypt.compareSync(req.body.password, user.password);
    }
    if (check) req.session.user = user;
    res.send(check);
});

router.post('/logout', async function(req, res, next) {
    req.session.user = undefined;
    req.session.destroy();
    res.redirect("/");
});

router.get('/logged-in', async function(req, res, next) {
    console.log(req.session);
    if (typeof req.session.user !== 'undefined') {
        res.json({
            loggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({
            loggedIn: false,
            user: null
        });
    }
});

module.exports = router;