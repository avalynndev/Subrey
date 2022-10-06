const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.daily",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let personalBal = interaction.member.user.id;
    let amount = Math.floor(Math.random() * 500) + 100;
    let addMoney = client.eco.daily(personalBal, amount);
    if (addMoney.onCooldown)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You have already claimed your daily credit. Come back after ${addMoney.time.hours} hours, ${addMoney.time.minutes} minutes & ${addMoney.time.seconds} seconds to claim it again.`
          ),
        ],
      });
    else
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You have claimed **${addMoney.amount}** 💷 as your daily credit & now you have **${addMoney.after}** 💷.`
          ),
        ],
      });
  },
};
