const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    //If no music is provided
    if (!args[0]) return message.channel.send(`Please enter a music ${emotes.error}`);

    const aTrackIsAlreadyPlaying = client.player.isPlaying(message.guild.id);

        // If there's already a track playing 
        if(aTrackIsAlreadyPlaying){

            // Add the track to the queue
            const track = await client.player.addToQueue(message.guild.id, args.join(" "));
            message.channel.send(`Track ${track.name} added to queue ${emotes.music}`);

        } else {

            // Else, play the song
            const song = await client.player.play(message.member.voice.channel, args.join(" "));
            message.channel.send(`Currently playing ${song.name} ${emotes.music}`);

            const queue = client.player.getQueue(message.guild.id)

            //Events
            .on('end', () => {
                message.channel.send(`There is no more music in the queue ${emotes.error}`);
            })
            .on('trackChanged', (oldTrack, newTrack) => {
                message.channel.send(`Now playing ${newTrack.name} ... ${emotes.music}`);
            })
            .on('channelEmpty', () => {
                message.channel.send(`Stop playing, there is no more member in the voice channel ${emotes.error}`);
            });
        }
    }
