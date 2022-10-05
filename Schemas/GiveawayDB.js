const { model, Schema } = require("mongoose");

module.exports = model(
  "Giveaway",
  new Schema({
    GuildID: String,
    ChannelID: String,
    MessageID: String,
    Winners: Number,
    Prize: String,
    EndTime: String,
    Paused: Boolean,
    Ended: Boolean,
    HostedBy: String,
    Entered: [String],
  })
);
