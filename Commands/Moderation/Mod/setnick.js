const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "mod.setnick",
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const args = interaction.options._hoistedOptions;

    const user = args.find((x) => x.name === "user");
    const nickname = args.find((x) => x.name === "nickname");

    const embed = new EmbedBuilder().setColor("DarkAqua");

    if (!user.member.manageable && user.member.id !== client.user.id) {
      embed.setDescription(
        `<a:cross:962971482856779796> | I Cant Change ${user.member.toString()}'s Nickname`
      );
      return interaction.reply({ embeds: [embed] });
    }

    const oldNick = user.member.nickname
      ? user.member.nickname
      : user.member.user.username;

    await user.member.setNickname(nickname.value);
    embed.setDescription(
      `<a:tick:962971483443986472> |  Successfully Changed ${oldNick}'s Nickname to ${user.member.toString()}`
    );
    await interaction.reply({ embeds: [embed] });
  },
};
