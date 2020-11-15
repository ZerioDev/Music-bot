const emotes = require("../config/emojis.json");

exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!client.player.getQueue(message)) return message.channel.send(`No music playing on this server ${emotes.error}`);

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(`Repeat mode **disabled** ${emotes.success}`);
    } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(`Repeat mode **enabled** ${emotes.success}`);
    };

};
