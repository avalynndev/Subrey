const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const schema = require("../../../Schemas/currencySchema");

module.exports = {
  subCommand: "eco.balance",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    const balanceEmbed = new EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`__${user.username}\'s Balance__`)
      .setDescription(
        `<:arrow:974632156255109130> Wallet: **${data.wallet.toLocaleString()}**\n<:arrow:974632156255109130> Bank: **${data.bank.toLocaleString()}**`
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [balanceEmbed],
    });

    /**    const embed = new EmbedBuilder()
      .setTitle(`Balance`)
      .setDescription(
        `User: <@${userBalance.user}>
Balance: ${userBalance.amount} 💸
Position: ${userBalance.position}`
      )
      .setColor("Random")
      .setThumbnail(USER.displayAvatarURL())
      .setTimestamp();
    interaction.reply({ embeds: [embed] });*/
  },
};
