exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

    if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

    client.player.resume(message);

    message.channel.send(`${client.emotes.success} - Song ${client.player.getQueue(message).playing.title} **resumed** !`);

};
