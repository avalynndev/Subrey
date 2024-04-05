const { Client, Collection, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
require("dotenv").config();

// Env Defines //
spotify_id = process.env.spotify_id;
spotify_secret = process.env.spotify_secret;
databaseuri = process.env.DatabaseURL;
token = process.env.TOKEN;

const client = new Client({
  intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "Watching" }],
    status: "dnd",
  },
});

const { loadEvents } = require("./Handlers/eventHandler");

let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
  api: {
    clientId: spotify_id,
    clientSecret: spotify_secret,
  },
};
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin(spotifyoptions), new SoundCloudPlugin()],
});

client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(databaseuri, {}).then(() => console.log("Database ✅"));

loadEvents(client);

client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `📀 | Playing: [${song.name}](${song.url}) - \`${song.formattedDuration}\``
          )
          .setFooter({
            text: `Requested by ${song.user.username} | Bot by AvalynnDev`,
            iconURL: `${song.user.displayAvatarURL()}`,
          })
          .setTimestamp()
          .setColor("Random"),
      ],
    })
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `📀 | Added [${song.name}](${song.url}) - \`${song.formattedDuration}\``
          )
          .setFooter({
            text: `Requested by ${song.user.username} | Bot by AvalynnDev`,
            iconURL: `${song.user.displayAvatarURL()}`,
          })
          .setTimestamp()
          .setColor("Random"),
      ],
    })
  )
  .on("playList", (queue, playlist, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `📀 | Play [${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs).\nNow playing [${song.name}](${song.url}) - \`${song.formattedDuration}\``
          )
          .setFooter({
            text: `Requested by ${song.user.username} | Bot by AvalynnDev`,
            iconURL: `${song.user.displayAvatarURL()}`,
          })
          .setTimestamp()
          .setColor("Random"),
      ],
    })
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `📀 | Added [${playlist.name}](${playlist.url}) playlist (${playlist.songs.length} songs) to queue.`
          )
          .setColor("Random"),
      ],
    })
  )
  .on("empty", (queue) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `📀 | Looks like everyone left me alone in the Voice Channel so I am leaving Voice Channel too.`
          )
          .setColor("Random"),
      ],
    })
  )
  .on(`error`, (channel, e) => {
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`:x: | An error encountered: ${e}`)
          .setColor("Random"),
      ],
    });
  })
  .on("finish", (queue) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`📀 | Music Queue has just ended`)
          .setColor("Random"),
      ],
    })
  );

client.login(token);
