const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { Manager, db } = require("quick.eco");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const client = new Client({
  intents: 32767,
  presence: {
    activities: [{ name: "/help", type: "PLAYING" }],
    status: "dnd",
  },
});

const { loadEvents } = require("./Handlers/eventHandler");

let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
  api: {
    clientId: "7343d7fc0efc4480a0db879a34600c08",
    clientSecret: "0cb91c79b53b4c7b98a5c2a3b3936fc2",
  },
};
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
  plugins: [
    new YtDlpPlugin(),
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin(),
  ],
});

client.eco = new Manager();
client.db = db;
client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection();
client.commands = new Collection();
client.shop = {
  laptop: {
    cost: 2000,
  },
  mobile: {
    cost: 1000,
  },
  computer: {
    cost: 3000,
  },
  shoes: {
    cost: 500,
  },
  watch: {
    cost: 200,
  },
  mystery_box: {
    cost: 5000,
  },
};

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {}).then(() => console.log("Database ✅"));

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

client.login(process.env.Token);
