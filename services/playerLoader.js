const fs = require('fs');
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

module.exports = function (client) {
    for (const file of player) {
        const event = require(`../player/${file}`);
        console.log(`${file}`);
        client.player.on(file.split(".")[0], event.bind(null, client));
    };
};