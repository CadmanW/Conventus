const http = require("http");

const PORT = 8080;

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Got a request!");

    res.end("Hello, World! (from NodeJS in Docker, for Conventus :)");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`server listening on port ${PORT}`);
});
