const fs = require('fs');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')

function saveSong(message){
    message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} ✅`).then(() => {
        message.channel.send(`I have sent you the title of the music by private messages ✅`);
    }).catch(error => {
        message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
    });

    return;
}

function savePlaylist(message, args, queue){
    
    var playlistName = args.join(" ").toLowerCase();
     console.log("[Save] Saving playlist "+ playlistName);
     
     //Add every song URL in queue to be saved
     var songURLs = []
     songURLs.push(queue.current.url);

     for(var i = 0;i<queue.tracks.length;i++){
         songURLs.push(queue.tracks[i].url);
     }

     var savedPlaylist = {
         author : message.author.username,
         tracks : songURLs
     }

     var playslistFilePath = constants.PLAYLIST_PATH + playlistName + ".json";
     var jsonData = JSON.stringify(savedPlaylist);

     //Writing playlist to be saved
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
                    savePlaylist(message, args.slice(1), queue);
                }
                break;
        }
    },
};