const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("create or manage a giveaway")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("create").setDescription("create a giveaway")
    )
    .addSubcommand((options) =>
      options
        .setName("manage")
        .setDescription("manage a giveaway")
        .addStringOption((option) =>
          option
            .setName("toggle")
            .setDescription("provide an option to manage")
            .setRequired(true)
            .addChoices(
              { name: "End", value: "end" },
              { name: "Pause", value: "pause" },
              { name: "Unpause", value: "unpause" },
              { name: "Reroll", value: "reroll" },
              { name: "Delete", value: "delete" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("provide the message ID of the giveaway")
            .setRequired(true)
        )
    ),
};
