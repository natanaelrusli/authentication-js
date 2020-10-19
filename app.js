const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session')

// DB Config
const mongoURI = "mongodb+srv://admin:admin@cluster0.5htwy.mongodb.net/user?retryWrites=true&w=majority"

// Connect to mongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

// EJS
// Make sure calling the express layouts before setting the view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser());
app.use(session({secret: "secret"}));

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


const port = 5000;
app.listen(port, console.log(`Server started on port ${port}`))