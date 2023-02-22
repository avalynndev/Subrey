const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  const ms = require("ms");
  const schema = require("../../../Schemas/currencySchema");
  
  module.exports = {
    subCommand: "eco.addcoins",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    async execute(interaction, client) {
        const permission = interaction.member.permissions.has(
            PermissionFlagsBits.ManageGuild
          );
          let user = interaction.options.getUser("user");
          let amount = interaction.options.getInteger("amount");
      
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
            console.log(err);
            await interaction.reply({
              content: "There was an error while executing this command...",
              ephemeral: true,
            });
          }
      
          if (!permission) {
            await interaction.reply({
              content: "You don't have the permissions to use this command...",
              ephemeral: true,
            });
          } else {
            data.wallet += amount * 1;
            await data.save();
      
            const addcoinsEmbed = new EmbedBuilder()
              .setColor("#0155b6")
              .setDescription(
                `You added **:coin: ${amount.toLocaleString()}** in **${
                  user.username
                }'s** wallet`
              );
      
            await interaction.reply({
              embeds: [addcoinsEmbed],
            });
          }
    },
  };
  