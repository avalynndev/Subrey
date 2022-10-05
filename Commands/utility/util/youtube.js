const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const Scraper = require("@yimura/scraper").default;
const youtube = new Scraper();

module.exports = {
  subCommand: "util.youtube",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const next = new ButtonBuilder()
      .setStyle("Success")
      .setLabel("Next")
      .setCustomId("next");
    const row = new ActionRowBuilder().addComponents(next);
    const q = interaction.options.getString("name");
    const array = await youtube.search(q);
    let index = 0;
    const makeEmbed = (ind) => {
      return new EmbedBuilder()
        .setURL(array.videos[ind].link)
        .setTitle(array.videos[ind].title)
        .setDescription(
          `Views: ${array.videos[ind].views} | Uploaded ${array.videos[ind].uploaded}`
        )
        .setColor("Red")
        .setImage(array.videos[ind].thumbnail);
    };
    interaction.reply({
      embeds: [makeEmbed(index)],
      components: [row],
      ephemeral: true,
    });
    const filter = (i) =>
      i.customId === "next" && i.user.id === interaction.member.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 50000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "next") {
        index++;
        if (index === array.videos.length)
          return i.update({
            content: "You've Reached The End!",
            embeds: [],
            components: [],
            ephemeral: true,
          });
        await i.update({
          content: `${index}/${array.videos.length}`,
          embeds: [makeEmbed(index)],
          components: [row],
          ephemeral: true,
        });
      }
    });
  },
};
