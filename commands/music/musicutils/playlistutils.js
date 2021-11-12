const { QueryType } = require('discord-player');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const constants = require('../../../constants/constants')
const fileIOUtils = require('../../../utils/fileIOUtils')
const musicUtils = require('./musicutils')


module.exports.savePlaylist = function (message, args, queue){
    
    var playlistName = args.join(" ");
     console.log("[Save] Saving playlist "+ playlistName);
     
     //Add every song URL in queue to be saved
     var songURLs = []
     songURLs.push({
        title : queue.current.title,
        url : queue.current.url
    });

     for(var i = 0;i<queue.tracks.length;i++){
         songURLs.push({
             title : queue.tracks[i].title,
             url : queue.tracks[i].url
         });
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
             if(err == "Already Exist"){
                 message.channel.send('Playlist already exists');
             }
             message.channel.send('Error saving playlist '+ playlistName);
             return;
         }

         message.channel.send('Playlist ' + playlistName + " has been saved");
     });
}

module.exports.loadPlaylist = async function (message, args){
    //delete any active queue
    const activeQueue = player.getQueue(message.guild.id);
    if (activeQueue){
        activeQueue.destroy();
    }

    const playlistName = args.join(" ");
    console.log("[Load Playlist]" + playlistName)
    //read playlist
    try{
        var pl = fileIOUtils.readJsonFile(constants.PLAYLIST_PATH + playlistName);
    }catch (err){
        console.log(err);
        message.send.channel("Failed to read playlist (case insensitive)");
    }
    //create queue
    const queue = await musicUtils.createQueue(player,message);

    message.channel.send(`Loading your playlist, this will take very looong time depending on the size of your playlist`);

    //loading each song in playlist one by one, please update if someone knows a better way
    var i = 0, len = pl.tracks.length;
    while (i < len) {
        // your code
        const res = await musicUtils.search(message,pl.tracks[i].url);
        if(res){
            queue.addTracks(res.tracks);
        }else{
            message.channel.send('Cannot retrieve track ' + pl.tracks[i].title)
        }
        i++;
    }

    //start the queue
    if (!queue.playing) await queue.play();
}

module.exports.deletePlaylist = function (message,args){
    var playlistName = args.join(" ");
    fileIOUtils.deleteJsonFile(constants.PLAYLIST_PATH + playlistName, function(err){
        if(err){
            if(err == "Not Exists"){
                message.channel.send("Playlist "+ playlistName + " doesn't exist");
            }
            message.channel.send("Error deleting playlist");
            return
        }

        console.log(`[Playlist] Deleted Playlist ${playlistName}`);
        message.channel.send(`Playlist ${playlistName} was successfully deleted`);
    });
}

module.exports.listPlaylist = function(message){
    var list = fileIOUtils.listDir(constants.PLAYLIST_PATH);

    const embed = new MessageEmbed();
    embed.setColor('RED');
    embed.setAuthor("List of Available Playlist", client.user.displayAvatarURL({ size: 1024, dynamic: true }));
    var desc = "";
    
    //To Do Later : Pagination
    for (var i in list){
        list[i] = list[i].replace(/\.[^/.]+$/, "")
        var j = Number(i)+1;
        desc = desc+ j.toString() +". "+list[i]+"\n";
    }

    embed.setDescription(desc);
    embed.setFooter('From PPUKJ with Love ❤️', message.author.avatarURL({ dynamic: true }));

    //pagination component here

    message.channel.send({ embeds: [embed]});
}

module.exports.infoPlaylist = function (message, args){
    var playlistName = args.join(" ");

    try{
        var pl = fileIOUtils.readJsonFile(constants.PLAYLIST_PATH + playlistName);
    }catch (err){
        console.log(err);
        message.send.channel("Failed to read playlist");
    }

    var embed = new MessageEmbed();

    embed.setColor('RED');
    embed.setAuthor("Playlist " + playlistName);

    var desc = "Playlist author : " + pl.author + "\n";
    var desc = desc + "Number of Tracks : " + pl.tracks.length + "\n";
    var desc = desc + "\n **Track List** \n";

    var i = 0, len = pl.tracks.length;
    while (i < len && i < 10) {
        desc = `${desc + Number(i+1)}. ${pl.tracks[i].title}\n`;
        i++;
    }

    const nextTracks = len > 10 ? `And **${len-10}** other tracks...` : `There are **${len}** track(s) in the playlist ...`;

    embed.setDescription(desc + "\n" + nextTracks);
    embed.setFooter('From PPUKJ with Love ❤️', message.author.avatarURL({ dynamic: true }));

    //pagination component here if any

    message.channel.send({ embeds: [embed]})
}