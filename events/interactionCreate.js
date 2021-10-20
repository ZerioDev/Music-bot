module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: `No music currently playing <@${int.user.id}>... try again ? ❌`, components: [] });

            int.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: `I have sent you the title of the music by private messages <@${int.user.id}> ✅`, components: [] });
            }).catch(error => {
                return int.reply({ content: `Unable to send you a private message <@${int.user.id}>... try again ? ❌`, components: [] });
            });
        }
    }
};