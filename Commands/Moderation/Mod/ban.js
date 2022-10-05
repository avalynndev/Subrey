const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "mod.ban",
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const reason = interaction.options.getString("reason");
    const member = interaction.options.getMember("mention");
    const time = interaction.options.getString("time");
    const parseTime = parseInt(time);

    const infperms = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        "<a:cross:962971482856779796> | You dont have permissions to execute this command!"
      );

    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction
        .reply({ embeds: [infperms] })
        .then((m) => {
          setTimeout(() => m.delete(), 5000);
        })
        .catch((err) => {
          console.log(err);
        });

    if (!reason) {
      const reason = `No Reason Specified.`;
    }

    if (!time) {
      const time = `Permanent`;
    }

    if (!member) {
      const noban = new EmbedBuilder()
        .setColor("Red")
        .setAuthor("Error")
        .setDescription("Please Tell Me Who to ban.");
      interaction.reply({ embeds: [noban] });
    }

    const banembed = new EmbedBuilder()
      .setColor("DarkAqua")
      .setDescription(
        `<a:tick:962971483443986472> | Successfully Banned **${member.user.username}#${member.user.discriminator}**`
      );

    member.ban({ reason, parseTime });

    interaction.reply({ embeds: [banembed] });
  },
};
