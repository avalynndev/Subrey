const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const joinSchema = require("../../../Schemas/joinSchema");
const mongoose = require("mongoose");

module.exports = {
  subCommand: "events.welcome",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const enableWelcomeMsg = interaction.options.getBoolean("enable");
    const channel = interaction.options.getChannel("channel");
    const joinSys = await joinSchema.findOne({
      guildId: interaction.guild.id,
    });

    if (!joinSys) {
      joinChannel = await new joinSchema({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: channel.id,
        messageEnable: enableWelcomeMsg,
      });

      await joinChannel.save().catch((err) => console.log(err));
      const successEmbed = new EmbedBuilder()
        .setDescription(
          `Welcome messages are now enabled in **${channel.name}**!`
        )
        .setColor("Green")
        .setTimestamp();
      await interaction.reply({
        embeds: [successEmbed],
        ephemeral: true,
      });
    }
    if (joinSys) {
      await joinSchema.findOneAndUpdate(
        { guildId: interaction.guild.id },
        { channelId: channel.id }
      );
      const successEmbed = new EmbedBuilder()
        .setDescription(
          `Welcome messages have been updated to **${channel.name}**!`
        )
        .setColor("Green")
        .setTimestamp();

      await interaction.reply({
        embeds: [successEmbed],
        ephemeral: true,
      });
    }
  },
};
