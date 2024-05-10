const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../translate');

module.exports = {
    name: 'nowplaying',
    description: 'See what song is currently playing!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });

        const track = queue.currentTrack;
        const methods = ['disabled', 'track', 'queue'];
        const timestamp = track.duration;
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
        const progress = queue.node.createProgressBar();

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(await Translate(`Volume <**${queue.node.volume}**%> <\n> <Duration **${trackDuration}**> <\n> Progress <${progress}> <\n >Loop mode <**${methods[queue.repeatMode]}**> <\n>Requested by <${track.requestedBy}>`))
            .setFooter({ text: await Translate('Music comes first - Made with heart by the Community <❤️>'), iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setColor('#2f3136')
            .setTimestamp();

        const saveButton = new ButtonBuilder()
            .setLabel('Save this track')
            .setCustomId('savetrack')
            .setStyle('Danger');

        const volumeup = new ButtonBuilder()
            .setLabel('Volume Up')
            .setCustomId('volumeup')
            .setStyle('Primary');

        const volumedown = new ButtonBuilder()
            .setLabel('Volume Down')
            .setCustomId('volumedown')
            .setStyle('Primary');

        const loop = new ButtonBuilder()
            .setLabel('Loop')
            .setCustomId('loop')
            .setStyle('Danger');

        const resumepause = new ButtonBuilder()
            .setLabel('Resume & Pause')
            .setCustomId('resume&pause')
            .setStyle('Success');

        const row = new ActionRowBuilder().addComponents(volumedown, saveButton, resumepause, loop, volumeup);
        inter.editReply({ embeds: [embed], components: [row] });
    }
}
