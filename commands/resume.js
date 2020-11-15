const emotes = require("../config/emojis.json");

exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music playing on this server ${emotes.error}`);

    client.player.resume(message);

    message.channel.send(`Song ${client.player.getQueue(message).playing.title} **resumed** ${emotes.success}`);

};
