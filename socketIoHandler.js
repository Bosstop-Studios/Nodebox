// @ts-nocheck
import { Server } from 'socket.io';
import { setTimeout } from 'node:timers/promises'
import fs from 'fs';
import moment from 'moment';
import { spawn } from 'node:child_process';
import path from 'path';

let servers = new Map();
let serverlogs = new Map();

function onAnySocket(socket, event, ...args) {
    let data = args[0];

    switch (event) {
        case 'start':
            startServer(socket, data.serverId);
            break;
        case 'restart':
            restartServer(socket, data.serverId);
            break;
        case 'stop':
            stopServer(socket, data.serverId);
            break;
    }

    if(event.includes("console-")) {
        let eventArgs = event.split("-");
        if(eventArgs[2] == "connect") socket.emit(`console-${eventArgs[1]}-connected`, { logs: serverlogs.get(eventArgs[1]), pid: servers.get(eventArgs[1]) ? servers.get(eventArgs[1]).pid : null });

        if(eventArgs[2] == "command") {
            console.log(data);
            let server = servers.get(eventArgs[1]);
            server.send(data);
        }

    }
    
}

async function startServer(socket, serverId) {

    if(servers.get(serverId)) return socket.emit(`console-${serverId}-serverMessage`, "Server already running");

    if(!serverlogs.get(serverId)) serverlogs.set(serverId, []);

    let server = null;
    let serverPath = `./servers/${serverId}/`;
    let dirs = await fs.readdirSync("./servers");

    dirs.forEach((dir) => {
        let files = fs.readdirSync(`./servers/${dir}`).filter(file => file == "nodebox.config.json");
        for( const file of files ) {
            let serverConfig = JSON.parse(fs.readFileSync(`./servers/${dir}/${file}`, "utf8"));
            if(serverConfig.id == serverId) server = serverConfig;
        }
    });
    
    let coffeeProcess = spawn(server.start, [path.join(__dirname, serverPath)], {
        cwd: path.join(__dirname, serverPath),
        shell: true
    });

    coffeeProcess.stdout.setEncoding('utf8');
    coffeeProcess.stderr.setEncoding('utf8');

    servers.set(serverId, coffeeProcess);

    console.log(`Starting process ${coffeeProcess.pid}`);
    console.log(`Server ID: ${serverId}`);
    console.log(coffeeProcess.connected)

    socket.emit(`console-${serverId}-start`, coffeeProcess.pid);
    messageLog(serverId, "Starting process...", "success");

    coffeeProcess.stdout.on('data', function(data) {
        socket.emit(`console-${serverId}-message`, data);
        messageLog(serverId, data, "normal");
    });

    coffeeProcess.stderr.on('data', function(data) {
        socket.emit(`console-${serverId}-message`, data);
        messageLog(serverId, data, "error");
    });

    coffeeProcess.on('exit', function(code) {
        console.log('closing code: ' + code);
        socket.emit(`console-${serverId}-exit`, "Process exited");
        messageLog(serverId, "Process exited", "error");
        if(servers.get(serverId)) servers.delete(serverId);
    });

}

async function restartServer(socket, serverId) {
    let server = servers.get(serverId);
    if(!server) return socket.emit(`console-${serverId}-serverMessage`, "Server not running");

    process.kill(server.pid, 9);
    servers.delete(serverId);
    socket.emit(`console-${serverId}-serverMessage`, "Restarting server...");

    await setTimeout(1000);

    startServer(socket, serverId);
}

function stopServer(socket, serverId) {
    let server = servers.get(serverId);
    if(server) {
        process.kill(server.pid, 9);

        servers.delete(serverId);
    } else {
        socket.emit(`console-${serverId}-serverMessage`, "Server not running");
    }
}

function messageLog(serverId, message, type) {
    let logs = serverlogs.get(serverId);
    if(!logs) logs = [];
    let data = { text: `[${moment().format('LTS')}] - ${message}`, type: type }; 
    if(logs.length > 50) logs.shift();
    logs.push(data);
    serverlogs.set(serverId, logs);
}

export default function injectSocketIO(server) {
    let io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        socket.onAny((event, ...args) => onAnySocket(socket, event, ...args));
    });

    console.log('SocketIO injected');
}