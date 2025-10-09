//! WEBSERVER
// node modules
const fs = require("fs");
const path = require("path");
const http = require("http");

// iomport my other nodeJS files
// Even though we don't explicitly use maraiDBpool here, it is used by mariaDBaddUser() so we save the connection as a global
const mariaDB = require(path.resolve(__dirname, "mariadb/mariadb.js"));

function isSanitized(str) {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^*-_,.";
    return str.split("").every(c => allowedChars.includes(c));
}

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

        // Gets the login.html file if no specific file is requested
        if (request.url.slice(-1) === "/") {
            request.url += "/login.html";
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

        // The body of a POST request is sent in chunks, so we have to wait for all of these chunks to be recieved before doing anything to the data
        let body = "";

        // Collect the chunks
        request.on("data", chunk => {
            body += chunk.toString();
        });

        // Use the data when all chunks are recieved
        request.on("end", async () => {
            try {
                const jsonData = Object.fromEntries(new URLSearchParams(body));

                if (isSanitized(jsonData.email) && isSanitized(jsonData.password)) {
                    await mariaDB.addUser(jsonData.email, jsonData.password);
                } else throw Error(`user input:\n  username:`);
            } catch (e) {
                console.log("POST request error:\n" + e);
            }
        });
    }
});

// Start the webserver
server.listen(PORT, IP, () => {
    console.log(`webserver.js: listening at ${IP}:${PORT}`);
});