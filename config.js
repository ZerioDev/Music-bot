require('dotenv').config();

let TOKEN = process.env.CLIENT_TOKEN;
let PREFIX  = process.env.CLIENT_PREFIX;
let ROLE = process.env.ROLE_NAME;

module.exports = {
    app: {
        px: PREFIX,
        token: TOKEN,
        playing: 'by Zerio ❤️'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: ROLE,
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
