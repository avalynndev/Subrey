const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const simply = require("simply-djs");

module.exports = {
  subCommand: "util.calc",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    simply.calculator(interaction, {
      slash: true,
      embedFoot: "©️ MatrixByte | Calculator",
    });
  },
};
