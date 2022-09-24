const {
  EmbedBuilder, ButtonBuilder,SelectMenuBuilder, ActionRowBuilder
} = require("discord.js")
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  type: "bot",
  run: async (client, interaction, args, cmduser, text, prefix) => {

    let settings = client.settings.get(message.guild.id);
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      if (args[0]) {
        const embed = new EmbedBuilder().setColor("#00ffb3");
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if (args[0].toLowerCase().includes("cust")) {
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ['COMING SOON']
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new EmbedBuilder()
            .setColor("#00ffb3")
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable1"]))
            .setDescription(items.join("︲"))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom), client.user.displayAvatarURL());

          message.reply({ embeds: [embed] })
          return;
        } var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.reply({ embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, { command: args[0].toLowerCase() }))] });
        } else if (cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new EmbedBuilder()
            .setColor("#00ffb3")
            .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable2"]))
            .setFooter(handlemsg(client.la[ls].cmds.info.help.nocustom, { prefix: prefix }), client.user.displayAvatarURL());
          let embeds = allotherembeds_eachcategory();
          if (cat == "🔰 Info")
            return message.reply({ embeds: [embeds[0]] })
          if (cat == "💸 Economy")
            return message.reply({ embeds: [embeds[1]] })
          if (cat == "🚫 Administration")
            return message.reply({ embeds: [embeds[6]] })
          if (cat == "💪 Setup")
            return message.reply({ embeds: [embeds[7]] })
          if (cat == "⚙️ Settings")
            return message.reply({ embeds: [embeds[8]] })
          if (cat == "👑 Owner")
            return message.reply({ embeds: [embeds[9]] })
          if (cat == "🙅 AntiNuke")
            return message.reply({ embeds: [embeds[10]] })
          if (cat == "📈 Ranking")
            return message.reply({ embeds: [embeds[11]] })
          if (cat == "🔊 Soundboard")
            return message.reply({ embeds: [embeds[12]] })
          if (cat == "🕹️ Fun")
            return message.reply({ embeds: [embeds[14]] })
          if (cat == "🎮 MiniGames")
            return message.reply({ embeds: [embeds[15]] })
          if (cat == "😳 Anime-Emotions")
            return message.reply({ embeds: [embeds[16]] })
          if (cat == "🔞 NSFW")
            return message.reply({ embeds: [embeds[17]] })
          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable3"]));
            } catch { }
          } else {
            embed.setDescription(eval(client.la[ls]["cmds"]["info"]["help"]["variable4"]))
          }
          return message.reply({ embeds: [embed] })
        }
        if (cmd.name) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.name), `\`\`\`${cmd.name}\`\`\``);
        if (cmd.name) embed.setTitle(handlemsg(client.la[ls].cmds.info.help.detail.about, { cmdname: cmd.name }));
        if (cmd.description) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.desc), `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases && cmd.aliases.length > 0 && cmd.aliases[0].length > 1) try {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.aliases), `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch { }
        if (cmd.cooldown) embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.cooldown), `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField(handlemsg(client.la[ls].cmds.info.help.detail.usage), `\`\`\`${prefix}${cmd.usage}\`\`\``);
          embed.setFooter(handlemsg(client.la[ls].cmds.info.help.detail.syntax), es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL());
        }
        return message.reply({ embeds: [embed] });
      } else {
        let button_back = new ButtonBuilder().setStyle('SECONDARY').setCustomId('1').setEmoji("◀️").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
        let button_home = new ButtonBuilder().setStyle('SECONDARY').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
        let button_forward = new ButtonBuilder().setStyle('SECONDARY').setCustomId('3').setEmoji('▶️').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
        let button_tutorial = new ButtonBuilder().setStyle('LINK').setEmoji("973137638787805244").setLabel("Support").setURL("https://discord.gg/HHkuFTy4r4")
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
        menuOptions = menuOptions.map(i => {
          if (settings[`${i?.value.toUpperCase()}`] === undefined) {
            return i; //if its not in the db, then add it
          }
          else if (settings[`${i?.value.toUpperCase()}`]) {
            return i; //If its enabled then add it
          }
          else if (settings.showdisabled && settings[`${i?.value.toUpperCase()}`] === false) {
            return i;
          } else {
            //return i // do not return, cause its disabled! to be shown
          }
        })
        let menuSelection = new SelectMenuBuilder()
          .setCustomId("MenuSelection")
          .setPlaceholder("Please select a page.")
          .setMinValues(1)
          .setMaxValues(5)
          .addOptions(menuOptions.filter(Boolean))
        let buttonRow = new ActionRowBuilder().addComponents([button_back, button_home, button_forward, button_tutorial])
        let SelectionRow = new ActionRowBuilder().addComponents([menuSelection])
        const allbuttons = [buttonRow, SelectionRow]
        //define default embed
        let OverviewEmbed = new EmbedBuilder()
          .setColor("#00ffb3")
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setFooter({ text: "Made With 💖 by Avalynn#4247", iconURL: 'https://media2.giphy.com/media/UtKfCyc9fAzvcJc1Ie/giphy.gif' })
          .setDescription(
`
• Prefix for this server is \`${prefix}\`
• Total commands: \`${client.commands.map(a => a).length}\`
• [Get Aubrey](https://discord.com/api/oauth2/authorize?client_id=973136576014057482&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/HHkuFTy4r4) 
• Type \`${prefix}help <command | module>\` for more info.
`)
.addFields(
  { name: "__Main__", value: "<a:tick:962971483443986472> Overview\n<a:about:969846747776028702> Information\n<:zzmod:961505960319406140> Moderation\n<:nsfw:963717747861241866> NSFW\n<:zzticket:961508372031627334> Ticket\n<a:zzgiveaway:961507514128695308> Giveaway\n<a:welcomee:975001204428005376> Welcomer", inline: true },
  { name: "__Extras__", value: "<:zzutility:961505575374557214> Setups\n<a:zzmoney:961512215402393610> Economy\n<:youtube:974540617571004446> Notifications\n<:fun:963716831204491294> Minigames\n<a:filters:974295191877996584> Self Roles", inline: true },
)
        let err = false;
        //Send message with buttons
        let helpmsg = await message.reply({
          embeds: [OverviewEmbed],
          components: allbuttons
        }).catch(e => {
          err = true;
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          return message.reply(`:x: I couldn't send help? Maybe I am missing the Permission to **EMBED LINKS**`).catch(() => { })
        });
        if (err) return;
        var edited = false;
        var embeds = [OverviewEmbed]
        for (const e of allotherembeds_eachcategory(true))
          embeds.push(e)
        let currentPage = 0;

        //create a collector for the thinggy
        const collector = helpmsg.createMessageComponentCollector({ filter: (i) => (i?.isButton() || i?.isSelectMenu()) && i?.user && i?.message.author.id == client.user.id, time: 180e3 });
        //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
        collector.on('collect', async b => {
          try {
            if (b?.isButton()) {
              if (b?.user.id !== message.author.id)
                return b?.reply({ content: handlemsg(client.la[ls].cmds.info.help.buttonerror, { prefix: prefix }), ephemeral: true });

              //page forward
              if (b?.customId == "1") {
                //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage !== 0) {
                  currentPage -= 1
                } else {
                  currentPage = embeds.length - 1
                }
              }
              //go home
              else if (b?.customId == "2") {
                //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
                currentPage = 0;
              }
              //go forward
              else if (b?.customId == "3") {
                //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
                if (currentPage < embeds.length - 1) {
                  currentPage++;
                } else {
                  currentPage = 0
                }
              }
              await helpmsg.edit({ embeds: [embeds[currentPage]], components: allbuttons }).catch(e => { })
              b?.deferUpdate().catch(e => { })


            }
            if (b?.isSelectMenu()) {
              //b?.reply(`***Going to the ${b?.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
              //information, music, admin, settings, voice, minigames, nsfw
              let index = 0;
              let vembeds = []
              let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
              for (const value of b?.values) {
                switch (value.toLowerCase()) {
                  case "overview": index = 0; break;
                  case "information": index = 1; break;
                  case "economy": index = 2; break;
                  case "admin": index = 3; break;
                  case "setup": index = 4; break;
                  case "settings": index = 5; break;
                  case "owner": index = 6; break;
                  case "antinuke": index = 7; break;
                  case "ranking": index = 8; break;
                  case "fun": index = 9; break;
                  case "minigames": index = 10; break;
                  case "anime-emotions": index = 11; break;
                  case "nsfw": index = 12; break;
                  case "customcommand": index = 13; break;
                }
                vembeds.push(theembeds[index])
              }
              b?.reply({
                embeds: vembeds,
                ephemeral: true
              });
            }
          } catch (e) {
            console.log(e.stack ? String(e.stack).grey : String(e).grey)
            console.log(String(e).italic.italic.grey.dim)
          }
        });

        collector.on('end', collected => {
          //array of all disabled buttons
          let d_buttonRow = new ActionRowBuilder().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), button_tutorial])
          const alldisabledbuttons = [d_buttonRow]
          if (!edited) {
            edited = true;
            helpmsg.edit({ content: handlemsg(client.la[ls].cmds.info.help.timeended, { prefix: prefix }), embeds: [helpmsg.embeds[0]], components: alldisabledbuttons }).catch((e) => { })
          }
        });
      }
      function allotherembeds_eachcategory(filterdisabled = false) {
        //ARRAY OF EMBEDS
        var embeds = [];

        //INFORMATION COMMANDS
        var embed0 = new EmbedBuilder()
          .setTitle(`__Information__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed0)

        //ECONOMY COMMANDS
        var embed1 = new EmbedBuilder()
          .setTitle(`__Economy__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "💸 Economy").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.ECONOMY || settings.showdisabled) embeds.push(embed1)

        //ADMINISTRATION
        var embed6 = new EmbedBuilder()
          .setTitle(`__Administration__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🚫 Administration").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`) 
        embeds.push(embed6)

        //SETUP
        var embed7 = new EmbedBuilder()
          .setTitle(`__Setup__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "💪 Setup").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed7)

        //Settings
        var embed8 = new EmbedBuilder()
          .setTitle(`__Settings__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed8)

        //Owner
        var embed9 = new EmbedBuilder()
          .setTitle(`__Owner__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed9)

        //Antinuke Commands
        var embed10 = new EmbedBuilder()
          .setTitle(`__Antinuke__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🙅 AntiNuke").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        embeds.push(embed10)

        //Ranking
        var embed11 = new EmbedBuilder()
          .setTitle(`__Ranking__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "📈 Ranking").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.RANKING || settings.showdisabled) embeds.push(embed11)

        //FUN COMMANDS
        var embed14 = new EmbedBuilder()
          .setTitle(`__Fun&School__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
          .addField(`SchoolCmds`,`• *${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.FUN || settings.showdisabled) embeds.push(embed14)

        //MINIGAMES
        var embed15 = new EmbedBuilder()
          .setTitle(`__Minigames__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.MINIGAMES || settings.showdisabled) embeds.push(embed15)

        //ANIME EMOTIONS
        var embed16 = new EmbedBuilder()
          .setTitle(`__Anime-Emotions__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "😳 Anime-Emotions").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.ANIME || settings.showdisabled) embeds.push(embed16)

        //NSFW COMMANDS
        var embed17 = new EmbedBuilder()
          .setTitle(`__NSFW__`)
          .setDescription(`• *${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").sort((a, b) => a.name.localeCompare(b?.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        if (!filterdisabled || settings.NSFW || settings.showdisabled) embeds.push(embed17)

        //CUSTOM COMMANDS EMBED
        var embed18 = new EmbedBuilder()
          .setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable23"]))
        let cuc = client.customcommands.get(message.guild.id, "commands");
        if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
        else cuc = cuc.map(cmd => `\`${cmd.name}\``)
        const items = cuc
        embed18.setTitle(eval(client.la[ls]["cmds"]["info"]["help"]["variable24"]))
        embed18.setDescription(">>> " + items.join("︲"))
        embeds.push(embed18)

        return embeds.map((embed, index) => {
          return embed
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("#00ffb3")
            .setFooter(client.getFooter(`Page ${index + 1} / ${embeds.length}`, client.user.displayAvatarURL()));
        })
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
        ]
      });
    }
  }
}