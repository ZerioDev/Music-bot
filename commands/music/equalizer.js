const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { EqualizerConfigurationPreset, useQueue } = require('discord-player');

module.exports = {
    name: 'equalizer',
    description: 'adjust equalizer',
    voiceChannel: true,
    options: [
        {
            name: 'preset',
            description: 'the equalizer preset',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: Object.keys(EqualizerConfigurationPreset).map((m) => ({
                name: m,
                value: m
            }))
        }
    ],

    execute({ inter }) {
        const queue = useQueue(inter.guildId);

        if (!queue?.currentTrack) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        if (!queue.filters.equalizer) return inter.editReply({
            content: '❌ Equalizer is not available for this track.'
        });

        const preset = inter.options.getString('preset');

        queue.filters.equalizer.setEQ(EqualizerConfigurationPreset[preset]);
        queue.filters.equalizer.enable();

        const EqEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Equalizer config set to ${preset}!` });

        return inter.editReply({ embeds: [EqEmbed] });
    },
};