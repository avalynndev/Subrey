const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("events")
    .setDescription("events related commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("leave")
        .setDescription("Set or replace the leave message channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to send the leave message to.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("enable")
            .setDescription("Enable leave messages")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("welcome")
        .setDescription("Set or replace the welcome message channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to send the message to.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("enable")
            .setDescription("Enable welcome messages")
            .setRequired(true)
        )
    ),
};
