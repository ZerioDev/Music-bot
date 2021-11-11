const fs = require('fs');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')
const playlistUtils = require('./musicutils/playlistutils')

function saveSong(message){
    message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} ✅`).then(() => {
        message.channel.send(`I have sent you the title of the music by private messages ✅`);
    }).catch(error => {
        message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
    });

    return;
}

module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save song | {prefix} save playlist <playlistname>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
        
        var opt = args[0].toLowerCase()
        switch(opt){
            case 'song':
                saveSong(message);
                break;
            case 'playlist':
                if(args.length < 2){
                    message.channel.send('You need to provide playlist name command : /save playlist <playlist name>');
                }else{
                    playlistUtils.savePlaylist(message, args.slice(1), queue);
                }
                break;
            default :
                message.channel.send(`No such option for this command`);
        }
    },
};