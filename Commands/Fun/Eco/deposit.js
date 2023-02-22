const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  const ms = require("ms");
  const schema = require("../../../Schemas/currencySchema");
  
  module.exports = {
    subCommand: "eco.deposit",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    async execute(interaction, client) {
        let depositAmount = interaction.options.getInteger("deposit_amount");

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
    
        if (depositAmount > data.wallet) {
          await interaction.reply({
            content: "You don't have that much coins in your wallet to deposit.",
          });
        } else if (depositAmount <= 0) {
          await interaction.reply({
            content: "Please enter a number above 0.",
          });
        } else {
          data.wallet -= depositAmount * 1;
          data.bank += depositAmount * 1;
          await data.save();
    
          const depositEmbed = new EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `Successfully deposited **:coin: ${depositAmount.toLocaleString()}** into the bank`
            );
    
          await interaction.reply({
            embeds: [depositEmbed],
          });
        }
    },
  };
  