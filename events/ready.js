require('dotenv').config();

let PREFIX = process.env.CLIENT_PREFIX;

module.exports = async (client) => {
    console.log([
        `--------------------------------------------------`,
        `Logged in as ${client.user.username}`,
        `--------------------------------------------------`,
        `-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`,
        `--------------------------------------------------`
    ].join('\n'))


    client.user.setActivity(`${PREFIX}help in ${client.guilds.cache.size} servers`);
};