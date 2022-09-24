const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
   name: 'help',
   description: 'get some help of my cmds',
   // VoteOnly: false,
   run: async (client, interaction, args) => {

    let mainembed = new EmbedBuilder()
          .setColor("#00ffb3")
          .setThumbnail(client.user.displayAvatarURL())
//          .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
          .setFooter({ text: "Made With 💖 by Avalynn#4247", iconURL: 'https://media2.giphy.com/media/UtKfCyc9fAzvcJc1Ie/giphy.gif' })
          .setDescription(
`
• Prefix for \`EVERY\` server is \`/\`
• Total commands: \`100\`
• [Get Aubrey](https://discord.com/api/oauth2/authorize?client_id=973136576014057482&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/HHkuFTy4r4) 
• Type \`/help <command | module>\` for more info.
`)
.addFields(
  { name: "__Main__", value: "<a:tick:962971483443986472> Overview\n<a:about:969846747776028702> Information\n<:zzmod:961505960319406140> Moderation\n<:nsfw:963717747861241866> NSFW\n<:zzticket:961508372031627334> Ticket\n<a:zzgiveaway:961507514128695308> Giveaway\n<a:welcomee:975001204428005376> Welcomer", inline: true },
  { name: "__Extras__", value: "<:zzutility:961505575374557214> Setups\n<a:zzmoney:961512215402393610> Economy\n<:youtube:974540617571004446> Notifications\n<:fun:963716831204491294> Minigames\n<a:filters:974295191877996584> Self Roles", inline: true },
)

let button_back = new ButtonBuilder().setStyle('Secondary').setCustomId('1').setEmoji("◀️").setLabel('Backward')
let button_home = new ButtonBuilder().setStyle('Secondary').setCustomId('2').setEmoji("🏠").setLabel('Home')
let button_forward = new ButtonBuilder().setStyle('Secondary').setCustomId('3').setEmoji('▶️').setLabel('Forward')
let button_tutorial = new ButtonBuilder().setStyle('Link').setEmoji("973137638787805244").setLabel("Support").setURL("https://discord.gg/HHkuFTy4r4")
let menuOptions = [
    {
      label: "Overview",
      value: "Overview",
      emoji: "833101995723194437",
    },
    {
      label: "Information",
      value: "Information",
      emoji: "🔰",
    },
    {
      label: "Economy",
      value: "Economy",
      emoji: "💸",
    },
    {
      label: "Admin",
      value: "Admin",
      emoji: "🚫",
    },
    {
      label: "Setup",
      value: "Setup",
      emoji: "💪",
    },
    {
      label: "Settings",
      value: "Settings",
      emoji: "⚙️",
    },
    {
      label: "Owner",
      value: "Owner",
      emoji: "👑",
    },
    {
      label: "AntiNuke",
      value: "antinuke",
      emoji: "🙅",
    },
    {
      label: "Ranking",
      value: "Ranking",
      emoji: "📈",
    },
    {
      label: "Fun",
      value: "Fun",
      emoji: "🕹️",
    },
    {
      label: "Minigames",
      value: "Minigames",
      emoji: "🎮",
    },
    {
      label: "Anime-Emotions",
      value: "Anime-Emotions",
      emoji: "😳",
    },
    {
      label: "Nsfw",
      value: "Nsfw",
      emoji: "🔞",
    },
    {
      label: "CustomCommands",
      value: "Customcommand",
      emoji: "🦾",
    },
  ];
  let menuSelection = new SelectMenuBuilder()
    .setCustomId("MenuSelection")
    .setPlaceholder("Please select a page.")
    .setMinValues(1)
    .setMaxValues(5)
    .addOptions(menuOptions.filter(Boolean))
  let buttonRow = new ActionRowBuilder().addComponents([button_back, button_home, button_forward, button_tutorial])
  let SelectionRow = new ActionRowBuilder().addComponents([menuSelection])
  const allbuttons = [buttonRow, SelectionRow]
const helpmsg = await interaction.followUp({ embeds: [mainembed], components: allbuttons});

   },
};