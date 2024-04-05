const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eco")
    .setDescription("Economy related commands")

    // Work command
    .addSubcommand((options) =>
      options
        .setName("work")
        .setDescription("Work to get money")
        .addStringOption((option) =>
          option
            .setName("job")
            .setDescription("Select a job")
            .addChoices(
              { name: "Software Developer", value: "Software Developer" },
              { name: "Data Scientist", value: "Data Scientist" },
              { name: "Doctor", value: "doctor" },
              { name: "Waiter", value: "Waiter" },
              { name: "Painter", value: "Painter" }
            )
            .setRequired(true)
        )
    )

    // Add coins command
    .addSubcommand((options) =>
      options
        .setName("addcoins")
        .setDescription("Add coins in a user's wallet")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Select a user")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Enter the amount you want to add")
            .setRequired(true)
        )
    )

    // Deposit command
    .addSubcommand((options) =>
      options
        .setName("deposit")
        .setDescription("Deposit your coins in the bank")
        .addIntegerOption((option) =>
          option
            .setName("deposit_amount")
            .setDescription("Enter the deposit amount")
            .setRequired(true)
        )
    )

    // Withdraw command
    .addSubcommand((options) =>
      options
        .setName("withdraw")
        .setDescription("Withdraw your coins from the bank")
        .addIntegerOption((option) =>
          option
            .setName("withdraw_amount")
            .setDescription("Enter the withdraw amount")
            .setRequired(true)
        )
    )

    // Search command
    .addSubcommand((options) =>
      options
        .setName("search")
        .setDescription("Search for some coins")
        .addStringOption((option) =>
          option
            .setName("search_location")
            .setDescription("Select a location to search")
            .addChoices(
              { name: "Car", value: "Car" },
              { name: "Bike", value: "Bike" },
              { name: "Wallet", value: "Wallet" },
              { name: "Pocket", value: "Pocket" },
              { name: "Computer", value: "Computer" },
              { name: "Keyboard", value: "Keyboard" },
              { name: "Laptop", value: "Laptop" },
              { name: "Desk", value: "Desk" },
              { name: "Shoe", value: "Shoe" },
              { name: "Sock", value: "Sock" }
            )
            .setRequired(true)
        )
    )

    // Other commands
    .addSubcommand((options) =>
      options
        .setName("chopwood")
        .setDescription("Chop wood in the forest and get some coins")
    )
    .addSubcommand((options) =>
      options
        .setName("fish")
        .setDescription("Catch some fish and get some coins")
    )
    .addSubcommand((options) =>
      options
        .setName("hunt")
        .setDescription("Hunt some animals and get some coins")
    )
    .addSubcommand((options) =>
      options.setName("weekly").setDescription("Get a weekly amount")
    )
    .addSubcommand((options) =>
      options.setName("daily").setDescription("Claim your daily money")
    )
    .addSubcommand((options) =>
      options.setName("beg").setDescription("Beg to get some money (maybe)")
    )
    .addSubcommand((options) =>
      options
        .setName("balance")
        .setDescription("Check the balance of others or yourself")
        .addUserOption((option) =>
          option.setName("user").setDescription("User to get balance of")
        )
    ),
};
