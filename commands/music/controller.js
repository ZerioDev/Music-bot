const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Translate } = require('../../translate');

module.exports = {
    name: 'controller',
    description:("Send music controller to a channel"),
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description:('The text channel you want to send it to'),
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],

    async execute({ inter }) {
        const channel = inter.options.getChannel('channel');
        if (channel.type !== ChannelType.GuildText) return inter.editReply({ content: await Translate(`You need to send it to a text channel.. <❌>`) });

        const embed = new EmbedBuilder()
            .setTitle(await Translate('Control your music with the buttons below !'))
            .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
            .setColor('#2f3136')
            .setFooter({ text: await Translate('Music comes first - Made with heart by the Community <❤️>'), iconURL: inter.member.avatarURL({ dynamic: true }) });

        inter.editReply({ content: await Translate(`Sending controller to <${channel}>... <✅>`) });

        const back = new ButtonBuilder()
            .setLabel(await Translate('Back'))
            .setCustomId('back')
            .setStyle('Primary');

        const skip = new ButtonBuilder()
            .setLabel(await Translate('Skip'))
            .setCustomId('skip')
            .setStyle('Primary');

        const resumepause = new ButtonBuilder()
            .setLabel(await Translate('Resume & Pause'))
            .setCustomId('resume&pause')
            .setStyle('Danger');

        const save = new ButtonBuilder()
            .setLabel(await Translate('Save'))
            .setCustomId('savetrack')
            .setStyle('Success');

        const volumeup = new ButtonBuilder()
            .setLabel(await Translate('Volume Up'))
            .setCustomId('volumeup')
            .setStyle('Primary');

        const volumedown = new ButtonBuilder()
            .setLabel(await Translate('Volume Down'))
            .setCustomId('volumedown')
            .setStyle('Primary');

        const loop = new ButtonBuilder()
            .setLabel(await Translate('Loop'))
            .setCustomId('loop')
            .setStyle('Danger');

        const np = new ButtonBuilder()
            .setLabel(await Translate('Now Playing'))
            .setCustomId('nowplaying')
            .setStyle('Secondary');

        const queuebutton = new ButtonBuilder()
            .setLabel(await Translate('Queue'))
            .setCustomId('queue')
            .setStyle('Secondary');

        const lyrics = new ButtonBuilder()
            .setLabel(await Translate('lyrics'))
            .setCustomId('Lyrics')
            .setStyle('Primary');

        const shuffle = new ButtonBuilder()
            .setLabel(await Translate('Shuffle'))
            .setCustomId('shuffle')
            .setStyle('Success');

        const stop = new ButtonBuilder()
            .setLabel(await Translate('Stop'))
            .setCustomId('stop')
            .setStyle('Danger');

        const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip);
        const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup);
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, stop);

        channel.send({ embeds: [embed], components: [row1, row2, row3] });
    }
}
