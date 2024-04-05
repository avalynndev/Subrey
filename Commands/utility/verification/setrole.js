const { CommandInteraction } = require("discord.js");

const roleSchema = require("../../../Schemas/verifyRoleID");
const mongoose = require("mongoose");

module.exports = {
  subCommand: "verification.setrole",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    let role = interaction.options.getRole("role");
    const roleId = await roleSchema.findOne({ roleId: role.id });

    if (!roleId) {
      verifyRole = await new roleSchema({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        roleId: role.id,
      });

      await verifyRole.save().catch(console.error);
      await interaction.reply({
        content: `Successfully set the verification role to ${role.name}!`,
        ephemeral: true,
      });
    } else {
      await verifyRole.save().catch(console.error);
      await interaction.reply({
        content: "The role is already in the database!",
        ephemeral: true,
      });
    }
  },
};
