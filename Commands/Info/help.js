const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display help menu"),

  async execute(interaction, client) {
    // Create select menu
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("select_group")
      .setPlaceholder("Select a command group")
      .addOptions(
        new StringSelectMenuOptionBuilder()
					.setLabel('Moderation')
					.setDescription('xxx')
					.setValue('moderation')
          .setEmoji("961505960319406140"),
				new StringSelectMenuOptionBuilder()
					.setLabel('NSFW')
					.setDescription('xxx')
					.setValue('nsfw')
          .setEmoji("963717747861241866"),
				new StringSelectMenuOptionBuilder()
					.setLabel('Ticket')
					.setDescription('xxx')
					.setValue('ticket')
          .setEmoji("961508372031627334"),
      );

    // Create action row containing the select menu
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    const initialEmbed = new EmbedBuilder()
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
        `• Prefix of this bot is \`/\`\n• Total commands: 250 | Usable by you (here): 272\n• [Get Subrey](https://discord.com/api/oauth2/authorize?client_id=973136576014057482&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/HHkuFTy4r4) | [Vote me](https://discord.com)\n• Type \`/help <command | module>\` for more info.`
      )
      .addFields([
        {
          name: "__Main__",
          value:
            "<a:about:969846747776028702> Information\n<:zzmod:961505960319406140> Moderation\n<:nsfw:963717747861241866> NSFW\n<:zzticket:961508372031627334> Ticket\n<a:zzgiveaway:961507514128695308> Giveaway\n<a:welcomee:975001204428005376> Welcomer\n 󠁛󠀣󠁣󠁢󠁢󠁣󠁢󠀵󠀬󠀣󠀴󠁡󠀴󠀶󠀴󠀴󠁝",
          inline: true,
        },
        {
          name: "__Extras__",
          value:
            "<:zzutility:961505575374557214> Setups\n<a:zzmoney:961512215402393610> Economy\n🖼️ Fun\n<:fun:963716831204491294> Minigames\n<a:filters:974295191877996584> Self Roles",
          inline: true,
        },
      ]);
      
      await interaction.reply
      ({
        embeds: [initialEmbed],
        components:  [actionRow],
      })
  },
};
