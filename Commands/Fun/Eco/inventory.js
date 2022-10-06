const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "eco.inventory",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Inventory of ${interaction.member.user.tag}`,
        iconURL: `https://camo.githubusercontent.com/fc0ed89db30f02a7810da3a391206976af1a026a6181c7ac8bfc3240e2c6f15e/68747470733a2f2f692e696d6775722e636f6d2f744756644668422e706e67`,
        url: "https://dsc.gg/matrixbyte",
      })
      .setColor("Random")
      .setThumbnail()
      .setTimestamp();
    const x = client.db.get(`items_${interaction.member.user.id}`);
    if (!x) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder().setDescription(`No Items Found To Display`),
        ],
      });
    }
    const arrayToObject = x.reduce((itemsobj, x) => {
      itemsobj[x.name] = (itemsobj[x.name] || 0) + 1;
      return itemsobj;
    }, {});
    const result = Object.keys(arrayToObject).map((k) =>
      embed.setDescription(
        `Name: ${k}
Quantity: **${arrayToObject[k]}**`,
        false
      )
    );

    return interaction.reply({ embeds: [embed] });
  },
};
