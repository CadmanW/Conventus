# Conventus
Self hosted open source meeting software

## Structure
- Everything written in NodeJS
- MariaDB or SQLite

1. NodeJS Webserver listening on port 80 for http requests
2. Respond to http requests appropriately to serve up the webpages
3. Establish (MCU or SFU) network connections for streaming video between the 