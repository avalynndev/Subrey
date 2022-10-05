const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "info.help",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setDescription("`Pinging...`")
      .setColor("Red");
    interaction.reply({ embeds: [embed] });
  },
};
