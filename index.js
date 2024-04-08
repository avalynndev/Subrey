const { Client, Collection, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
require("dotenv").config();

// Env Defines //
databaseuri = process.env.DatabaseURL;
token = process.env.TOKEN;

const client = new Client({
  intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "Watching" }],
    status: "dnd",
  },
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(databaseuri, {}).then(() => console.log("Database ✅"));

loadEvents(client);

client.login(token);
