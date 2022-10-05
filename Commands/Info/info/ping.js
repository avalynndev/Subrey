const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "info.ping",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setDescription("`Pinging...`")
      .setColor("Red");
    const msg = await interaction.reply({ embeds: [embed] });
    const timestamp = interaction.editedTimestamp
      ? interaction.editedTimestamp
      : interaction.createdTimestamp;
    const latency = `  ${Math.floor(msg.createdTimestamp - timestamp)} ms`;
    const apiLatency = `  ${interaction.client.ws.ping - 19} ms`;
    embed
      .setDescription(
        `\`\`\`nim\nWebsocket Latency :: ${latency}\nAPI Latency       :: ${apiLatency}\`\`\``
      )
      .setAuthor({
        name: `${client.user.username}`,
        iconURL: `${client.user.displayAvatarURL()}`,
        url: "https://dsc.gg/matrixbyte",
      });
    interaction.editReply({ embeds: [embed] });
  },
};
