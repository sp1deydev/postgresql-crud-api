const Client = require('pg').Client;

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

module.exports = {
    client
}
