const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("util")
    .setDescription("utility commands")
    .addSubcommand((options) =>
      options.setName("calc").setDescription("learn about my commands")
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
