const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.beg",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let personalBal = interaction.member.user.id;
    let users = ["PewDiePie", "Elon Musk", "Avalynn", "Beluga", "MrBeast"];
    let amount = Math.floor(Math.random() * 50) + 10;
    let beg = client.eco.beg(personalBal, amount, { canLose: true });

    if (beg.onCooldown)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `Begon Thot! Come back after ${beg.time.seconds} seconds.`
          ),
        ],
      });
    if (beg.lost)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `**${
              users[Math.floor(Math.random() * users.length)]
            }:** Begon Thot! Try again later.`
          ),
        ],
      });
    else
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `**${
              users[Math.floor(Math.random() * users.length)]
            }** donated you **${beg.amount}** 💷. Now you have **${
              beg.after
            }** 💷.`
          ),
        ],
      });
  },
};
