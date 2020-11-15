const emotes = require("../config/emojis.json");

exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!client.player.getQueue(message)) return message.channel.send(`No songs currently playing ${emotes.error}`);

    client.player.skip(message);

    message.channel.send(`The current music has just been **skipped** ${emotes.success}`);

};
