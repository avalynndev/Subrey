const {
  ChannelType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verification")
    .setDescription(
      "Add a extra layer of security to your guild. This command is only available for server owners."
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName("setup")
        .setDescription("Setup the verification channel bot!")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to send the verification message to.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("setrole")
        .setDescription("Setup the verification channel bot!")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Role to set the verification role to.")
            .setRequired(true)
        )
    ),
};
