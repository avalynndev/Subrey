const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("util")
    .setDescription("utility commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("calc").setDescription("learn about my commands")
    )
    .addSubcommand((options) =>
      options.setName("embed").setDescription("create a embed")
    )
    .addSubcommand((options) =>
      options
        .setName("qrcode")
        .setDescription("generate a qrcode with a link")
        .addStringOption((option) =>
          option
            .setName("link")
            .setDescription("the Link to generate a qr code from")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options.setName("quotes").setDescription("want a motivation ? use me")
    )
    .addSubcommand((options) =>
      options
        .setName("youtube")
        .setDescription("search for a youtube video")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("the search query")
            .setRequired(true)
        )
    ),
};
