const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
  intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "PLAYING" }],
    status: "dnd",
  },
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {}).then(() => console.log("Database ✅"));

loadEvents(client);

client.login(client.config.token);
