# Conventus
Self hosted open source meeting software

## How to set up
```bash
#Allow the port LAN access through UFW
sudo ufw allow 8080/tcp

# Enable firewall
sudo ufw enable

# Finally, start the webserver by building the docker, then running the container using the compose.yaml file
docker compose up --build

```

## What happens when you run the commands above?
```bash
 sudo ufw allow 8080/tcp
 sudo ufw enable
 ```
 These just enable UFW, linux's firewall magaer, and sets a new rule to allow incoming connections over TCP on port 8080.

 ```bash
docker compose up --build
```
Docker is a big one. I honestly don't know exactly what this does, but it "builds" the project using ```compose.yaml``` and ```dockerfile```.
```compose.yaml``` links port 8080 on the host machine to port 80 on the VM that Docker creates for the container, and specifies what other containers should be made for other applications; such as the NodeJS webserver and the database.
```dockerfile``` is docker's configureation file.
As specified in the ```dockerfile```, in the NodeJS webserver container; ```npm start``` is ran to actually start Node.
```npm start``` is specified in ```package.json``` under scripts:
```json
"scripts": {
    "start": "node ./NodeJS/main.js"
}
```
This runs ```main.js```.
This is what I call my "node controller".
The node controller is used to run all the Node files as a subprocess of ```main.js```.

When ```webserver.js``` is ran, the following happens:

1. libraries are imported
2. the webserver is created using node:http
3. I declare ```mime_types```

Now that everything in up and running, what happens when you try to reach the machine's IP at port 8080?

First, the request is forwarded from port 8080 on the local machine to port 80 in the webserver container.
Then


 

## Node Packages
> ### Child Process
> [Docs](https://nodejs.org/api/child_process.html)
>
> This package is being used so that I can run JS files in node, from other JS files in node. Basically, I'm running other NodeJS files as sub-proccesses of main.js

> ### HTTP
> [Docs](https://nodejs.org/api/http.html)
>
> Used for the webserver

> ### FS
> [Docs](https://nodejs.org/api/fs.html)
>
> Used for local file r/w

> ### Path
> [Docs](https://nodejs.org/api/path.html)
>
> Used to normalize paths to files

> ### WS
> [Docs](https://github.com/websockets/ws/blob/HEAD/doc/ws.md)
>
> This will be used to create websocket connections