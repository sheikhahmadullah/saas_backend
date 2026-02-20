const express = require('express');

const app = express();
const PORT = 8000;

const cors = require('cors');
const pool = require('./db');
// connect to database

pool.connect().then(() => {
    console.log('Connected to Database');
}).catch((e) => {
    console.log(e.message);
});
// Middlewares

app.use(express.json()); // req.body will be in json format so to encode that we use this middleware 
app.use(cors()); // so that our backend can interact with our frontend


// ROUTERS 


// register and login route 

app.use('/auth', require("./routes/jwtauth"));


// dashboard route

app.use('/dashboard', require('./routes/dashboard'))



app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`))