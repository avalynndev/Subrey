const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const simply = require("simply-djs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("the rps command")
    .addUserOption((option) =>
      option.setName("user").setDescription("Target @member").setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    simply.rps(interaction, {});
  },
};
