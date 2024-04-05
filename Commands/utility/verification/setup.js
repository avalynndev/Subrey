const { CommandInteraction } = require("discord.js");

module.exports = {
  subCommand: "verification.setup",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply({
      content: "Successfully setup the verification channel!",
    });
  },
};
