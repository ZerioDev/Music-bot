const { QueryType } = require('discord-player');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')

module.exports = {
    name: 'playlist',
    aliases: ['pl'],
    utilisation: '{prefix}playlist [playlist name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const activeQueue = player.getQueue(message.guild.id);
        if (activeQueue){
            activeQueue.destroy();
        }

        const playlistName = args.join(" ").toLowerCase();
        console.log("[Load Playlist]" + playlistName)

        var pl = fileIOUtils.readJsonFile(constants.PLAYLIST_PATH+playlistName);

        const queue = await player.createQueue(message.guild, {
			ytdlOptions: {
				quality: "highest",
				filter: "audioonly",
				highWaterMark: 1 << 25,
				dlChunkSize: 0,
			},
			metadata: message.channel
		});


        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        }

        message.channel.send(`Loading your playlist, this will take very looong time depending on the size of your playlist`);
        var i = 0, len = pl.length;
        while (i < len) {
            // your code
            const res = await player.search(pl[i], {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO
            });
            if(res){
                queue.addTracks(res.tracks);
            }else{
                message.channel.send('Cannot retrieve track ' + pl[i].title)
            }
            i++;
        }

        if (!queue.playing) await queue.play();

    },
};