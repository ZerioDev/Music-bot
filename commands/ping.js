exports.run = async (client, message) => {

    message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);

};
