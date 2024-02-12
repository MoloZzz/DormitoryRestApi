require('dotenv').config();

const express = require('express');
const sequelize = require('./db/db');
const router = require('./routers/mainrouter');

const PORT = process.env.PORT || 4141;

const app = express();

app.use('/api', router);