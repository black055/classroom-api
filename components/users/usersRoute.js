const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');

const usersController = require('./usersController');

router.post('/add-user', async function(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const successful = await usersController.addUser({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    if (successful) {
        const token = jwt.sign({ _id: successful._id }, 'secret');
        return res.json({
            token: token,
            username: successful.username
        });
    } else res.send(successful);
});

router.post('/login', async function(req, res, next) {
    let check = false;
    const user = await usersController.getUser(req.body.username);
    if (user) {
        check = await bcrypt.compareSync(req.body.password, user.password);
    }
    if (check) {
        const token = jwt.sign({ _id: user._id }, 'secret');
        return res.json({
            token: token,
            username: user.username
        });
    }
    else res.send(check);
});

router.post('/logout', async function(req, res, next) {
    res.redirect("/");
});

router.get('/logged-in', async function(req, res, next) {
    try {
        const auth = jwt.verify(req.cookies.token, 'secret');
        if (auth) {
            return res.send(true);
        } else {
            return res.send(false);
        }
    } catch(err) {
        return res.send(false);
    }
});

module.exports = router;