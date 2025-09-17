const fork = require("child_process").fork;

const web_server = fork("/NodeJS/webserver/webserver.js");
const webRTC_server = fork ("/NodeJS/webRTC_server.js");