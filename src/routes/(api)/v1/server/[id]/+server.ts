// @ts-nocheck
import { exec, spawn } from "child_process";
import fs from "fs";

//import { getSocketIO } from "../../../../../../socketIoHandler.js";
 
/** @type {import('./$types').RequestHandler} */
export async function POST(all) {
    const { action, serverId } = await all.request.json();
    
    let server = null;
    let dirs = await fs.readdirSync("./servers");

    dirs.forEach((dir) => {
        let files = fs.readdirSync(`./servers/${dir}`).filter(file => file == "nodebox.config.json");
        for( const file of files ) {
            let serverConfig = JSON.parse(fs.readFileSync(`./servers/${dir}/${file}`, "utf8"));
            if(serverConfig.id == serverId) server = serverConfig;
        }
    });

    try {
        if (action === 1) {

            let coffeeProcess = exec(server.start, {
                cwd: `./servers/test`,
            });

            coffeeProcess.stdout.on('data', function(data) {
                //getSocketIO().broadcast.emit(`console-${serverId}`, data);
                console.log(data);
            });
     
            coffeeProcess.stderr.on('data', function(data) {
                console.log(data);
            });
     
        }
    } catch (error) {
        return new Response(JSON.stringify({ status: 500, error: error.message }));
    }

    return new Response(JSON.stringify({ status: 200 }));
}