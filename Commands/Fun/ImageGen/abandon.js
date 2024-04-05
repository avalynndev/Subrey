const {
  ChatInputCommandInteraction,
  AttachmentBuilder,
} = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  subCommand: "image-gen.abandon",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   *
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const avatar = user.displayAvatarURL({
      format: "png",
    });

    const image = await Canvas.wanted(avatar);
    const attachment = new AttachmentBuilder(image);

    interaction
      .reply({
        files: [attachment],
      })
      .catch(() => {});
  },
};
