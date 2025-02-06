const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const db = require('./app/configs/db.configs');
const CONSTANTS = require('./app/configs/constants')

const PORT = process.env.PORT || 3001;
const PATH = CONSTANTS.API_PATH + '/api/v1/'


app.use(cors());
app.use(morgan('dev'));

app.get(PATH, async (req, res) => {
    const query = 'SELECT * FROM users ORDER BY id ASC';
    await db.client.connect();
    db.client.query(query, (err, result) => {
        if (err) {
            res.status(500).json(err);
            db.client.end();
        }
        res.status(200).json(result.rows);
        db.client.end();
    })
})


app.listen(PORT);
console.log(`Listening on port ${PORT}`);