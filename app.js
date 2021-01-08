const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session')

// MongoDB Connection String
const mongoURI = "mongodb+srv://admin:admin@cluster0.5htwy.mongodb.net/user?retryWrites=true&w=majority"

// Connect to MongoDB using connection string and mongoose
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))

// EJS
// Make sure calling the express layouts before setting the view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// This is required to login and keep user data across pages
app.use(cookieParser());
app.use(session({secret: "secret"}));

// Routes
app.use('/users', require('./routes/users'))

app.get('/', (req,res) => {

    if (typeof req.session.email != 'undefined') {
        res.render('index', { user : req.session })
    } else {
        res.render('login')
    }
    
})

const port = 5000;
app.listen(port, console.log(`Server started on port ${port}`))