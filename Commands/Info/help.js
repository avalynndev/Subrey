const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const { embedPages } = require("../../Handlers/pages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("the help command"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const embeds = [
      new EmbedBuilder()
        .setColor("#00ffb3")
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.member.displayAvatarURL(),
        })
        .setFooter({
          text: "Made With 💖 by Avalynn#4247",
          iconURL:
            "https://media2.giphy.com/media/UtKfCyc9fAzvcJc1Ie/giphy.gif",
        })
        .setDescription(
          `
  • Prefix of this bot is \`/\`
  • Total commands: \`24\`
  • [Get Aubrey](https://discord.com/api/oauth2/authorize?client_id=973136576014057482&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/HHkuFTy4r4) 
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
        ),

      new EmbedBuilder()
        .setTitle("Page 1")
        .setDescription("This is page 1")
        .setColor("Blue"),
    ];

    await embedPages(interaction, embeds);
  },
};
