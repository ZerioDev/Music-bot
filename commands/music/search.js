const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        
        if (!args[0]) return message.channel.send(`Specify song title to seach ${message.author}... try again ? ❌`);

        message.channel.send(`:mag:Searching for **${args.join(' ')}**...`)
        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const searchResult =new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Search Results for : ${args.join(' ')}`)
        .setDescription(`\n\n${res.tracks.map((t, i) => `**${i + 1}**) [${t.title}](${t.url})`).slice(0,10).join('\n\n')}\n\nSelect choice [1-10] or *cancel*`)

        message.channel.sendTyping()
        await message.channel.send({embeds:[searchResult]})
        
        const filter1 = m => m.author.id === message.author.id

         const collector = message.channel.createMessageCollector({filter:filter1,time: 15000 ,errors: ['time'] });
            
         collector.on('collect',async (m) => {
            if (m.content==='cancel'||m.content==='CANCEL') {
                message.channel.send("Search cancelled...:white_check_mark:")
                 collector.stop()
            }

            else if(isNaN(m.content)|| (Number(m.content) < 0) || (Number(m.content) > 10)){
                await message.channel.send(`Invalid response ${message.author}...Try a value from 1 to 10...:x:`);
            } else {
                console.log("Valid")
                collector.stop()
                try {
                    if (!queue.connection) await queue.connect(message.member.voice.channel);
                } catch {
                    await player.deleteQueue(message.guild.id);
                    return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
                }
                await message.channel.send(`Loading your track... 🎧`);
                queue.addTrack(res.tracks[m.content-1])
                if (!queue.playing) await queue.play()
            }
        })
        collector.on('end', async (msg, reason) => {
            if (reason === 'time') {
           message.channel.send(`Search timed out.. ${message.author}...try again :x:`);
           }
           });
    }
}
