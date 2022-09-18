const Discord = require("discord.js");
const wyr = require("wyr").default

module.exports = {
   name: 'wyr',
   description: 'Play Would You Rather',
   // VoteOnly: false,
   run: async (client, interaction, args) => {
    const thinkembed = new Discord.EmbedBuilder()
        .setColor('#00ffb3')
        .setDescription('I am Thinking...')
    const msgRef = await interaction.followUp({ embeds: [thinkembed] });

    wyr().then((response) => {
        const embed = new Discord.EmbedBuilder()
            .setTitle('Would You Rather')
            .setColor('#00ffb3')
            .setDescription(`${response.blue.question}\n Or \n${response.red.question}`)
            .setFooter(
                {
                    text: 'Created By Avalynn',
                    iconURL: 'https://media0.giphy.com/media/UtKfCyc9fAzvcJc1Ie/200w.gif?cid=82a1493b7mu1u4jbu2t8mtdozq033rdq8kmc4fttrljj0tpu&rid=200w.gif&ct=g'
                }
            );

        const row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId('one')
					.setLabel('1st Option')
					.setStyle('Primary'),

                new Discord.ButtonBuilder()
					.setCustomId('two')
					.setLabel('2nd Option')
					.setStyle('Primary')
			);

            const gameCollector = interaction.channel.createMessageComponentCollector({
                filter: (fn) => fn,
            });

            gameCollector.on('collect', async (wyptb) => {
                if (wyptb.user.id !== interaction.member.user.id) {
                    return wyptb.reply({
                        content: 'Only Author Can Reply..',
                        ephemeral: true,
                    });
                }
        
                await wyptb.deferUpdate();
                if (wyptb.customId === 'one') {
                    btn = new Discord.ButtonBuilder()
                        .setStyle('Primary')
                        .setLabel(`1st Option (${response.blue.count})`)
                        .setCustomId('one')
                        .setDisabled();
                    btn2 = new Discord.ButtonBuilder()
                        .setStyle('Primary')
                        .setLabel(`2nd Option (${response.red.count})`)
                        .setCustomId('two')
                        .setDisabled();
                    gameCollector.stop();
                    await wyptb.editReply({
                        embed: embed,
                        components: [{ type: 1, components: [btn, btn2] }],
                    });
                } else if (wyptb.customId === 'two') {
                    btn = new Discord.ButtonBuilder()
                        .setStyle('Primary')
                        .setLabel(`1st Option (${response.blue.count})`)
                        .setCustomId('one')
                        .setDisabled();
                    btn2 = new Discord.ButtonBuilder()
                        .setStyle('Primary')
                        .setCustomId(`two`)
                        .setLabel(`2nd Option (${response.red.count})`)
                        .setDisabled();
                    gameCollector.stop();
                    await wyptb.editReply({
                        embed: embed,
                        components: [{ type: 1, components: [btn, btn2] }],
                    });
                }
            }); 
              
              msgRef.edit({ embeds: [embed], components: [row] })
    })

   },
};