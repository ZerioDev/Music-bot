const emotes = require ("../config/emojis.json");
const filters = require("../config/filters.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    //If there's no music
    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`No music playing on this server ${emotes.error}`);

    //Filter
    const filter = args[0];
    if(!filter) return message.channel.send(`Please specify a valid filter to enable or disable ${emotes.error}`);

    const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());

    //If he can't find the filter
    if(!filterToUpdate) return message.channel.send(`This filter doesn't exist ${emotes.error}`);

    const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message.guild.id).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message.guild.id, filtersUpdated);

    if(filtersUpdated[filterRealName]) {

        //The bot adds the filter on the music
        message.channel.send(`I'm adding the filter to the music, please wait... Note: the longer the music is, the longer this will take ${emotes.music}`);

    } else {

        //The bot removes the filter from the music
        message.channel.send(`I'm disabling the filter on the music, please wait... Note: the longer the music is playing, the longer this will take ${emotes.music}`);

    }

}
