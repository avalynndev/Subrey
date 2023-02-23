const { Client, Collection, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
require("dotenv").config();
const SelectedTheme = require("dbd-dark-dashboard");

const config = require(`${__dirname}/config.json`);

(async () => {
  let DBD = require("discord-dashboard");
  await DBD.useLicense(config.dbd_license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: config.port,
    client: {
      id: config.client.id,
      secret: config.client.secret,
    },
    redirectUri: `http://localhost${
      config.port !== 80 ? `:${config.port}` : ""
    }/discord/callback`,
    domain: `http://localhost${config.port !== 80 ? `:${config.port}` : ""}`,
    settings: [],
    bot: client,
    theme: SelectedTheme({
      information: {
        createdBy: "iMidnight",
        websiteTitle: "iMidnight",
        websiteName: "iMidnight",
        websiteUrl: "http://mydbd.xyz",
        dashboardUrl: `http://localhost${
          config.port !== 80 ? `:${config.port}` : ""
        }/`,
        supporteMail: "support@imidnight.ml",
        supportServer: "https://discord.gg/yYq4UgRRzz",
        imageFavicon: "https://www.imidnight.ml/assets/img/logo-circular.png",
        iconURL: "https://www.imidnight.ml/assets/img/logo-circular.png",
        pageBackGround: "linear-gradient(#2CA8FF, #155b8d)",
        loggedIn: "Successfully signed in.",
        mainColor: "#2CA8FF",
        subColor: "#ebdbdb",
      },
      index: {
        card: {
          category: "iMidnight's Panel - The center of everything",
          title: `Welcome to the iMidnight discord where you can control the core features to the bot.`,
          image: "https://i.imgur.com/axnP93g.png",
          footer: "Footer",
        },
        information: {
          category: "Category",
          title: "Information",
          description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
          footer: "Footer",
        },
        feeds: {
          category: "Category",
          title: "Information",
          description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
          footer: "Footer",
        },
      },
      commands: [
        {
          category: "Starting Up",
          subTitle: "All helpful commands",
          aliasesDisabled: false,
          list: [
            {
              commandName: "bug",
              commandUsage: ";bug <bug>",
              commandDescription: "Report a bug to the developers of Wooar.",
              commandAlias: "No aliases",
            },
          ],
        },
      ],
    }),
  });
  Dashboard.init();
})();

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
  plugins: [
    new YtDlpPlugin(),
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin(),
  ],
});

client.config = require("./config.json");
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
