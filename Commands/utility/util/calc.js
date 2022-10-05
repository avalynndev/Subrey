const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const plexus = require("plexus-djs14");

module.exports = {
  subCommand: "util.calc",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    plexus.calculator(interaction, {
      slash: true,
      embedFoot: "©️ MatrixByte | Calculator",
    });
  },
};
