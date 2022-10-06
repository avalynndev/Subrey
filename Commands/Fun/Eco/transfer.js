const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.transfer",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let member = interaction.options.getMember("user");
    let authordata = client.eco.fetchMoney(interaction.member.user.id);
    let amount = interaction.options.getString("amount");
    if (isNaN(amount))
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            "Please enter a valid amount to transfer"
          ),
        ],
      });
    if (authordata.amount < amount)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            "Looks like you don't have that much money"
          ),
        ],
      });
    await client.eco.transfer(interaction.member.user.id, member.id, amount);
    return interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          `You have successfully transferred 💷**${amount}** to ** ${member.user.tag}**.`
        ),
      ],
    });
  },
};
