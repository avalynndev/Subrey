const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song !")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("provide the song name")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const voice_channel_id = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;

    const VoiceChannel = interaction.member.voice.channel;
    const music = interaction.options.getString("song");

    if (!music)
      return interaction.reply(
        "`❌` | Provide a Song name or a link to play a Song."
      );

    let embed_1 = new EmbedBuilder()
      .setDescription(
        "`❌` | You must be in a voice channel to in order listen music."
      )
      .setColor("Random");
    if (!VoiceChannel)
      return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

    let embed_2 = new EmbedBuilder()
      .setDescription(`\`❌\` | I am being used in <#${voice_channel_id}>!`)
      .setColor("Random");
    if (voice_channel_id && VoiceChannel.id !== voice_channel_id)
      return interaction.reply({ embeds: [embed_2] }).catch((e) => {});

    try {
      client.distube.play(VoiceChannel, music, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
      let embed_3 = new EmbedBuilder()
        .setDescription("`✅` | Song fetched.")
        .setColor("Random");
      interaction.reply({ embeds: [embed_3] }).catch((e) => {});
    } catch (e) {
      const embed = new EmbedBuilder()
        .setDescription(
          `\`❌\` | Error: ${interaction.guild.me.voice.channelId}!`
        )
        .setColor("Random");
      interaction.reply({ embeds: [embed] }).catch((e) => {});
    }
  },
};
