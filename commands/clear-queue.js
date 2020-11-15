const emotes = require("../config/emojis.json");

exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!client.player.getQueue(message)) return message.channel.send(`No songs currently playing ${emotes.error}`);

    client.player.clearQueue(message);

    message.channel.send(`The queue has just been removed ${emotes.success}`);

};
