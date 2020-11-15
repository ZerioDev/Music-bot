const emotes = require("../config/emojis.json");

exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!args[0]) return message.channel.send(`Please indicate the title of a song ${emotes.error}`);

    client.player.play(message, args.join(" "));

};
