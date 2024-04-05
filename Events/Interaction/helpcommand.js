const {
  Client,
  StringSelectMenuBuilder,
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const patha = require("../../");

const commandFoldersPath = path.join(__dirname, "..", "..", "Commands");

const commands = {};

function readCommandsFromFolder(folderPath, groupName) {
  fs.readdirSync(folderPath).forEach((file) => {
    const fullPath = path.join(folderPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // If it's a directory, use it as a group name and recursively read commands from it
      readCommandsFromFolder(fullPath, file);
    } else if (file.endsWith(".js")) {
      const command = require(fullPath);
      if (!commands[groupName]) {
        commands[groupName] = [];
      }
      commands[groupName].push(command);
    }
  });
}

readCommandsFromFolder(commandFoldersPath, "General");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "select_group") {
      // Get the selected group
      const selectedGroup = interaction.values[0];
      console.log(selectedGroup);

      // Get commands for the selected group
      const groupCommands = commands[selectedGroup];
      console.log(groupCommands);

      // Create embeds for each command
      const embeds = groupCommands.map((command) => {
        if (command.data) {
          const commandEmbed = new EmbedBuilder()
            .setTitle(`${command.data.name} command`)
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
            .setDescription(command.data.description)
            .addFields(
              command.data.options.map((option) => ({
                name: option.name,
                value: option.description,
                inline: true,
              }))
            );
          return commandEmbed;
        }
      });

      for (const embed of embeds) {
        try {
          await interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        } catch (error) {
          console.error("Error sending embed:", error);
        }
      }
    }
  },
};
