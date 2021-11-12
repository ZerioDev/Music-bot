const { QueryType } = require('discord-player');
const musicUtils = require('./musicutils/musicutils')

module.exports = {
    name: 'queuenext',
    aliases: ['qn'],
    utilisation: '{prefix}queuenext [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await musicUtils.search(message,args.join(' '));
        
        if(!res.playlist){
            const queue = await musicUtils.createQueue(player,message);

            await message.channel.send(`Inserting track ${res.tracks.title} to be played next... 🎧`);4
            queue.insert(res.tracks[0],0);
        }else{
            message.channel.send(`Do not insert playlist to queue next! Queue next only accept singular track`);
        }
    },
};