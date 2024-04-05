const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { Rank } = require("canvacord");

const User = require("../../Schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Get your or another member's rank")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Target @member")
        .setRequired(false)
    ),
  async execute(interaction) {
    const member =
      interaction.options.getMember("member") || interaction.member;

    let user;

    const guildId = member.guild.id;
    const userId = member.user.id;

    user = await User.findOne({ guildId, userId });

    if (!user) {
      user = {
        level: 1,
        xp: 0,
      };
    }

    let allLevels = await User.find({ guildId: interaction.guild.id }).select(
      "-_id userId level xp"
    );

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank = allLevels.findIndex((lvl) => lvl.userId === userId) + 1;

    let discrim;
    const discriminator = member.user.discriminator;
    if (discriminator == "0") {
      discrim = "0000";
    } else {
      discrim = `${discriminator}`;
    }

    const rank = new Rank()
      .setDiscriminator(discrim)
      .setAvatar(member.user.displayAvatarURL())
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRank(currentRank)
      .setRequiredXP(user.level * 100)
      .setStatus(member.presence.status)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(member.user.username); // Set discriminator here

    rank.build().then((data) => {
      interaction.reply({
        files: [new AttachmentBuilder(data, { name: "rank.png" })],
      });
    });
  },
};
