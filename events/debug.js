const chalk = require('chalk');

let log = console.log;

module.exports = function (client, info) {
    log(chalk.yellow(` -> debug: ${info}`));
}