const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const plexus = require("plexus-djs14");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("the help command")
    .addUserOption((option) =>
      option.setName("user").setDescription("Target @member").setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    plexus.rps(interaction, {});
  },
};
