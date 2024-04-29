const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, inter) => {
    await inter.deferReply({ ephemeral: true });
    if (inter.type === InteractionType.ApplicationCommand) {
        const DJ = client.config.opt.DJ;
        const command = client.commands.get(inter.commandName);

        const errorEmbed = new EmbedBuilder().setColor('#ff0000');

        if (!command) {
            errorEmbed.setDescription('❌ | Error! Please contact Developers!');
            inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            return client.slash.delete(inter.commandName);
        }

        if (command.permissions && !inter.member.permissions.has(command.permissions)) {
            errorEmbed.setDescription(`❌ | You need do not have the proper permissions to exacute this command`);
            return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) {
            errorEmbed.setDescription(`❌ | This command is reserved For members with \`${DJ.roleName}\` `);
            return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (command.voiceChannel) {
            if (!inter.member.voice.channel) {
                errorEmbed.setDescription(`❌ | You are not in a Voice Channel`);
                return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) {
                errorEmbed.setDescription(`❌ | You are not in the same Voice Channel`);
                return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }
        }

        command.execute({ inter, client });
    } else if (inter.type === InteractionType.MessageComponent) {
        const customId = JSON.parse(inter.customId);
        const fileOfButton = customId.ffb;
        const queue = useQueue(inter.guild);

        if (fileOfButton) {
            delete require.cache[require.resolve(`../../buttons/${fileOfButton}.js`)];
            const button = require(`../../buttons/${fileOfButton}.js`);
            if (button) return button({ client, inter, customId, queue });
        }
    }
}