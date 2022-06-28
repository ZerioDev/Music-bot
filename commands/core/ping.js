const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: `${client.config.app.px}ping`,

    execute(client, message) {
        message.channel.send(`Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago **${client.ws.ping}ms** 🛰️`);
    },
};