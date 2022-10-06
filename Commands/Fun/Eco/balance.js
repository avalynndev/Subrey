const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.balance",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let USER = interaction.options.getMember("user");
    let personalBal = client.eco.fetchMoney(interaction.member.user.id);

    if (!USER)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Balance`)
            .setDescription(
              `User: <@${personalBal.user}>
Balance: ${personalBal.amount} 💸
Position: ${personalBal.position}`
            )
            .setThumbnail(interaction.member.user.displayAvatarURL()),
        ],
      });

    let userBalance = client.eco.fetchMoney(USER.id);
    const embed = new EmbedBuilder()
      .setTitle(`Balance`)
      .setDescription(
        `User: <@${userBalance.user}>
Balance: ${userBalance.amount} 💸
Position: ${userBalance.position}`
      )
      .setColor("Random")
      .setThumbnail(USER.displayAvatarURL())
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
