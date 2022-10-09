const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { embedPages } = require("../../Handlers/pages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("the help command"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const embeds = [
      new EmbedBuilder()
        .setTitle("Page 1")
        .setDescription("This is page 1")
        .setColor("Blue"),

      new EmbedBuilder()
        .setTitle("Page 1")
        .setDescription("This is page 1")
        .setColor("Blue"),
    ];

    await embedPages(interaction, embeds);
  },
};
