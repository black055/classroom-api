const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require('jsonwebtoken');

const usersController = require('./usersController');

router.post('/register', async function(req, res, next) {
    const successful = await usersController.addUser({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    if (successful) {
        const token = jwt.sign({ _id: successful._id }, 'secret');
        return res.json({
            token: token
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
            token: token
        });
    }
    else res.send(check);
});

router.get('/logged-in', async function(req, res, next) {
    try {
        const auth = jwt.verify(req.cookies.token, 'secret');
        if (auth) {
            const user = await usersController.getUserByID(auth._id);
            return res.json({
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname
            });
        } else {
            return res.send(false);
        }
    } catch(err) {
        return res.send(false);
    }
});

module.exports = router;