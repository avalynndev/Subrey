const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const userWelcomeSchema = new Schema({
  guildId: String,
  channelId: String,
  messageEnable: Boolean,
});

module.exports =
  mongoose.models.joinMongo || mongoose.model("joinMongo", userWelcomeSchema);
