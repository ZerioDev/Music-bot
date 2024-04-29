const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: "Play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'The song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            defaultEmbed.setAuthor({ name: `No results found... try again ? ❌` });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        const queue = player.nodes.create(inter.guild, {
            metadata: inter.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.volume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);

            defaultEmbed.setAuthor({ name: `I can't join the voice channel... try again ? ❌` });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        defaultEmbed.setAuthor({ name: `Loading your ${res.playlist ? 'playlist' : 'track'} to the queue... ✅` });
        await inter.editReply({ embeds: [defaultEmbed] });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    }
}
