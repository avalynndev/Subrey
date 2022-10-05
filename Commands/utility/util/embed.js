const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const plexus = require("plexus-djs14");

module.exports = {
  subCommand: "util.embed",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    plexus.embedCreate(interaction, {
      slash: true,
      embedFoot: "©️ MatrixByte | Calculator",
    });
  },
};
