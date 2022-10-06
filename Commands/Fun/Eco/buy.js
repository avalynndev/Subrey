const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.buy",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let userBalance = client.eco.fetchMoney(interaction.member.user.id);
    if (userBalance.amount < 1)
      return interaction.reply({
        embeds: [new EmbedBuilder().setDescription("Looks like you are poor.")],
      });
    let item = interaction.options.getString("item");
    if (!item)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription("What are you trying to buy?"),
        ],
      });
    let hasItem = client.shop[item.toLowerCase()];
    if (!hasItem || hasItem == undefined)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription("That item doesn't exist lol."),
        ],
      });
    let isBalanceEnough = userBalance.amount >= hasItem.cost;
    if (!isBalanceEnough)
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            "Your balance is insufficient. You need 💷 " +
              hasItem.cost +
              " to buy this item."
          ),
        ],
      });
    let buy = client.eco.removeMoney(interaction.member.user.id, hasItem.cost);

    let itemStruct = {
      name: item.toLowerCase(),
      prize: hasItem.cost,
    };

    client.db.push(`items_${interaction.member.user.id}`, itemStruct);
    return interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription(
          `You purchased **${item}** for **💷 ${hasItem.cost}**.`
        ),
      ],
    });
  },
};
