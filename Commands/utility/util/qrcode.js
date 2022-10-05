const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "util.qrcode",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const { Utils } = require("disc-plexus");
    const util = new Utils({
      args: args,
      slashCommand: true,
      interaction: interaction,
      embedFooter: "Made With disc-plexus",
      embedTitle: "Generated A QR Code",
      embedColor: "RANDOM",
    });
    util.qrcode();
  },
};
