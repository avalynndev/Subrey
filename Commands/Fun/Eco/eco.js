const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eco")
    .setDescription("economy related commands")
    .addSubcommand((options) =>
      options.setName("work").setDescription("work per hour to get money")
    )
    .addSubcommand((options) =>
      options.setName("weekly").setDescription("get a weekly amount")
    )
    .addSubcommand((options) =>
      options
        .setName("transfer")
        .setDescription("give your money to others")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription(
              "choose a member whome you want to give/transfer money"
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("amount")
            .setDescription("specify the money to be given")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options.setName("shop").setDescription("buy things from shop")
    )
    .addSubcommand((options) =>
      options
        .setName("buy")
        .setDescription("buy things from shop")
        .addStringOption((option) =>
          option
            .setName("item")
            .setDescription("name of the item you want to purchase")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("leaderboard")
        .setDescription("see who is on the top ranking")
    )
    .addSubcommand((options) =>
      options.setName("inventory").setDescription("check your inventory")
    )
    .addSubcommand((options) =>
      options.setName("daily").setDescription("claim your daily money")
    )
    .addSubcommand((options) =>
      options.setName("beg").setDescription("beg to get some money (maybe)")
    )
    .addSubcommand((options) =>
      options
        .setName("balance")
        .setDescription("check balance of others or yours")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("user to get balance of")
            .setRequired(false)
        )
    ),
};
