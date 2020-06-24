const config = require ("../config/bot.json");
const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //New embed
    const help = new Discord.MessageEmbed()
    .setDescription("Find the list of commands available on this panel.")
    .addField("**Music**", "`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop`")
    .addField("**Filters**", "`bassboost`, `tremolo`, `vibrato`, `treble`, `8D`, `normalizer`, `surrounding`, `nightcore`, `vaporwave`, `superequalizer`, `phaser`, `reverse`, `pulsator`")
    .setFooter(`To use filters, ${config.prefix}filter (the filter). Example : ${config.prefix}filter 8D.`)
    .setColor("ORANGE")

    //Message
    message.channel.send(help)

}
