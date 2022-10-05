const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "mod.kick",
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const id = interaction.options.getString("id");
    const reason = interaction.options.getString("reason");
    const member = interaction.options.getMember("mention");
    const infperms = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        "<a:cross:962971482856779796> | You dont have permissions to execute this command!"
      );

    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply({ embeds: [infperms] }).catch((err) => {
        console.log(err);
      });
    if (!reason) {
      const reason = `No Reason Specified.`;
    }
    if (!member) {
      const noban = new EmbedBuilder()
        .setColor("Red")
        .setAuthor("Error")
        .setDescription("Please Tell Me Who to kick.");
      interaction.reply({ embeds: [noban] });
    }

    const banembed = new EmbedBuilder()
      .setColor("DarkAqua")
      .setDescription(
        `<a:tick:962971483443986472> | Successfully Kicked **${member.user.username}#${member.user.discriminator}**`
      );

    member.kick({ reason });
    interaction.reply({ embeds: [banembed] });
  },
};
