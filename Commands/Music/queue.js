const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows queue in the server."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const VoiceChannel = interaction.member.voice.channel;
    const queue = await client.distube.getQueue(VoiceChannel);

    let embed_1 = new EmbedBuilder()
      .setDescription(
        "`❌` | You must be in a voice channel to in order to use this command."
      )
      .setColor("Random");
    if (!VoiceChannel)
      return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

    let embed_2 = new EmbedBuilder()
      .setDescription(
        `${queue.songs.map(
          (song, id) =>
            `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        )}`
      )
      .setColor("Random");

    if (queue) {
      interaction.reply({ embeds: [embed_2] }).catch((e) => {});
    }
    if (!queue || !queue.songs || queue.songs.length == 0)
      return interaction
        .reply("`❌` | I am not playing anything.")
        .catch((e) => {});
  },
};
