const chalk = require('chalk');

let log = console.log;

module.exports = function (error) {
    log(chalk.red(` -> (${error.code}) ${error.name}: ${error.message} \n\n--------------------------------------------\n\n ${error.stack}`));
}