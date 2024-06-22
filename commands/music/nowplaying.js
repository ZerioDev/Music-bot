const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

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

        let EmojiState = client.config.app.enableEmojis;

        const emojis = client.config?.emojis;

        emojis ? EmojiState = EmojiState : EmojiState = false;

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(await Translate(`Volume \`<${queue.node.volume}%>\` <\n> <${progress}> <\n >Loop \`<${methods[queue.repeatMode]}>\``))// <\n>Requested by `<${track.requestedBy}>`))
            .setFooter({ text: await Translate('Music comes first - Made with <❤️> by BoredKevin'), iconURL: inter.member.avatarURL({ dynamic: true }) })
            .setColor('#7289da')
            .setTimestamp();
        
        const saveButton = new ButtonBuilder()
            .setLabel(EmojiState ? emojis.savetrack : ('Save this track'))
            .setCustomId('savetrack')
            .setStyle('Primary');

        const volumeup = new ButtonBuilder()
            .setLabel(EmojiState ? emojis.volumeUp : ('Volume Up'))
            .setCustomId('volumeup')
            .setStyle('Secondary');

        const volumedown = new ButtonBuilder()
            .setLabel(EmojiState ? emojis.volumeDown : ('Volume Down'))
            .setCustomId('volumedown')
            .setStyle('Secondary');

        const loop = new ButtonBuilder()
            .setLabel(EmojiState ? emojis.loop : ('Loop'))
            .setCustomId('loop')
            .setStyle('Primary');

        const resumepause = new ButtonBuilder()
            .setLabel(EmojiState ? emojis.ResumePause : ('Resume <&> Pause'))
            .setCustomId('resume&pause')
            .setStyle('Secondary');

        const row = new ActionRowBuilder().addComponents(volumedown, resumepause, volumeup, loop, saveButton);
        inter.editReply({ embeds: [embed], components: [row] });
    }
}
