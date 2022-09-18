const colors = require("colors");
const { Client, Collection } = require('discord.js'); 
const Topgg = require('@top-gg/sdk')
require('dotenv').config();

const client = new Client({
	intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "PLAYING" }],
    status: "dnd"
  },
});

// client.votecmd = new Topgg.Api("TOP_GG API")
client.config = require('./botconfig/config.json');
client.slashcommands = new Collection();

client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;

['events', 'slashcommands'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);