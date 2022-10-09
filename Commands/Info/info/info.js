const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("information related commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("ping").setDescription("check your ping")
    )
    .addSubcommand((options) =>
      options
        .setName("userinfo")
        .setDescription("gets the info of a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to get the info of...")
            .setRequired(true)
        )
    ),
};
