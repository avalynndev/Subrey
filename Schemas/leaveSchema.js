const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const userLeaveSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  channelId: String,
  messageEnable: Boolean,
});
module.exports =
  mongoose.models.leaveMongo || mongoose.model("leaveMongo", userLeaveSchema);
