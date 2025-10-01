

//! LOOK INTO WEBSOCKETS!!!!!!!!


//! WEBSERVER
const fs = require("fs");
const path = require("path");
const http = require("http");

const server = http.createServer();

// Gets the correct file type requested
const mime_types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
};

// Request listener
server.on("request", (request, response) => {
    if (request.method == "GET") {

        // Gets the index.html file from directed requested if no specific file is requested
        if (request.url.slice(-1) == "/") {
            request.url += "index.html";
        }

        // Respond with the correct file
        fs.readFile(path.join("/NodeJS/public", request.url), 'utf-8', (err, data) => {
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
});

// Start the webserver
server.listen(80, "0.0.0.0", () => {
    console.log(`webserver.js: listening at <this_machine's_ipv4>:8080`);
});







//! Signaling Server







//! WEB RTC






