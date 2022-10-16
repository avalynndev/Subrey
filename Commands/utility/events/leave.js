const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const leaveSchema = require("../../../Schemas/leaveSchema");
const mongoose = require("mongoose");

module.exports = {
  subCommand: "events.leave",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const enableLeaveMsg = interaction.options.getBoolean("enable");
    const channel = interaction.options.getChannel("channel");
    const leaveSys = await leaveSchema.findOne({
      guildId: interaction.guild.id,
    });

    if (!leaveSys) {
      leaveChannel = await new leaveSchema({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: channel.id,
        messageEnable: enableLeaveMsg,
      });

      await leaveChannel.save().catch((err) => console.log(err));
      const successEmbed = new EmbedBuilder()
        .setDescription(
          `Leave messages have now been enabled in **${channel.name}**!`
        )
        .setColor("Green");
      await interaction.reply({
        embeds: [successEmbed],
        ephemeral: true,
      });
    }
    if (leaveSys) {
      await leaveSchema.findOneAndUpdate(
        { guildId: interaction.guild.id },
        { channelId: channel.id }
      );
      const successEmbed = new EmbedBuilder()
        .setDescription(
          `Leave messages have been updated to **${channel.name}**!`
        )
        .setColor("Green");

      await interaction.reply({
        embeds: [successEmbed],
        ephemeral: true,
      });
    }
  },
};
