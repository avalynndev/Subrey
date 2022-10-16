const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  DiscordAPIError,
} = require("discord.js");

const { embedPages } = require("../../Handlers/pages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selectmenu")
    .setDescription("the help command"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const Menu = new EmbedBuilder()
      .setTitle("Help Command")
      .setColor("0x2F3136")
      .setDescription(
        "Select an option to get the command list of. Only one option can be selected."
      )
      .addFields(
        {
          name: "<:file:1029384572439371846> Total Command Categories",
          value: `<:reply:1029385036958547978>  11`,
          inline: true,
        },
        {
          name: "<:slash:1029384574544912474> Total Slash Commands",
          value: `<:reply:1029385036958547978> 201`,
          inline: true,
        }
      )
      .setColor("0x2F3136");

    const Moderation = new EmbedBuilder()
      .setTitle("Command List For Moderation")
      .setColor("0x2F3136")
      .setDescription("```mod setnick, mod ban, mod kick```")
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 3 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    const Config = new EmbedBuilder()
      .setTitle("Command List For Config")
      .setColor("0x2F3136")
      .setDescription(
        "```events welcome, events leave, wordreact, auto-role```"
      )
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 4 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    const Util = new EmbedBuilder()
      .setTitle("Command List For Util")
      .setColor("0x2F3136")
      .setDescription("```util quotes, util youtube, util qrcode, util calc```")
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 4 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    const Fun = new EmbedBuilder()
      .setTitle("Command List For Fun")
      .setColor("0x2F3136")
      .setDescription("```x```")
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 4 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    const Giveaway = new EmbedBuilder()
      .setTitle("Command List For Giveaway")
      .setColor("0x2F3136")
      .setDescription("```giveaway create, giveaway manage ```")
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 2 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });
    const Ticket = new EmbedBuilder()
      .setTitle("Command List For Ticket")
      .setColor("0x2F3136")
      .setDescription("```tickets setup, tickets delete ```")
      .addFields({
        name: "<:star:1029384576549798019> Command Count",
        value: "<:reply:1029385036958547978> 2 Commands",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });

    const componentsMenu = (select) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("some")
          .setPlaceholder("Here")
          .setDisabled(select)
          .addOptions([
            {
              label: "Moderation",
              value: "mod",
              description: "View Commands In Moderation Category",
              emoji: "🔨",
            },
            {
              label: "Configuration",
              value: "config",
              description: "View Commands In Configuration Category",
              emoji: "⚙️",
            },
            {
              label: "Util",
              value: "util",
              description: "View Commands In Util Category",
              emoji: "📁",
            },
            {
              label: "Fun",
              value: "fun",
              description: "View Commands In Fun Category",
              emoji: "🎉",
            },
            {
              label: "Giveaways",
              value: "giveaway",
              description: "View Commands In Giveaways Category",
              emoji: "🎁",
            },
            {
              label: "Ticket",
              value: "ticket",
              description: "View Commands In Ticket Category",
              emoji: "🎫",
            },
            {
              label: "Level",
              value: "level",
              description: "View Commands In Level Category",
              emoji: "🚀",
            },
            {
              label: "Economy",
              value: "economy",
              description: "View Commands In Economy Category",
              emoji: "💰",
            },
            {
              label: "Music",
              value: "music",
              description: "View Commands In Music Category",
              emoji: "🎧",
            },
            {
              label: "Image Generation",
              value: "image",
              description: "View Commands In Image Generation Category",
              emoji: "🖼️",
            },
            {
              label: "Anti-Raid",
              value: "anti",
              description: "View Commands In Anti-Raid Category",
              emoji: "🛡️",
            },
          ])
      ),
    ];

    const message = await interaction.reply({
      embeds: [Menu],
      components: componentsMenu(false),
      fetchReply: true,
    });

    const collector = message.createMessageComponentCollector({
      filter: (u) => {
        if (u.user.id === interaction.user.id) return true;
        else {
          return false;
        }
      },
      errors: ["TIME"],
    });

    collector.on("collect", (cld) => {
      if (cld.values[0] === "mod") {
        cld.update({ embeds: [Moderation], components: componentsMenu(false) });
      }
      if (cld.values[0] === "config") {
        cld.update({ embeds: [Config], components: componentsMenu(false) });
      }
      if (cld.values[0] === "util") {
        cld.update({ embeds: [Util], components: componentsMenu(false) });
      }
      if (cld.values[0] === "fun") {
        cld.update({ embeds: [Fun], components: componentsMenu(false) });
      }
      if (cld.values[0] === "giveaway") {
        cld.update({ embeds: [Giveaway], components: componentsMenu(false) });
      }
      if (cld.values[0] === "ticket") {
        cld.update({ embeds: [Ticket], components: componentsMenu(false) });
      }
    });
  },
};
