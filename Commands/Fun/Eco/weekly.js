const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.weekly",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let personalBal = interaction.member.user.id;
    let amount = Math.floor(Math.random() * 1000) + 500;
    let addMoney = client.eco.weekly(personalBal, amount);
    if (addMoney.onCooldown)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You have already claimed your weekly credit. Come back after ${addMoney.time.days} days, ${addMoney.time.hours} hours, ${addMoney.time.minutes} minutes & ${addMoney.time.seconds} seconds to claim it again.`
          ),
        ],
      });
    else
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You have claimed **${addMoney.amount}** 💷 as your weekly credit & now you have **${addMoney.after}** 💷. But you will lose your balance if you do not vote for this bot 😂 Just kidding.`
          ),
        ],
      });
  },
};
