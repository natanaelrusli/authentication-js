const express = require('express');
const router = express.Router();

// User model
const User = require('../models/User')

// Render Login page
router.get('/login', (req, res) => res.render('login'))
// Render Register page
router.get('/register', (req, res) => res.render('register'))

// Register handle
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Password did not match' })
    }
    
    // Check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password have to be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', { 
            errors,
            name,
            email,
            password,
            password2
         })
    } 
    
    else {
        User.findOne({ email: email })
            .then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' })
                res.render('register', { 
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }

            else {
                const newUser = new User({ 
                    name : name, 
                    email : email, 
                    password : password
                })
                
                User.create(newUser, (err, data) => {
                    console.log(newUser)
                    res.render('login', { messages : 'Account created!, please login' })
                })
            }
            
        }) 
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.find({email : email});

    if (typeof user[0] == 'undefined') {
        res.render('login', {error : 'User not found'})
    }
    
    else if (user[0].password == password) {
        req.session.email = email
        req.session.name = user[0].name
        res.redirect('/');
    }
    
    else {
        res.render('login', {error : 'Wrong Password'})
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.render('login', {messages : 'You have logged out'})
    })
})

module.exports = router



