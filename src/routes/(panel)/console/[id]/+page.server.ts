// @ts-nocheck
import fs from "fs";
import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (params.id) {

        let server = null;
        let dirs = await fs.readdirSync("./servers");

        dirs.forEach((dir) => {
            let files = fs.readdirSync(`./servers/${dir}`).filter(file => file == "nodebox.config.json");
            for( const file of files ) {
                let serverConfig = JSON.parse(fs.readFileSync(`./servers/${dir}/${file}`, "utf8"));
                if(serverConfig.id == params.id) server = serverConfig;
            }
        });

        if(server == null) throw error(404, 'Server Not found');

        return {
            id: params.id,
            server: server
        };
    }
 
    throw error(404, 'Server Not found');
}