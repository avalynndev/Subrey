const {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Sets song's volume")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("provide the song volume")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction) {
    const VoiceChannel = interaction.member.voice.channel;
    const Volume = interaction.options.getNumber("number");

    let embed_1 = new EmbedBuilder()
      .setDescription(
        "`❌` | You have to be in a voice channel in order to listen music."
      )
      .setColor("Random");
    if (!VoiceChannel)
      return interaction.reply({ embeds: [embed_1] }).catch((e) => {});

    let embed_2 = new EmbedBuilder()
      .setDescription(`\`✅\` | Set volume to ${Volume}%`)
      .setColor("Random");

    try {
      if (Volume > 100 || Volume < 1)
        return interaction.reply("`❌` | Choose between 0 to 100");
      client.distube.setVolume(VoiceChannel, Volume);
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
