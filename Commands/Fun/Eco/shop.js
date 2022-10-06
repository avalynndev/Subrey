const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.shop",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let items = Object.keys(client.shop);
    let content = "";

    for (var i in items) {
      content += `${items[i]} - 💷 ${client.shop[items[i]].cost}\n`;
    }

    let embed = new EmbedBuilder()
      .setTitle("Store")
      .setDescription(content)
      .setColor("Blurple")
      .setFooter({
        text: "Do `/buy <item>` to purchase the item.",
        iconURL:
          "https://camo.githubusercontent.com/fc0ed89db30f02a7810da3a391206976af1a026a6181c7ac8bfc3240e2c6f15e/68747470733a2f2f692e696d6775722e636f6d2f744756644668422e706e67",
      });
    return interaction.reply({ embeds: [embed] });
  },
};
