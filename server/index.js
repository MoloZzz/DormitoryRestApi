require('dotenv').config();

const express = require('express');


//const sequelize = require('./db/db');
const router = require('./routers/mainrouter');
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 4141;

const app = express();

app.use('/api', router);

app.use(errorHandler);

try{
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })

}catch(e){
    console.log(e);
}