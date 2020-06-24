const emotes = require("../config/emojis.json");
const filters = require("../config/filters.json");
const Discord = require("discord.js");

module.exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    if (!client.player.isPlaying(message.guild.id)) return message.channel.send(`**No music playing on this server ${emotes.error}**`);

    const enabledEmoji = emotes.success;
    const disabledEmoji = emotes.error;

    const filtersStatuses = [ [], [] ];

    Object.keys(filters).forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filters[filterName] + " : " + (client.player.getQueue(message.guild.id).filters[filterName] ? enabledEmoji : disabledEmoji));
    });

    const list = new Discord.MessageEmbed()
    .setDescription("Liste de tous les filtres activés ou non.\nPour ajouter un filtre sur une musique `^filter`.")
    .addField("**Filtres**", filtersStatuses[0].join('\n'), true)
    .addField("** **", filtersStatuses[1].join('\n'), true)
    .addField("** **", `Attention, sur la commande \`^filter\`.\nLe nom du filtre doit être en minuscule.`)
    .setColor("ORANGE");

    message.channel.send(list);

};

module.exports.config = {
    name: "w-filters",
    aliases: []
};