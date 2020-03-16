const express = require('express');
const router = express.Router();
const {User, Register, Login, Verify} = require('../../models/user');

router.get('/register', async (req, res) => {
    res.render('users/register.ejs', {user: new User()});
});

router.get('/login', async (req, res) => {
    res.render('users/login', {user: new User()});
});

router.post('/register', async (req, res) => {
    let {name, email, password} = req.body;
    try {
        await Register(name, email, password);
        res.redirect('/users/login');
    } catch (error) {
        //res.status(400);
        //alert(`Error: ${error}`);
        console.log(`Error: ${error}`)
    }
});

router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    try {
        let tokenKey = await Login(email, password);
        //console.log(tokenKey);
        res.redirect(`/?token=${tokenKey}`);
    } catch (error) {
        res.status(400);
        alert(`Error: ${error}`);
    }
})
module.exports = router;