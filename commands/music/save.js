const fs = require('fs');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')

module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save song | {prefix} save playlist <playlistname>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        var param = args.join(' ').toLowerCase();
        if (param.startsWith('song')) {
            message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} ✅`).then(() => {
                message.channel.send(`I have sent you the title of the music by private messages ✅`);
            }).catch(error => {
                message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
            });

            return;
        } else if (param.startsWith('playlist')){
            var playlistParam = param.replace("playlist ","");
            
            if(playlistParam.length <= 1){
               message.channel.send('You need to provide the correct parameter | command : /save playlist <playlist name>' + param);
               return;
            }

            console.log("[Save] Saving playlist "+ playlistParam);
            var songURLs = []
            songURLs.push(queue.current.url);

            for(var i = 0;i<queue.tracks.length;i++){
                songURLs.push(queue.tracks[i].url);
            }

            var playlistName = playlistParam;
            var playslistFilePath = constants.PLAYLIST_PATH + playlistName + ".json";
            var jsonData = JSON.stringify(songURLs);

            console.log("[Save] Writing Playlist " + playlistName);
            fileIOUtils.writeFile(playslistFilePath,jsonData, function(err) {
                if(err){
                    if(err = "Already Exist"){
                        message.channel.send('Playlist already exists');
                    }
                    message.channel.send('Error saving playlist '+ playlistName);
                    return;
                }

                message.channel.send('Playlist ' + playlistName + " has been saved");
            });
        };
    },
};