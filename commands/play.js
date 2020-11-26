exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Please indicate the title of a song !`);

    client.player.play(message, args.join(" "));

};
