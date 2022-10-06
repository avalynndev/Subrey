const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { Manager, db } = require("quick.eco");
const client = new Client({
  intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "PLAYING" }],
    status: "dnd",
  },
});

const { loadEvents } = require("./Handlers/eventHandler");

client.eco = new Manager();
client.db = db;
client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();
client.shop = {
  laptop: {
    cost: 2000,
  },
  mobile: {
    cost: 1000,
  },
  computer: {
    cost: 3000,
  },
  shoes: {
    cost: 500,
  },
  watch: {
    cost: 200,
  },
  mystery_box: {
    cost: 5000,
  },
};

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {}).then(() => console.log("Database ✅"));

loadEvents(client);

client.login(client.config.token);
