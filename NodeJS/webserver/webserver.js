const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Got a request!");

    res.end("Hello, World! (from NodeJS in Docker, for Conventus :)");
});

server.listen(80, "0.0.0.0", () => {
    console.log(`webserver listening at <this_machine's_ipv4>:8080`);
});
