const emotes = require("../config/emojis.json");

exports.run = async (client, message) => {

    message.channel.send(`Ping : **${client.ws.ping}ms** ${emotes.success}`)

};
