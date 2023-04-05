// @ts-nocheck
import fs from "fs";

/** @type {import('./$types').PageLoad} */
export async function load({}) {
    let servers = [];
    let dirs = await fs.readdirSync("./servers");

    dirs.forEach((dir) => {
        let files = fs.readdirSync(`./servers/${dir}`).filter(file => file == "nodebox.config.json");
        for( const file of files ) {
            let server = fs.readFileSync(`./servers/${dir}/${file}`, "utf8");
            servers.push(JSON.parse(server));
        }
    });

    return { servers };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        return;
    }
};