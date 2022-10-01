const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.username} is Online ✅`);

    loadCommands(client);
  },
};
