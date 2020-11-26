exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Please specify a valid filter to enable or disable !`);

    const filterToUpdate = Object.values(client.filters).find((f) => f.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - This filter doesn't exist !`);

    const filterRealName = Object.keys(client.filters).find((f) => client.filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message).filters
    const filtersUpdated = {};
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterRealName]) message.channel.send(`${client.emotes.music} - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`);
    else message.channel.send(`${client.emotes.music} - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`);

};
