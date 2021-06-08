const dotenv = require("dotenv").config();
const {
    createPool
} = require("mysql2");

const pool = createPool({
    // port: process.env.DB_PORT,
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DB,
});

module.exports = pool;