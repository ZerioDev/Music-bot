# Music-bot
A complete code to download for a music bot. Using a module (discord-player) 🎧

Looking for a code for a music bot ? This fully open source code is made for your project !

If you need help with this project, to get support faster you can join the help server by just clicking [here](https://discord.gg/5cGSYV8ZZj).

### ⚡ Installation

Well, let's start by downloading the code.
Go to the folder `config` then the file `config.json`.
For the bot to be able to start, please complete the file with your credentials as follows :

```js
{
    "game": "GAME",
    "prefix": "PREFIX",
    "token_bot": "TOKEN"
}
```

Reminder :

- `game`, the status of the bot.
- `prefix`, the prefix that will be set to use the bot.
- `token_bot`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section.

To customize the emojis go to the file `emojis.json`.
Emojis are already defined by default but you can modify them if you wish.

```js
{
    "music": ":musical_note:",
    "queue": ":bar_chart:",
    "error": ":x:",
    "success": ":white_check_mark:"
}
```

In the console, type `npm install` to install all dependencies.

To start the bot :

```
#With Node
node index.js

#With pm2
pm2 start index.js --name "MusicBot"
```

All you have to do is turn on your bot !

### 🎵 Music commands

```
play <name>, play music in a voice channel.
pause, pause the current music.
resume, puts the current music back on.
queue, see the next musics.
clear-queue, delete the next music.
shuffle, to mix the queue.
np, see music in progress.
loop, to enable or disable the repeat function.
volume <1 - 100>, change the volume.
skip, skip to next music.
stop, stop all music.
filter <filter>, add / remove filters.
w-filters, see filters.
```

### 💡 General commands

```
help, see the list of available orders.
ping, see the bot latency.
```

### 🏓 Utilities (to change the code)

Find all the functions available on the official code [right here](https://github.com/Androz2091/discord-player).

This is used with [discord.js](https://www.npmjs.com/package/discord.js) and [discord-player](https://www.npmjs.com/package/discord-player).
