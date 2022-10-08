const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the song."),
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
        "`❌` | You have be in a voice channel in order to listen music."
      )
      .setColor("Random");
    if (!VoiceChannel)
      return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

    let embed_2 = new EmbedBuilder()
      .setDescription("`✅` | Song is paused.")
      .setColor("Random");

    try {
      if (!queue || !queue.songs || queue.songs.length == 0)
        return interaction.reply("`❌` | I am not playing anything.");
      queue.pause(VoiceChannel);
      return interaction.reply({ embeds: [embed_2] }).catch((e) => {});
    } catch (e) {
      const embed = new EmbedBuilder()
        .setDescription(
          `\`❌\` | Error: ${interaction.guild.me.voice.channelId}!`
        )
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] }).catch((e) => {});
      console.log(e);
    }
  },
};
