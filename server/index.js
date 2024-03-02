require('dotenv').config();

const express = require('express');
const path = require('path');


const sequelize = require('./db/db');
const router = require('./routers/mainrouter');
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 4141;

const app = express();
app.use(express.json());

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/pages')));
app.use(express.static(path.join(__dirname, '../client')));

app.use(errorHandler);

const start = async () =>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    
    }catch(e){
        console.log(e);
    }
}

start();