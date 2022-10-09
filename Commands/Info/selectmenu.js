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
      .setTitle("Select Menu Youtube")
      .setColor("Red")
      .addFields({
        name: "Youtube",
        value: "Somthing",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });

    const Youtube = new EmbedBuilder()
      .setTitle("Select Menu Youtube")
      .setColor("Blue")
      .addFields({
        name: "Youtube",
        value: "Somthing",
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });

    const Discord = new EmbedBuilder()
      .setTitle("Select s Youtube")
      .setColor("Blue")
      .addFields({
        name: "Youtube",
        value: "Somthing",
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
              label: "YT",
              value: "youtube",
              description: "YTT",
            },
            {
              label: "some",
              value: "discord",
              description: "YTT",
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
      if (cld.values[0] === "youtube") {
        cld.update({ embeds: [Youtube], components: componentsMenu(false) });
      }
      if (cld.values[0] === "discord") {
        cld.update({ embeds: [Discord], components: componentsMenu(false) });
      }
    });
  },
};
