const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const routes = require('./app/routers/index');
const CONSTANTS = require('./app/configs/constants')

const API_PREFIX = CONSTANTS.API_PATH;
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));

app.use(API_PREFIX, routes);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
console.log(`Server running on http://localhost:${PORT}${API_PREFIX}`);