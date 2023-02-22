const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("anime related commands")
    .addSubcommand((options) =>
      options.setName("hug").setDescription("give a anime hug")
    )
    .addSubcommand((options) =>
      options.setName("pat").setDescription("give a anime pat")
    )
    .addSubcommand((options) =>
      options.setName("wink").setDescription("give a anime wink")
    )  
};
