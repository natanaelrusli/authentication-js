const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    if (typeof req.session.email != 'undefined') {
        res.render('index', { user : req.session })
    } else {
        res.render('welcome')
    }
})
module.exports = router



