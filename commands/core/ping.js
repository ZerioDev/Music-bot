const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Get the ping of the bot!",

    async execute({ client, inter }) {
        await inter.editReply("Ping?");
        inter.editReply(`Pong! API Latency is ${Math.round(client.ws.ping)}ms 🛰️, last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`);
    }
};