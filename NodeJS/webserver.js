// node modules
const fs = require("fs");
const path = require("path");
const http = require("http");
const mariadb = require("mariadb");

//! Functions
function isSanitized(str) {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^*-_,.";
    return str.split("").every(c => allowedChars.includes(c));
}



//! MariaDB
// Create the pool, which manages connections
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "Cadman!13",
    database: "ConventusDB",
    connectionLimit: 5
});



//! Webserver
const IP = "127.0.0.1";
const PORT = "8080";
const mime_types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
};

const server = http.createServer();

// Request listener
server.on("request", (request, response) => {

    if (request.method === "GET") {

        //TODO: rewrite this ton use authentication n stuff

        console.log(request.url);

        // Gets the login.html file if no specific file is requested
        if (request.url.slice(-1) === "/") {
            request.url += "/login/login.html";
        }

        // Read the requested file
        fs.readFile(path.join(`${__dirname}/public`, request.url), 'utf-8', (err, data) => {
            // Make sure the file requests actually exists before serving it
            if (err) {
                console.error(err);
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.end("404 - File not found");
            } else {
                response.writeHead(200, {"Content-Type": mime_types[path.extname(request.url)]})
                response.end(data);
            }
        });
    }
    else if (request.method === "POST") {


        // Handle a login
        if (request.url === "/api/login") {
            // The body of a POST request is sent in chunks, so we have to wait for all of these chunks to be recieved before doing anything to the data
            let body = "";

            // Collect the chunks
            request.on("data", chunk => body += chunk.toString());

            // Use the data when all chunks are recieved
            request.on("end", async () => {
                let responseObj = {
                    login_success: false,
                    account_created: false,
                    message: "",
                };
                response.setHeader("Content-Type", "application/json");

                try {
                    // Parse request for email and password
                    const {email, password} = JSON.parse(body);

                    // Only do anything if user input is sanitized
                    if (isSanitized(email) && isSanitized(password)) {
                        const connection = await pool.getConnection();

                        // Check if the user exists so we can either LOGIN or CREATE an account
                        if ((await connection.query("SELECT email FROM users WHERE email=?", [email])).length) {
                            // LOGIN
                            // check if password sent matches DB password for the email given
                            if (password === (await connection.query("SELECT password FROM users WHERE email=?", email))[0].password) {
                                const sessionID = Math.floor(Math.random() * 10**15);
                                // Set the session ID in DB
                                await connection.query("UPDATE users SET session_id=? WHERE email=?", [sessionID, email]);
                                responseObj.login_success = true;
                                responseObj.message = "Login successful";
                                // Set the session_id cookie to expire the next day
                                const date = new Date();
                                date.setDate(date.getDate() + 1);
                                response.setHeader("Set-Cookie", `session_id=${sessionID}; Expires=${date}`);
                            } else {
                                responseObj.login_success = false;
                                responseObj.message = "Invalid email or password";
                            }
                        } else { // CREATE the account
                            await connection.query("INSERT INTO users (email, password) VALUES (?, ?);", [email, password]);
                            responseObj.account_created = true;
                            responseObj.message = "Account successfuly created";
                        }

                        connection.release();

                        response.statusCode = 200;
                        response.end(JSON.stringify(responseObj));

                    } else {
                        throw Error("Invalid Input");
                    }
                } catch (e) {
                    console.error(e.stack);
                    response.statusCode = 500;
                    responseObj.message = e;
                    response.end(JSON.stringify(responseObj));
                }
            });
        }


    }
});

// Start the webserver
server.listen(PORT, IP, () => {
    console.log(`webserver.js: listening at ${IP}:${PORT}`);
});