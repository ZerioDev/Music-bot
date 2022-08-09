module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        inter.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${inter.guild.name} ✅`).then(() => {
            inter.reply(`I have sent you the title of the music by private messages ✅`);
        }).catch(error => {
            inter.reply(`Unable to send you a private message ${inter.member}... try again ? ❌`);
        });
    },
};