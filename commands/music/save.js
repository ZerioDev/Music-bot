const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.nodes.get(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                    .setURL(queue.currentTrack.url)
                    .addFields(
                        { name: ':hourglass: Duration:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                        { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                        { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` }
                    )
                    .setThumbnail(queue.currentTrack.thumbnail)
                    .setFooter({text:`From the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
        });
    },
};
