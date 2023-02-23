const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const schema = require("../../../Schemas/currencySchema");

module.exports = {
  subCommand: "eco.work",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    let job = interaction.options.getString("job");
    let amount = Math.floor(Math.random() * 5000) + 500;

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    let timeout = 3600000;

    if (timeout - (Date.now() - data.workTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

      await interaction.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.workTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const workEmbed = new EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You worked as a **${job}** and earned **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [workEmbed],
      });
    }
  },
};
