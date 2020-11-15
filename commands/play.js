const emotes = require("../config/emojis.json");

exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    client.player.play(message, args.join(" "));

};
