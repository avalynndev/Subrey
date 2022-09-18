let slashcommands = []
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const { MessageEmbed } = require('discord.js');
// Create a new Ascii table
let table = new ascii("Slash Commands");
table.setHeading("Commands", "Load status");
module.exports = (client) => {
    readdirSync("./SlashCommands/").forEach(dir => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../SlashCommands/${dir}/${file}`);
    
            if (pull.name) {
                client.slashcommands.set(pull.name, pull);
                slashcommands.push(pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌`);
                continue;
            }
    
            }
    });
    
    console.log(table.toString().rainbow);


client.on("ready", async ()=> {
await client.application.commands.set(slashcommands)
})
}