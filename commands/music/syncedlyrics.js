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
 try {
            const results = await player.lyrics.search({
                q: queue.currentTrack.title
            });

            const lyrics = results?.[0];
            if (!lyrics?.plainLyrics) {
                console.log(`No lyrics found for ${queue.currentTrack.title}`);
                return inter.editReply({ content: await Translate(`No lyrics found for <${queue.currentTrack.title}>... try again ? <❌>`) });
            }

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

            return inter.editReply({ content: await Translate(`Successfully synchronized lyrics in <${thread}> ! <${inter.member}> <✅>`) });
        } catch (error) {
            console.log(error);
            return inter.editReply({ content: await Translate(`Hubo un error inesperado o no se encontró la letra de la canción`) });
        }
    }
}

