const mariadb = require("mariadb");

// Create the pool, which manages connections
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "Cadman!13",
    database: "ConventusDB",
    connectionLimit: 5
});


// Macros
async function addUser(email, password) {
    try {
        const res = await pool.query("INSERT INTO users (email, password) VALUES (?, ?);", [email, password]);
        console.log(res);
    } catch (err) {throw err}
}



module.exports = {
    addUser
}