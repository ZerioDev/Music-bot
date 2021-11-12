const musicUtils = require('./musicutils/musicutils')

module.exports = {
    name: 'playskip',
    aliases: ['ps'],
    utilisation: '{prefix}playskip [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await musicUtils.search(message,args.join(' '));

        if(!res){
            return message.channel.send(`No results found ${message.author}... try again ? ❌`);
        }
        
        if(!res.playlist){
            const queue = await musicUtils.createQueue(player,message);

            await message.channel.send(`Inserting track ${res.tracks[0].title} to be played next... 🎧`);4
            await queue.insert(res.tracks[0],0);
            if (!queue || !queue.playing){
                await musicUtils.voiceConnect(message,queue);
                await queue.play();
            }else{
                const success = queue.skip();

                return message.channel.send(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ❌`);
            }
        }else{
            message.channel.send(`Do not insert playlist to queue next! Queue next only accept singular track`);
        }
    },
};