const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "`❌` This Command In Outdated.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "735059235141845003")
      return interaction.reply({
        content: "`❌` This Command is only Available to the Developer",
        ephemeral: true,
      });

    if (interaction.isSelectMenu()) {
      await interaction.deferUpdate();
    }

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile)
        return interaction.reply({
          content: "`❌` This SubCommand is Outdated.",
          ephemeral: true,
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
