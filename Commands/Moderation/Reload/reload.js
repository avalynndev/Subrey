const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("reload the commands/events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("reload your events")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("reload your commands")
    ),
};
