const { useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'syncedlyrics',
    description:('Syncronize the lyrics with the song'),
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) });

        const metadataThread = queue.metadata.lyricsThread;
        if (metadataThread && !metadataThread.archived) return inter.editReply({ content: await Translate(`Lyrics thread already created <${inter.member}> ! <${queue.metadata.lyricsThread}>`) });

        const results = await player.lyrics
            .search({
                q: queue.currentTrack.title
            })
            .catch(async (e) => {
                console.log(e);
                return inter.editReply({ content: await Translate(`Error! Please contact Developers! | <❌>`) });
            });

        const lyrics = results?.[0];
        if (!lyrics?.plainLyrics) return inter.editReply({ content: await Translate(`No lyrics found for <${queue.currentTrack.title}>... try again ? <❌>`) });
        
        const thread = await queue.metadata.channel.threads.create({
            name: `Lyrics of ${queue.currentTrack.title}`
        });

        queue.setMetadata({
            channel: queue.metadata.channel,
            lyricsThread: thread
        });

        const syncedLyrics = queue?.syncedLyrics(lyrics);
        syncedLyrics.onChange(async (lyrics) => {
            await thread.send({
                content: lyrics
            });
        });

        syncedLyrics?.subscribe();

        return inter.editReply({ content: await Translate(`Successfully syncronized lyrics in <${thread}> ! <${inter.member}> <✅>`) });
    }
}

