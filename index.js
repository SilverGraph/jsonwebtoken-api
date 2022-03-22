const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')



/*************** IMPORT ROUTES ***************/
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
/*************** IMPORT ROUTES ***************/



/*************** USE MIDDLEWARES ***************/
const app = express()
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))
/*************** USE MIDDLEWARES ***************/



/*************** MONGO DB SETUP ***************/
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECT,
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('DB connected!'))
.catch(err => console.log(err))
/*************** MONGO DB SETUP ***************/





/*************** ROUTE MIDDLEWARE ***************/
// means /api/user/register
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
/*************** ROUTE MIDDLEWARE ***************/



/*************** DEFINE A PORT ***************/
app.listen(5000, () => {
    console.log('Server running on port 5000...');
})
/*************** DEFINE A PORT ***************/