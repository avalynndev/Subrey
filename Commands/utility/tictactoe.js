const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  
  const simply = require("simply-djs");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("tictactoe")
      .setDescription("play tictactoe with your friends")
      .addUserOption((option) =>
        option.setName("user").setDescription("Target @member").setRequired(false)
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    async execute(interaction, client) {
        simplydjs.tictactoe(interaction, { })
    },
  };
  