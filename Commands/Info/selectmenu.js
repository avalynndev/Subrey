const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

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
      .setColor("#00ffb3")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setFooter({
        text: "Made With 💖 by Avalynn#4247",
        iconURL: "https://media2.giphy.com/media/UtKfCyc9fAzvcJc1Ie/giphy.gif",
      })
      .setDescription(
        `
  • Prefix of this bot is \`/\`
  • Total commands: \`24\`
  • [Get Subrey](https://discord.com/api/oauth2/authorize?client_id=973136576014057482&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/HHkuFTy4r4) 
  `
      )
      .addFields(
        {
          name: "__Main__",
          value:
            "<a:tick:962971483443986472> Overview\n<a:about:969846747776028702> Information\n<:zzmod:961505960319406140> Moderation\n<:nsfw:963717747861241866> NSFW\n<:zzticket:961508372031627334> Ticket\n<a:zzgiveaway:961507514128695308> Giveaway\n<a:welcomee:975001204428005376> Welcomer",
          inline: true,
        },
        {
          name: "__Extras__",
          value:
            "<:zzutility:961505575374557214> Setups\n<a:zzmoney:961512215402393610> Economy\n<:youtube:974540617571004446> Notifications\n<:fun:963716831204491294> Minigames\n<a:filters:974295191877996584> Self Roles",
          inline: true,
        }
      );

    const Moderation = new EmbedBuilder()
      .setTitle("Command List For Moderation")
      .setColor("2F3136")
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
      .setColor("2F3136")
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
      .setColor("2F3136")
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
      .setColor("2F3136")
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
      .setColor("2F3136")
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
      .setColor("2F3136")
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
        new StringSelectMenuBuilder()
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
