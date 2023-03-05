const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  subCommand: "nsfw.pussy",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction) {
    superagent
      .get("https://nekobot.xyz/api/image")
      .query({ type: "pussy" })
      .end((err, response) => {
        if (interaction.channel.nsfw === false) {
          const embed = new EmbedBuilder()
            .setImage(
              "https://images-ext-1.discordapp.net/external/LOgNjwdNZQpFLZ5OMEBOnHd55FTz2Velsj8XxlJgUxs/https/images-ext-2.discordapp.net/external/hiWbEzhiEXfFaza5khoxg3mR3OWeugZwWo8vGxK8LzA/https/i.imgur.com/oe4iK5i.gif?width=672&height=117"
            )
            .setColor("#00ffb3")
            .setDescription(
              "Use NSFW commands in a NSFW marked channel (look in channel settings, dummy)"
            );
          interaction.reply({ embeds: [embed] });
        } else {
          const embed = new EmbedBuilder()
            .setImage(response.body.message)
            .setColor("#00ffb3");
          interaction.reply({ embeds: [embed] });
        }
      });
  },
};
