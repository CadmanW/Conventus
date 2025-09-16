# Conventus
Self hosted open source meeting software

## How to set up
```bash
#Allow the port LAN access through UFW
sudo ufw allow 8080/tcp

# Finally, start the webserver by building the docker, then running the container using the compose.yaml file
docker compose up --build

```

## Node Packages
> ### Child Process
> [Docs](https://nodejs.org/api/child_process.html)
>
> This package is being used so that I can run JS files in node, from other JS files in node. Basically, I'm running other NodeJS files as sub-proccesses of main.js

> ### HTTP
> [Docs](https://nodejs.org/api/http.html)
>
> This is used for the webserver

> ### Socket.IO
>
>
> This will be used to create websocket connections

> ### WebRTC
>
>
> This will be used to stream media between endpoints