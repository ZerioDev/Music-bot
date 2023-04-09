const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member
        });
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `No results found... try again ? ❌` })
            .setColor('#2f3136')

        if (!res || !res.tracks.length) return inter.editReply({ embeds: [NoResultsEmbed] });

        try {
            await player.play(inter.member.voice.channel, res, {
                nodeOptions: {
                    metadata: inter.channel,
                    volume: client.config.opt.volume,
                    leaveOnEmpty: client.config.opt.leaveOnEmpty,
                    leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: client.config.opt.leaveOnEnd,
                    leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown
                }
            });

            const playEmbed = new EmbedBuilder()
                .setAuthor({ name: `Enqueued your ${res.playlist ? 'playlist' : 'track'} to the queue... ✅` })
                .setColor('#2f3136');

            await inter.editReply({ embeds: [playEmbed] });

        } catch (e) {
            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({
                    name: `I couldn't play your track. Try again? ❌\n\n\`\`\`js\n${e.stack || e}\`\`\``
                })
                .setColor('#2f3136');

            return inter.editReply({ embeds: [NoVoiceEmbed] });
        }
    },
};
