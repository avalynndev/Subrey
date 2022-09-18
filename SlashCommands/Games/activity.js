const Discord = require("discord.js");

module.exports = {
    name: 'activity',
    description: 'Start an activity',
    // VoteOnly: true,
    options: [{
        name: "activity",
        description: "The type of Activity",
        type: 3,
        required: true,
        choices: [
            {
                name: "Poker Night",
                value: "poker"
            },
            {
                name: "Chess in the Park",
                value: "chess"
            },
            {
                name: "Watch Together",
                value: "watch"
            },
            {
                name: "Fishington.io",
                value: "fishington"
            },
            {
                name: "Betrayal.io",
                value: "betrayal"
            },
            {
                name: "SpellCast",
                value: "spellcast"
            },
        ]
      }],
    run: async (client, interaction, args) => {
            // Detect DMs
            if (!interaction.guild) {
                const embed3 = new Discord.EmbedBuilder().setColor('#00ffb3').setDescription('Sorry, but this command only works in servers!')
                await interaction.followUp({ embeds: embed3 });
                return;
            }
    
            // Identify voice channel
            if (!interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel || interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel.type == 'GUILD_STAGE_VOICE') {
                const embed2 = new Discord.EmbedBuilder().setColor('#00ffb3').setDescription('You\'re not in a voice channel!')
                await interaction.followUp({ embeds: embed2 });
                return;
            }
    
            // Permissions
            if (!((interaction.user.id == interaction.guild.ownerId) || interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))) {
                if (guildSettings.get(interaction.guild.id, interaction.options.getString('activity') == false) || interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id)._roles.some(v => guildSettings.get(interaction.guild.id, 'disallowedRoles').includes(v))) {
                    const embed1 = new Discord.EmbedBuilder().setColor('#00ffb3').setDescription('You don\'t have permission to use this command in this way!')
                    await interaction.followUp({ embeds: embed1 });
                    return;
                }
            }

            let activityID;
            let activityName
            if (interaction.options.getString('activity')) {
                // Common activities
                if (interaction.options.getString('activity') == 'watch') { activityID = '880218394199220334'; }
                if (interaction.options.getString('activity') == 'poker') { activityID = '755827207812677713'; }
                if (interaction.options.getString('activity') == 'chess') { activityID = '832012774040141894'; }
                if (interaction.options.getString('activity') == 'fishington') { activityID = '814288819477020702'; }
                if (interaction.options.getString('activity') == 'betrayal') { activityID = '773336526917861400'; }
                if (interaction.options.getString('activity') == 'spellcast') { activityID = '852509694341283871'; }
            }

            const invite = await interaction.client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.member.user.id).voice.channel.createInvite({
                maxAge: 0,
                maxUses: 1,
                targetType: 2,
                targetApplication: activityID,
            });

            const embed = new Discord.EmbedBuilder().setColor('#00ffb3').setDescription('<:star:976404088113745950> Click [here](https://discord.gg/' + invite + ') to start the activity')
            if (invite) { await interaction.followUp({ embeds: [embed] }); }
    },
};
