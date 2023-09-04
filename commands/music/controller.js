const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "set controller channel ",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'the channel you want to send it to',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter, client }) { 
      let Channel = inter.options.getChannel('channel');
      if (Channel.type !== 0) return inter.editReply({ content: `you have to send it to a text channel.. ❌`, ephemeral: true})

    
      const embed = new EmbedBuilder()
       .setTitle('control your music from the buttons below')
       .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
       .setColor('#2f3136')
       .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})


         inter.editReply({ content: `sending controller to ${Channel}... ✅`, ephemeral: true})

         const back = new ButtonBuilder()
         .setLabel('Back')
         .setCustomId(JSON.stringify({ffb: 'back'}))
         .setStyle('Primary')

         const skip = new ButtonBuilder()
         .setLabel('Skip')
         .setCustomId(JSON.stringify({ffb: 'skip'}))
         .setStyle('Primary')

         const resumepause = new ButtonBuilder()
         .setLabel('Resume & Pause')
         .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
         .setStyle('Danger')

         const save = new ButtonBuilder()
         .setLabel('Save')
         .setCustomId(JSON.stringify({ffb: 'savetrack'}))
         .setStyle('Success')

         const volumeup = new ButtonBuilder()
         .setLabel('Volume up')
         .setCustomId(JSON.stringify({ffb: 'volumeup'}))
         .setStyle('Primary')

         const volumedown = new ButtonBuilder()
         .setLabel('Volume Down')
         .setCustomId(JSON.stringify({ffb: 'volumedown'}))
         .setStyle('Primary')

         const loop = new ButtonBuilder()
         .setLabel('Loop')
         .setCustomId(JSON.stringify({ffb: 'loop'}))
         .setStyle('Danger')

         const np = new ButtonBuilder()
         .setLabel('Now Playing')
         .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
         .setStyle('Secondary')
         
         const queuebutton = new ButtonBuilder()
         .setLabel('Queue')
         .setCustomId(JSON.stringify({ffb: 'queue'}))
         .setStyle('Secondary')

        const lyrics = new ButtonBuilder()
            .setLabel('lyrics')
            .setCustomId(JSON.stringify({ffb: 'lyrics'}))
            .setStyle('Primary')

        const shuffle = new ButtonBuilder()
            .setLabel('shuffle')
            .setCustomId(JSON.stringify({ffb: 'shuffle'}))
            .setStyle('Success')

        const stop = new ButtonBuilder()
            .setLabel('Stop')
            .setCustomId(JSON.stringify({ffb: 'stop'}))
            .setStyle('Danger')


         const row1 = new ActionRowBuilder().addComponents(back, queuebutton, resumepause, np, skip)
         const row2 = new ActionRowBuilder().addComponents(volumedown, loop, save, volumeup)
        const row3 = new ActionRowBuilder().addComponents(lyrics, shuffle, stop)


        Channel.send({ embeds: [embed], components: [row1, row2, row3] })

    },
}
