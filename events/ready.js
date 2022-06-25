require('dotenv').config();

let PREFIX = process.env.CLIENT_PREFIX;

module.exports = async (client) => {
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

    client.user.setActivity(`${PREFIX}help in ${client.guilds.cache.size} servers`);
};