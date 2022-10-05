const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tickets")
    .setDescription("ticket related commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName("setup")
        .setDescription("learn about my commands")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("channel to send the ticket message in")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption((option) =>
          option
            .setName("category")
            .setDescription("category to create the ticket in")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory)
        )
        .addRoleOption((option) =>
          option
            .setName("support-role")
            .setDescription("support role for the ticket")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("ticket-logs")
            .setDescription("channel to send the ticket logs")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addStringOption((option) =>
          option
            .setName("description")
            .setDescription("support role for the ticket")
            .setRequired(false)
        )
    )
    .addSubcommand((options) =>
      options.setName("delete").setDescription("delete the ticket system")
    ),
};
