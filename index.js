const { Client, Collection, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
require("dotenv").config();

const SoftUI = require("dbd-soft-ui");
let DBD = require("discord-dashboard");
const config = require("./config.json");

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

(async () => {
  await DBD.useLicense(process.env.DD_LICENSE);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: config.dbd.port,
    client: config.discord.client,
    redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
    domain: config.dbd.domain,
    ownerIDs: config.dbd.ownerIDs,
    useThemeMaintenance: true,
    useTheme404: true,
    bot: client,
    theme: SoftUI({
      customThemeOptions: {
        index: async ({ req, res, config }) => {
          return {
            values: [],
            graph: {}, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
            cards: [],
          };
        },
      },
      locales: {
        enUS: {
          name: "English",
          index: {
            feeds: ["Current Users", "CPU", "System Platform", "Server Count"],
            card: {
              category: "BetterCode.ui",
              title: "Subrey - the only bot you need",
              description:
                "Subrey Discord Bot's management panel. Subrey was created to give others the ability have only one bot that controls the server.",
              footer: "Created by BetterCode using discord-dashboard ",
            },
            feedsTitle: "Feeds",
            graphTitle: "Graphs",
          },
        },
      },
      websiteName: "Subrey",
      colorScheme: "blue",
      supporteMail: "avalynndev@gmail.com",
      icons: {
        favicon:
          "https://github.com/bettercodeui/Subrey/blob/main/subrey.png?raw=true",
        noGuildIcon:
          "https://pnggrid.com/wp-content/uploads/2021/05/Discord-Logo-Circle-1024x1024.png",
        sidebar: {
          darkUrl:
            "https://github.com/bettercodeui/Subrey/blob/main/subrey.png?raw=true",
          lightUrl:
            "https://github.com/bettercodeui/Subrey/blob/main/subrey.png?raw=true",
          hideName: true,
          borderRadius: false,
          alignCenter: true,
        },
      },
      index: {
        card: {
          category: "Soft UI",
          title: "Assistants - The center of everything",
          description:
            "Assistants Discord Bot management panel. <b><i>Feel free to use HTML</i></b>",
          image: "/img/soft-ui.webp",
          link: {
            enabled: true,
            url: "https://google.com",
          },
        },
        graph: {
          enabled: true,
          lineGraph: false,
          title: "Memory Usage",
          tag: "Memory (MB)",
          max: 100,
        },
      },
      sweetalert: {
        errors: {},
        success: {
          login: "Successfully logged in.",
        },
      },
      preloader: {
        spinner: true,
        text: "Page is loading",
      },
      admin: {
        pterodactyl: {
          enabled: false,
          apiKey: "apiKey",
          panelLink: "https://panel.website.com",
          serverUUIDs: [],
        },
      },
      commands: [
        {
          category: "category",
          subTitle: "subTitle",
          categoryId: "category-id", // No spaces or special characters
          hideAlias: false, // Optional - Default: false - Hides the alias from all commands in the category
          hideDescription: true, // Optional - Default: false - Hides the description from all commands in the category
          hideSidebarItem: true, // Optional - Default: false - Hides the category from the sidebar
          list: [
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },

            {
              commandName: "cmdname",
              commandUsage: "usage",
              commandDescription: "Command description",
              commandAlias: "alias",
            },
          ],
        },
      ],
    }),
    settings: [],
  });
  Dashboard.init();
})();

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
