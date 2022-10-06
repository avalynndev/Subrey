const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.leaderboard",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let leaderboard = client.eco.leaderboard({ limit: 15, raw: false });
    if (!leaderboard || leaderboard.length < 1)
      return message.channel.send({ content: "`❌` | Empty Leaderboard!" });
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Leaderboard of ${interaction.guild.name}!`,
        iconURL: `https://camo.githubusercontent.com/fc0ed89db30f02a7810da3a391206976af1a026a6181c7ac8bfc3240e2c6f15e/68747470733a2f2f692e696d6775722e636f6d2f744756644668422e706e67`,
        url: "https://dsc.gg/matrixbyte",
      })
      .setColor("Random")
      .setTimestamp();
    leaderboard.forEach((u) => {
      embed.addFields({
        name: `${u.position}. ${
          client.users.cache.get(u.id)
            ? client.users.cache.get(u.id).tag
            : "Unknown#0000"
        }`,
        value: `${u.money} 💷`,
      });
    });
    return interaction.reply({ embeds: [embed] });
  },
};
