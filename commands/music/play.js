const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        let random = Math.floor(Math.random() * 10)
        console.log(random)
        if (random < 2) {
            args = ['trap nation fart']
        }

        let falseEmbed = new MessageEmbed()
        falseEmbed.setAuthor({name: 'false', iconURL: 'https://cdn.discordapp.com/attachments/625276725269364738/961355228446347264/unknown.png'})
        falseEmbed.setDescription('this was an epic fail')
        falseEmbed.setTimestamp()
        if (!args[0]) return message.channel.send({embeds: [falseEmbed]});

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({embeds: [falseEmbed]});

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });


        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send({embeds: [falseEmbed]});
        }

        await message.channel.send(`loading`)
        const success = queue.setVolume(parseInt(0));


        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
        setInterval(async () => {
            let currentVol = queue.volume
            const success = queue.setVolume(currentVol + 10);
            if (success) {
                await message.channel.send(`💀 incresd volum`)
            }
        }, 30000);
    },
};