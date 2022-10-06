const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.work",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let personalBal = interaction.member.user.id;
    let amount = Math.floor(Math.random() * 1500) + 1000;
    let work = client.eco.work(personalBal, amount);
    if (work.onCooldown)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You are tired right now. Come back after ${work.time.minutes} minutes & ${work.time.seconds} seconds to work again.`
          ),
        ],
      });
    else
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `You worked as **${work.workedAs}** and earned **${work.amount}** 💷. Now you have **${work.after}** 💷.`
          ),
        ],
      });
  },
};
