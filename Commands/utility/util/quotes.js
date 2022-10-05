const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "util.quotes",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    var fortunes = [
      "Our lives are the only meaningful expression of what we believe and in Whom we believe. And the only real wealth, for any of us, lies in our faith.",
      "Genius is one percent inspiration and ninety-nine percent perspiration.",
      "You can observe a lot just by watching.",
      "A house divided against itself cannot stand.",
      "Difficulties increase the nearer we get to the goal.",
      "Fate is in your hands and no one elses",
      "Be the chief but never the lord.",
      "Nothing happens unless first we dream.",
      "Well begun is half done.",
      "Life is a learning experience, only if you learn.",
      "Self-complacency is fatal to progress.",
      "Peace comes from within. Do not seek it without.",
      "What you give is what you get.",
      "We can only learn to love by loving.",
      "Life is change. Growth is optional. Choose wisely.",
      "You'll see it when you believe it.",
      "Today is the tomorrow we worried about yesterday.",
      "It's easier to see the mistakes on someone else's paper.",
      "Every man dies. Not every man really lives.",
      "To lead people walk behind them.",
      "Having nothing, nothing can he lose.",
    ];
    interaction.reply({
      content: fortunes[Math.floor(Math.random() * fortunes.length)],
    });
  },
};
