client = require("../index");
const { EmbedBuilder } = require("discord.js");

// DisTube Events
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
