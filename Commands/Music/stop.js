const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the song"),
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
        "`❌` | You have to be in a voice channel in order to to use this command."
      )
      .setColor("Random");
    if (!VoiceChannel)
      return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

    let embed_2 = new EmbedBuilder()
      .setDescription("`✅` | Stopped the song.")
      .setColor("Random");

    try {
      if (!queue || !queue.songs || queue.songs.length == 0)
        return interaction
          .reply("`❌` | I am not playing anything.")
          .catch((e) => {});
      queue.stop(VoiceChannel);
      return interaction.reply({ embeds: [embed_2] }).catch((e) => {});
    } catch (e) {
      const embed = new EmbedBuilder()
        .setDescription(
          `\`❌\` | Error: ${interaction.guild.me.voice.channelId}!`
        )
        .setColor("Random");
      interaction.reply({ embeds: [embed] }).catch((e) => {});
      console.log(e);
    }
  },
};
