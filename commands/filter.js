const emotes = require ("../config/emojis.json");
const filters = require("../config/filters.json");
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`);

    const filter = args[0];
    if(!filter) return message.channel.send(`**Please specify a valid filter to enable or disable ${emotes.error}**`);
    
    const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());
    if(!filterToUpdate) return message.channel.send(`**This filter doesn't exist ${emotes.error}**`);
    
    const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message.guild.id).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message.guild.id, filtersUpdated);

    if(filtersUpdated[filterRealName]){
        const pleaseWait = new Discord.MessageEmbed()
        .setDescription("I'm adding the filter to the music, please wait... Note : the longer the music is, the longer the wait will be :musical_note:")
        .setColor("BLUE");
        message.channel.send(pleaseWait);
    } else {
        const pleaseWait = new Discord.MessageEmbed()
        .setDescription(`I'm disabling the filter on the music, please wait... Note : the longer the music is playing, the longer the wait will be... :musical_note:`)
        .setColor("BLUE");
        message.channel.send(pleaseWait);
    }

}

module.exports.config = {
    name: "filter",
    aliases: []
};