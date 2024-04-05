const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("games")
    .setDescription("game related commands")
    .addSubcommand((options) =>
      options
        .setName("singleplayer")
        .setDescription("Play a single-player minigame within Discord.")
        .addStringOption((option) =>
          option
            .setName("game")
            .setDescription("*Choose a game to play.")
            .setRequired(true)
            .addChoices(
              { name: "2048", value: "2048" },
              { name: "Fast-Type", value: "fasttype" },
              { name: "Find-Emoji", value: "findemoji" },
              { name: "Flood", value: "flood" },
              { name: "Guess-The-Pokemon", value: "guessthepokemon" },
              { name: "Match-Pairs", value: "matchpairs" },
              { name: "Minesweeper", value: "minesweeper" },
              { name: "Rock-Paper-Scissors", value: "rps" },
              { name: "Slots", value: "slots" },
              { name: "Snake", value: "snake" },
              { name: "Trivia", value: "trivia" },
              { name: "Wordle", value: "wordle" },
              { name: "Would-You-Rather", value: "wouldyourather" }
            )
        )
    )
    .addSubcommand((options) =>
      options
        .setName("multiplayer")
        .setDescription("Play a multi-player minigame within Discord.")
        .addStringOption((option) =>
          option
            .setName("game")
            .setDescription("*Choose a game to play.")
            .setRequired(true)
            .addChoices(
              { name: "Connect-4", value: "connect4" },
              { name: "Rock-Paper-Scissors", value: "rps" },
              { name: "Tic-Tac-Toe", value: "tictactoe" }
            )
        )
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("*Choose your opponent for the game.")
            .setRequired(true)
        )
    ),
};
