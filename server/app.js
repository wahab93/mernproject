const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const app = express();
//  port 
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('hello from the Main Route')
})

// app.use(express.static('public'));

app.use('/public' ,express.static('public'))

app.use(cors());


const cookieParser = require("cookie-parser");
app.use(cookieParser());


// .env for security
dotenv.config({path: './.env'})

// Database Connection
require('./db/conn')


// for data convert into the json
app.use(express.json());


// link Router file
app.use(require('../server/router/auth'))


app.get('/about', (req,res)=>{
    res.send('hello from about')
})


app.listen(port , ()=>{
    console.log(`server is running at port ${port}`);
})