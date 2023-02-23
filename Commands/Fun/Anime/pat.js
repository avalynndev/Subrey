const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  subCommand: "anime.pat",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const url = "https://some-random-api.ml/animu/pat";

    axios.default.get(url).then(async (res) => {
      await interaction
        .reply({
          content: `${res.data.link}`,
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    });
  },
};
