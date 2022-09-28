const client = require(`../../index`);

module.exports = {
  name: "ready",
  once: true,
  execute() {
    console.log(`Bot is Online ✅`);
  },
};
