const { QueryType } = require('discord-player');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')

async function loadPlaylist(message, args){
    const activeQueue = player.getQueue(message.guild.id);
    if (activeQueue){
        activeQueue.destroy();
    }

    const playlistName = args.join(" ").toLowerCase();
    console.log("[Load Playlist]" + playlistName)
    //read playlist
    try{
        var pl = fileIOUtils.readJsonFile(constants.PLAYLIST_PATH + playlistName);
    }catch (err){
        console.log(err);
        message.send.channel("Failed to read playlist");
    }
    //create queue
    const queue = await player.createQueue(message.guild, {
        ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
            highWaterMark: 1 << 25,
            dlChunkSize: 0,
        },
        metadata: message.channel
    });
    //connect to vc
    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild.id);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }

    message.channel.send(`Loading your playlist, this will take very looong time depending on the size of your playlist`);

    //loading each song in playlist one by one, please update if someone knows a better way
    var i = 0, len = pl.tracks.length;
    while (i < len) {
        // your code
        const res = await player.search(pl.tracks[i], {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });
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

function deletePlaylist(message,args){
    var playlistName = args.join(" ").toLowerCase();
    fileIOUtils.deleteJsonFile(constants.PLAYLIST_PATH + playlistName, function(err){
        if(err === "Not Exists"){
            message.channel.send("Playlist "+ playlistName + " doesn't exist");
        }else if (err){
            message.channel.send("Error deleting playlist");
        }

        message.channel.send(`Playlist ${playlistName} was successfully deleted`);
    });
}

function listPlaylist(message){
    var list = fileIOUtils.listDir(constants.PLAYLIST_PATH);

    const embed = new MessageEmbed();
    embed.setColor('RED');
    embed.setAuthor("List of Available Playlist", client.user.displayAvatarURL({ size: 1024, dynamic: true }));
    var desc = "";
    
    //To Do Later : Pagination
    for (var i in list){
        list[i] = list[i].replace(/\.[^/.]+$/, "")
        var j = i+1;
        desc = desc+ j +". "+list[i]+"\n";
    }

    embed.setDescription(desc);
    embed.setFooter('From PPUKJ with Love ❤️', message.author.avatarURL({ dynamic: true }));

    //pagination component here

    message.channel.send({ embeds: [embed]});
}

function infoPlaylist(message, args){
    var playlistName = args.join(" ").toLowerCase();

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

    embed.setDescription(desc);
    embed.setFooter('From PPUKJ with Love ❤️', message.author.avatarURL({ dynamic: true }));

    //pagination component here if any

    message.channel.send({ embeds: [embed]})
}

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
            case 'load':
                await loadPlaylist(message,args.slice(1));
                break;
            case 'delete':
                deletePlaylist(message,args.slice(1));
                break;
            case 'list':
                listPlaylist(message);
                break;
            case 'info':
                infoPlaylist(message,args.slice(1));
                break;
        }
    },
};