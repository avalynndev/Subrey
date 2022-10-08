const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the song."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    try {
      const VoiceChannel = interaction.member.voice.channel;
      const queue = await client.distube.getQueue(VoiceChannel);
      let embed_1 = new EmbedBuilder()
        .setDescription(
          "`❌` | You have to be in a voice channel in order to use this comamnd."
        )
        .setColor("Random");
      if (!VoiceChannel)
        return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

      let embed_2 = new EmbedBuilder()
        .setDescription("`✅` | Skipped the song.")
        .setColor("Random");

      if (!queue || !queue.songs || queue.songs.length == 0)
        return interaction.reply("`❌` | I am not playing anything.");
      await queue.skip(VoiceChannel);
      interaction.reply({ embeds: [embed_2] }).catch((e) => {});
    } catch (err) {
      let embed_3 = new em()
        .setDescription(
          `\`❌\` | Can't skip song because there is no next song in the queue.`
        )
        .setColor("Random");
      interaction.reply({ embeds: [embed_3] }).catch((e) => {});
      console.log(err);
    }
  },
};
