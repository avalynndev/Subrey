const {
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder 
} = require("discord.js");
const { profileImage } = require("discord-arts");
const User = require("../../Schemas/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
        .setDescription("gets the info of a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("the user you want to get the info of...")
            .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction) {
    const target =
      interaction.options.getMember("user") || interaction.member;
    const { user, presence, roles } = target;
    const formatter = new Intl.ListFormat("en-GB", {
      style: "narrow",
      type: "conjunction",
    });

    await user.fetch();

    const statusType = {
      idle: "1FJj7pX.png",
      dnd: "fbLqSYv.png",
      online: "JhW7v9d.png",
      invisible: "dibKqth.png",
    };

    const activityType = [
      "🕹 *Playing*",
      "🎙 *Streaming*",
      "🎧 *Listening to*",
      "📺 *Watching*",
      "🤹🏻‍♀️ *Custom*",
      "🏆 *Competing in*",
    ];
    let member;

    const guildId = target.guild.id;
    const userId = target.user.id;

    member = await User.findOne({ guildId, userId });

    if (!member) {
      member = {
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

    const bufferImg = await profileImage(userId, {
      presenceStatus: `${target.presence.status}`,
      badgesFrame: true,
      rankData: {
        currentXp: member.xp,
        requiredXp: member.level * 100,
        rank: currentRank,
        level: member.level,
      },
    });
    const imgAttachment = new AttachmentBuilder(bufferImg, "profile.png");

    const clientType = [
      { name: "desktop", text: "Computer", emoji: "💻" },
      { name: "mobile", text: "Phone", emoji: "🤳🏻" },
      { name: "web", text: "Website", emoji: "🌍" },
      { name: "offline", text: "Offline", emoji: "💤" },
    ];

    const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
      let totalLength = 0;
      const result = [];

      for (const role of roles) {
        const roleString = `<@&${role.id}>`;

        if (roleString.length + totalLength > maxFieldLength) break;

        totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
        result.push(roleString);
      }

      return result.length;
    };

    const sortedRoles = roles.cache
      .map((role) => role)
      .sort((a, b) => b.position - a.position)
      .slice(0, roles.cache.size - 1);

    const clientStatus =
      presence?.clientStatus instanceof Object
        ? Object.keys(presence.clientStatus)
        : "offline";

    const deviceFilter = clientType.filter((device) =>
      clientStatus.includes(device.name)
    );
    const devices = !Array.isArray(deviceFilter)
      ? new Array(deviceFilter)
      : deviceFilter;

    interaction.reply({
      files: [imgAttachment],
      embeds: [
        new EmbedBuilder()
          .setColor("#00ffb3")
          .setAuthor({
            name: user.tag,
            iconURL: `https://i.imgur.com/${
              statusType[presence?.status || "invisible"]
            }`,
          })
          .setThumbnail(user.avatarURL({ size: 1024 }))
          .setImage(user.bannerURL({ size: 1024 }))
          .addFields(
            { name: "ID", value: `💳 ${user.id}` },
            {
              name: "Activities",
              value:
                presence?.activities
                  .map(
                    (activity) =>
                      `${activityType[activity.type]} ${activity.name}`
                  )
                  .join("\n") || "None",
            },
            {
              name: "Joined Server",
              value: `🤝🏻 <t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
              inline: true,
            },
            {
              name: "Account Created",
              value: `📆 <t:${parseInt(user.createdTimestamp / 1000)}:R>`,
              inline: true,
            },
            {
              name: "Nickname",
              value: `🦸🏻‍♀️ ${target.nickname || "None"}`,
              inline: true,
            },
            {
              name: `Roles (${maxDisplayRoles(sortedRoles)} of ${
                sortedRoles.length
              })`,
              value: `${
                sortedRoles.slice(0, maxDisplayRoles(sortedRoles)).join(" ") ||
                "None"
              }`,
            },
            {
              name: `Devices`,
              value: devices
                .map((device) => `${device.emoji} ${device.text}`)
                .join("\n"),
              inline: true,
            },
            {
              name: "Profile Colour",
              value: `🎨 ${user.hexAccentColor || "None"}`,
              inline: true,
            },
            {
              name: "Boosting Server",
              value: `🏋🏻‍♀️ ${
                roles.premiumSubscriberRole
                  ? `Since <t:${parseInt(
                      target.premiumSinceTimestamp / 1000
                    )}:R>`
                  : "No"
              }`,
              inline: true,
            }
          ),
      ],
      ephemeral: true,
    });
  },
};
