module.exports = {
    name: "leave",
    aliases: ["disconnect"],
    category: "Music",
    utilisation: "{prefix}leave",
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        if (queue || queue.playing) { queue.delete(message.guild.id); }

        await message.guild.member.voice.channel.leave();
    }
}