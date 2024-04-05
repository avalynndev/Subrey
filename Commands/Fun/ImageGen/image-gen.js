const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image-gen")
    .setDescription("anime related commands")
    .addSubcommand((options) =>
      options
        .setName("abandon")
        .setDescription("give a anime pat")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("the targett")
            .setRequired(true)
        )
    ),
};
