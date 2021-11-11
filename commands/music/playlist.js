const { QueryType } = require('discord-player');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')
const playlistUtils = require('./musicutils/playlistutils')



module.exports = {
    name: 'playlist',
    aliases: ['pl'],
    utilisation: '{prefix}playlist option [playlist name]',
    voiceChannel: true,

    async execute(client, message, args) {
        var params = args.join(" ");
        console.log(`[Playlist] menu called by ${message.author}, params ${params}`);

        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);
        var opt = args[0].toLowerCase();
        
        switch (opt){
            case 'save':
                const queue = player.getQueue(message.guild.id);
                if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
                playlistUtils.savePlaylist(message,args.slice(1),queue);
                break;
            case 'load':
                await playlistUtils.loadPlaylist(message,args.slice(1));
                break;
            case 'delete':
                playlistUtils.deletePlaylist(message,args.slice(1));
                break;
            case 'list':
                playlistUtils.listPlaylist(message);
                break;
            case 'info':
                playlistUtils.infoPlaylist(message,args.slice(1));
                break;
            default :
                message.channel.send(`No such option for this command`);
        }
    },
};