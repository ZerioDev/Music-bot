module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    inter.member.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${inter.member.guild.name} ✅`).then(() => {
        return inter.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
    }).catch(error => {
        return inter.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
    });


}
