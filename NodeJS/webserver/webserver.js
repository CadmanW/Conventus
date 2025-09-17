const fs = require("fs");
const http = require("http");
const path = require("path");

const server = http.createServer();

const mime_types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
};

server.on("request", (request, response) => {
    if (request.method == "GET") {

        if (request.url.slice(-1) == "/") {
            request.url += "index.html";
        }

        fs.readFile(path.join("/NodeJS/webserver/www", request.url), 'utf-8', (err, data) => {
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

server.listen(80, "0.0.0.0", () => {
    console.log(`webserver.js: listening at <this_machine's_ipv4>:8080`);
});
