const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const { profileImage } = require("discord-arts");
const User = require("../../Schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Get your or another member's rank")
    .addUserOption((option) =>
      option
        .setName("memeber")
        .setDescription("Target @user")
        .setRequired(false)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
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

    await interaction.deferReply();
    const bufferImg = await profileImage(userId, {
      presenceStatus: `${member.presence.status}`,
      badgesFrame: true,
      rankData: {
        currentXp: user.xp,
        requiredXp: user.level * 100,
        rank: currentRank,
        level: user.level,
      },
    });
    const imgAttachment = new AttachmentBuilder(bufferImg, "profile.png");

    interaction.followUp({ files: [imgAttachment] });
  },
};
