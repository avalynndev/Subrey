const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("mod related commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName("ban")
        .setDescription("reload your events")
        .addUserOption((option) =>
          option
            .setName("mention")
            .setDescription("the user you want to ban")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("kick")
        .setDescription("reload your commands")
        .addUserOption((option) =>
          option
            .setName("mention")
            .setDescription("the user you want to kick")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("setnick")
        .setDescription("sets a nickname to a use")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to change the nickname of")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("nickname")
            .setDescription("the new nickname")
            .setRequired(true)
        )
    ),
};
