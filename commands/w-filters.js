const config = require("../config/bot.json");
const emotes = require("../config/emojis.json");
const filters = require("../config/filters.json");

exports.run = async (client, message) => {

    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${emotes.error}`);

    if (!client.player.getQueue(message)) return message.channel.send(`No songs currently playing ${emotes.error}`);

    const disabledEmoji = emotes.error;
    const enabledEmoji = emotes.success;

    const filtersStatuses = [[], []];

    Object.keys(filters).forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filters[filterName] + " : " + (client.player.getQueue(message).filters[filterName] ? enabledEmoji : disabledEmoji));
    });

    message.channel.send({
        embed: {
            color: 'ORANGE',
            footer: { text: 'This bot uses a Github project made by Zerio (ZerioDev/Music-bot)' },
            fields: [
                { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
                { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
            ],
            timestamp: new Date(),
            description: `List of all filters enabled or disabled.\nUse \`${config.prefix}filter\` to add a filter to a song.`,
        },
    });

};
