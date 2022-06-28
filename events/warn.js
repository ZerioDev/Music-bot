const chalk = require('chalk');

let log = console.log;

module.exports = function (info) {
    log(chalk.yellow(` -> warn: ${info}`));
}