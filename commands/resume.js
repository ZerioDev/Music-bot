const emotes = require ("../config/emojis.json");

module.exports.run = async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send(`**You're not in a voice channel ${emotes.error}**`);

    const track = await client.player.resume(message.guild.id);

    if(!track) return message.channel.send(`**No tracks currently playing ${emotes.error}**`);

    message.channel.send(`**Track ${track.name} resumed ${emotes.success}**`);

};

module.exports.config = {
    name: "resume",
    aliases: []
};