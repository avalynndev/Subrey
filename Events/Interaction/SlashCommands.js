const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This Command In Outdated.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "735059235141845003")
      return interaction.reply({
        content: "This Command is only Available to the Developer",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};
