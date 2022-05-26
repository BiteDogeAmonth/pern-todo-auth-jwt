const Pool = require("pg").Pool

const pool = new Pool({
    user: "yangguangyu",
    host: "localhost",
    port: 5432,
    database: "authdata"
})

module.exports = pool;